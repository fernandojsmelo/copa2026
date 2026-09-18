"""Rotas de seleções: listagem, perfil completo e elenco.

`GET /api/selecoes/:id/jogos` do Tasks.md não é uma rota própria — o
GET /api/jogos já filtra por `selecao_id` (Sprint 2), então o frontend
reusa esse endpoint em vez de duplicar a query.
"""
import sqlite3

from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse

from app.database import get_db_dependency

router = APIRouter()

GRUPOS_VALIDOS = set("ABCDEFGHIJKL")
POSICOES_VALIDAS = {"GK", "DEF", "MID", "FWD"}


def _erro(status_code: int, mensagem: str, detalhe: str = "") -> JSONResponse:
    return JSONResponse(status_code=status_code, content={"error": mensagem, "detail": detalhe})


def _serializar_selecao(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "nome": row["nome"],
        "nome_pt": row["nome_pt"],
        "codigo_iso": row["codigo_iso"],
        "bandeira_emoji": row["bandeira_emoji"],
        "confederacao": row["confederacao"],
        "grupo": row["grupo"],
        "pote": row["pote"],
        "eh_cabeca_chave": bool(row["eh_cabeca_chave"]),
        "eh_sede": bool(row["eh_sede"]),
        "treinador": row["treinador"],
        "ranking_fifa": row["ranking_fifa"],
    }


@router.get("/selecoes")
def listar_selecoes(
    grupo: str | None = Query(default=None),
    confederacao: str | None = Query(default=None),
    incluir_pendentes: bool = Query(default=False, description="Inclui vagas 'A Definir' (repescagem)"),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    condicoes = [] if incluir_pendentes else ["codigo_iso != 'TBD'"]
    parametros: list = []

    if grupo:
        grupo = grupo.upper()
        if grupo in GRUPOS_VALIDOS:
            condicoes.append("grupo = ?")
            parametros.append(grupo)

    if confederacao:
        condicoes.append("confederacao = ?")
        parametros.append(confederacao.upper())

    where = f"WHERE {' AND '.join(condicoes)}" if condicoes else ""
    rows = db.execute(
        f"""
        SELECT id, nome, nome_pt, codigo_iso, bandeira_emoji, confederacao,
               grupo, pote, eh_cabeca_chave, eh_sede, treinador, ranking_fifa
        FROM selecoes
        {where}
        ORDER BY nome_pt
        """,
        parametros,
    ).fetchall()

    return [_serializar_selecao(row) for row in rows]


@router.get("/selecoes/{selecao_id}")
def obter_selecao(selecao_id: int, db: sqlite3.Connection = Depends(get_db_dependency)):
    row = db.execute(
        """
        SELECT id, nome, nome_pt, codigo_iso, bandeira_emoji, confederacao,
               grupo, pote, eh_cabeca_chave, eh_sede, treinador, ranking_fifa
        FROM selecoes WHERE id = ?
        """,
        (selecao_id,),
    ).fetchone()
    if row is None:
        return _erro(404, "Seleção não encontrada", f"id {selecao_id}")
    return _serializar_selecao(row)


@router.get("/selecoes/{selecao_id}/jogadores")
def listar_jogadores(
    selecao_id: int,
    posicao: str | None = Query(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    selecao = db.execute("SELECT id FROM selecoes WHERE id = ?", (selecao_id,)).fetchone()
    if selecao is None:
        return _erro(404, "Seleção não encontrada", f"id {selecao_id}")

    condicoes = ["selecao_id = ?"]
    parametros: list = [selecao_id]

    if posicao:
        posicao = posicao.upper()
        if posicao not in POSICOES_VALIDAS:
            return _erro(400, "posição inválida", f"valores aceitos: {sorted(POSICOES_VALIDAS)}")
        condicoes.append("posicao = ?")
        parametros.append(posicao)

    ORDEM_POSICAO = "CASE posicao WHEN 'GK' THEN 1 WHEN 'DEF' THEN 2 WHEN 'MID' THEN 3 WHEN 'FWD' THEN 4 END"
    rows = db.execute(
        f"""
        SELECT id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao
        FROM jogadores
        WHERE {' AND '.join(condicoes)}
        ORDER BY {ORDEM_POSICAO}, numero
        """,
        parametros,
    ).fetchall()

    return [
        {
            "id": row["id"],
            "numero": row["numero"],
            "nome": row["nome"],
            "nome_curto": row["nome_curto"],
            "posicao": row["posicao"],
            "clube": row["clube"],
            "idade": row["idade"],
            "eh_capitao": bool(row["eh_capitao"]),
        }
        for row in rows
    ]
