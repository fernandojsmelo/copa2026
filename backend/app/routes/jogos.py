"""Rotas de jogos: listagem com filtros/paginação e detalhe por id."""
import sqlite3

from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse

from app.database import get_db_dependency

router = APIRouter()

STATUS_VALIDOS = {"agendado", "em_andamento", "encerrado"}
FASES_VALIDAS = {"grupo", "oitavas", "quartas", "semi", "terceiro", "final"}
GRUPOS_VALIDOS = set("ABCDEFGHIJKL")

SELECT_BASE = """
    SELECT
        j.id, j.fase, j.grupo, j.rodada, j.data_hora_utc, j.estadio, j.cidade,
        j.pais_sede, j.status, j.gols_a, j.gols_b, j.penaltis_a, j.penaltis_b,
        a.id AS a_id, a.nome_pt AS a_nome_pt, a.codigo_iso AS a_codigo_iso, a.bandeira_emoji AS a_bandeira_emoji,
        b.id AS b_id, b.nome_pt AS b_nome_pt, b.codigo_iso AS b_codigo_iso, b.bandeira_emoji AS b_bandeira_emoji
    FROM jogos j
    JOIN selecoes a ON a.id = j.selecao_a_id
    JOIN selecoes b ON b.id = j.selecao_b_id
"""


def _erro(status_code: int, mensagem: str, detalhe: str = "") -> JSONResponse:
    return JSONResponse(status_code=status_code, content={"error": mensagem, "detail": detalhe})


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
    fase: str | None = Query(default=None),
    grupo: str | None = Query(default=None),
    selecao_id: int | None = Query(default=None),
    data: str | None = Query(default=None, description="Data em horário de Brasília, formato YYYY-MM-DD"),
    order: str = Query(default="asc", pattern="^(asc|desc)$"),
    page: int = Query(default=1, ge=1),
    per_page: int = Query(default=20, ge=1, le=100),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    condicoes = []
    parametros: list = []

    if status:
        if status not in STATUS_VALIDOS:
            return _erro(400, "status inválido", f"valores aceitos: {sorted(STATUS_VALIDOS)}")
        condicoes.append("j.status = ?")
        parametros.append(status)

    if fase:
        if fase not in FASES_VALIDAS:
            return _erro(400, "fase inválida", f"valores aceitos: {sorted(FASES_VALIDAS)}")
        condicoes.append("j.fase = ?")
        parametros.append(fase)

    if grupo:
        grupo = grupo.upper()
        if grupo not in GRUPOS_VALIDOS:
            return _erro(400, "grupo inválido", "valores aceitos: A a L")
        condicoes.append("j.grupo = ?")
        parametros.append(grupo)

    if selecao_id:
        condicoes.append("(j.selecao_a_id = ? OR j.selecao_b_id = ?)")
        parametros.extend([selecao_id, selecao_id])

    if data:
        # data_hora_utc é armazenado em UTC; comparamos pela data civil em Brasília (UTC-3)
        condicoes.append("strftime('%Y-%m-%d', j.data_hora_utc, '-3 hours') = ?")
        parametros.append(data)

    where = f"WHERE {' AND '.join(condicoes)}" if condicoes else ""

    total = db.execute(f"SELECT COUNT(*) FROM jogos j {where}", parametros).fetchone()[0]

    query = f"""
        {SELECT_BASE}
        {where}
        ORDER BY j.data_hora_utc {"DESC" if order == "desc" else "ASC"}
        LIMIT ? OFFSET ?
    """
    parametros_paginados = [*parametros, per_page, (page - 1) * per_page]

    rows = db.execute(query, parametros_paginados).fetchall()
    return {
        "jogos": [_serializar_jogo(row) for row in rows],
        "total": total,
        "page": page,
        "per_page": per_page,
    }


@router.get("/jogos/{jogo_id}")
def obter_jogo(jogo_id: int, db: sqlite3.Connection = Depends(get_db_dependency)):
    row = db.execute(f"{SELECT_BASE} WHERE j.id = ?", (jogo_id,)).fetchone()
    if row is None:
        return _erro(404, "Jogo não encontrado", f"id {jogo_id}")
    return _serializar_jogo(row)
