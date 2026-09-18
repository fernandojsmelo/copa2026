"""GET /api/jogos — listagem de jogos com filtros.

Nesta fase (Sprint 1) só o essencial para os widgets da landing page:
filtro por status e limite de resultados, ordenado por data. Filtros
adicionais (fase, grupo, data, selecao_id) e paginação completa entram
no Sprint 2 (Tabela de Jogos).
"""
import sqlite3

from fastapi import APIRouter, Depends, Query

from app.database import get_db_dependency

router = APIRouter()

STATUS_VALIDOS = {"agendado", "em_andamento", "encerrado"}


def _selecao_resumo(row: sqlite3.Row, prefixo: str) -> dict:
    return {
        "id": row[f"{prefixo}_id"],
        "nome_pt": row[f"{prefixo}_nome_pt"],
        "codigo_iso": row[f"{prefixo}_codigo_iso"],
        "bandeira_emoji": row[f"{prefixo}_bandeira_emoji"],
    }


def _serializar_jogo(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "fase": row["fase"],
        "grupo": row["grupo"],
        "rodada": row["rodada"],
        "data_hora_utc": row["data_hora_utc"],
        "estadio": row["estadio"],
        "cidade": row["cidade"],
        "pais_sede": row["pais_sede"],
        "status": row["status"],
        "selecao_a": _selecao_resumo(row, "a"),
        "selecao_b": _selecao_resumo(row, "b"),
        "gols_a": row["gols_a"],
        "gols_b": row["gols_b"],
        "penaltis_a": row["penaltis_a"],
        "penaltis_b": row["penaltis_b"],
    }


@router.get("/jogos")
def listar_jogos(
    status: str | None = Query(default=None),
    limit: int = Query(default=50, ge=1, le=200),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    condicoes = []
    parametros: list = []

    if status:
        if status not in STATUS_VALIDOS:
            return {"error": "status inválido", "detail": f"valores aceitos: {sorted(STATUS_VALIDOS)}"}
        condicoes.append("j.status = ?")
        parametros.append(status)

    where = f"WHERE {' AND '.join(condicoes)}" if condicoes else ""
    ordem = "ASC" if status != "encerrado" else "DESC"

    query = f"""
        SELECT
            j.id, j.fase, j.grupo, j.rodada, j.data_hora_utc, j.estadio, j.cidade,
            j.pais_sede, j.status, j.gols_a, j.gols_b, j.penaltis_a, j.penaltis_b,
            a.id AS a_id, a.nome_pt AS a_nome_pt, a.codigo_iso AS a_codigo_iso, a.bandeira_emoji AS a_bandeira_emoji,
            b.id AS b_id, b.nome_pt AS b_nome_pt, b.codigo_iso AS b_codigo_iso, b.bandeira_emoji AS b_bandeira_emoji
        FROM jogos j
        JOIN selecoes a ON a.id = j.selecao_a_id
        JOIN selecoes b ON b.id = j.selecao_b_id
        {where}
        ORDER BY j.data_hora_utc {ordem}
        LIMIT ?
    """
    parametros.append(limit)

    rows = db.execute(query, parametros).fetchall()
    return [_serializar_jogo(row) for row in rows]
