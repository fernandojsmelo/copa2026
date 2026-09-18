"""GET /api/selecoes — listagem básica para dropdowns de filtro.

Versão mínima usada pelo filtro da Tabela de Jogos (Sprint 2). O perfil
completo da seleção (treinador, ranking FIFA, confederação, elenco)
entra no Sprint 4.
"""
import sqlite3

from fastapi import APIRouter, Depends, Query

from app.database import get_db_dependency

router = APIRouter()

GRUPOS_VALIDOS = set("ABCDEFGHIJKL")


@router.get("/selecoes")
def listar_selecoes(
    grupo: str | None = Query(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    condicoes = ["codigo_iso != 'TBD'"]
    parametros: list = []

    if grupo:
        grupo = grupo.upper()
        if grupo in GRUPOS_VALIDOS:
            condicoes.append("grupo = ?")
            parametros.append(grupo)

    where = f"WHERE {' AND '.join(condicoes)}"
    rows = db.execute(
        f"""
        SELECT id, nome_pt, codigo_iso, bandeira_emoji, grupo, pote, eh_cabeca_chave
        FROM selecoes
        {where}
        ORDER BY nome_pt
        """,
        parametros,
    ).fetchall()

    return [dict(row) for row in rows]
