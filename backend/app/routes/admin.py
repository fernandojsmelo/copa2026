"""Rotas administrativas — autenticação simples via header X-Admin-Key."""
import sqlite3

from fastapi import APIRouter, Depends, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.config import ADMIN_KEY
from app.database import get_db_dependency
from app.routes.jogos import SELECT_BASE, STATUS_VALIDOS, _erro, _serializar_jogo

router = APIRouter()


class AtualizarPlacarBody(BaseModel):
    gols_a: int | None = None
    gols_b: int | None = None
    penaltis_a: int | None = None
    penaltis_b: int | None = None
    status: str | None = None


def _checar_admin_key(x_admin_key: str | None) -> JSONResponse | None:
    if not ADMIN_KEY:
        return _erro(500, "ADMIN_KEY não configurada no servidor")
    if x_admin_key != ADMIN_KEY:
        return _erro(401, "Não autorizado", "header X-Admin-Key ausente ou inválido")
    return None


@router.patch("/admin/jogos/{jogo_id}")
def atualizar_placar(
    jogo_id: int,
    body: AtualizarPlacarBody,
    x_admin_key: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    erro = _checar_admin_key(x_admin_key)
    if erro:
        return erro

    if body.status is not None and body.status not in STATUS_VALIDOS:
        return _erro(400, "status inválido", f"valores aceitos: {sorted(STATUS_VALIDOS)}")

    existente = db.execute("SELECT id FROM jogos WHERE id = ?", (jogo_id,)).fetchone()
    if existente is None:
        return _erro(404, "Jogo não encontrado", f"id {jogo_id}")

    campos = body.model_dump(exclude_unset=True)
    if not campos:
        return _erro(400, "Nada para atualizar")

    set_clause = ", ".join(f"{campo} = ?" for campo in campos)
    db.execute(f"UPDATE jogos SET {set_clause} WHERE id = ?", (*campos.values(), jogo_id))
    db.commit()

    row = db.execute(f"{SELECT_BASE} WHERE j.id = ?", (jogo_id,)).fetchone()
    return _serializar_jogo(row)
