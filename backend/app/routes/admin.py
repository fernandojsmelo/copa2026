"""Rotas administrativas — autenticação simples via header X-Admin-Key."""
import sqlite3

from fastapi import APIRouter, Depends, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.config import ADMIN_KEY
from app.database import get_db_dependency
from app.routes.jogos import SELECT_BASE, STATUS_VALIDOS, _erro, _serializar_jogo

router = APIRouter()


POSICOES_VALIDAS = {"GK", "DEF", "MID", "FWD"}


class AtualizarPlacarBody(BaseModel):
    gols_a: int | None = None
    gols_b: int | None = None
    penaltis_a: int | None = None
    penaltis_b: int | None = None
    status: str | None = None


class LoginBody(BaseModel):
    chave: str


class JogadorBody(BaseModel):
    selecao_id: int
    numero: int | None = None
    nome: str
    nome_curto: str | None = None
    posicao: str
    clube: str | None = None
    idade: int | None = None
    eh_capitao: bool = False


class JogadorUpdateBody(BaseModel):
    numero: int | None = None
    nome: str | None = None
    nome_curto: str | None = None
    posicao: str | None = None
    clube: str | None = None
    idade: int | None = None
    eh_capitao: bool | None = None


def _checar_admin_key(x_admin_key: str | None) -> JSONResponse | None:
    if not ADMIN_KEY:
        return _erro(500, "ADMIN_KEY não configurada no servidor")
    if x_admin_key != ADMIN_KEY:
        return _erro(401, "Não autorizado", "header X-Admin-Key ausente ou inválido")
    return None


@router.post("/admin/login")
def login(body: LoginBody):
    erro = _checar_admin_key(body.chave)
    if erro:
        return erro
    return {"ok": True}


def _serializar_jogador(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "selecao_id": row["selecao_id"],
        "numero": row["numero"],
        "nome": row["nome"],
        "nome_curto": row["nome_curto"],
        "posicao": row["posicao"],
        "clube": row["clube"],
        "idade": row["idade"],
        "eh_capitao": bool(row["eh_capitao"]),
    }


@router.post("/admin/jogadores")
def criar_jogador(
    body: JogadorBody,
    x_admin_key: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    erro = _checar_admin_key(x_admin_key)
    if erro:
        return erro
    if body.posicao not in POSICOES_VALIDAS:
        return _erro(400, "posição inválida", f"valores aceitos: {sorted(POSICOES_VALIDAS)}")
    selecao = db.execute("SELECT id FROM selecoes WHERE id = ?", (body.selecao_id,)).fetchone()
    if selecao is None:
        return _erro(404, "Seleção não encontrada", f"id {body.selecao_id}")

    cursor = db.execute(
        """
        INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            body.selecao_id,
            body.numero,
            body.nome,
            body.nome_curto or body.nome,
            body.posicao,
            body.clube,
            body.idade,
            int(body.eh_capitao),
        ),
    )
    db.commit()
    row = db.execute("SELECT * FROM jogadores WHERE id = ?", (cursor.lastrowid,)).fetchone()
    return _serializar_jogador(row)


@router.put("/admin/jogadores/{jogador_id}")
def atualizar_jogador(
    jogador_id: int,
    body: JogadorUpdateBody,
    x_admin_key: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    erro = _checar_admin_key(x_admin_key)
    if erro:
        return erro

    existente = db.execute("SELECT id FROM jogadores WHERE id = ?", (jogador_id,)).fetchone()
    if existente is None:
        return _erro(404, "Jogador não encontrado", f"id {jogador_id}")

    campos = body.model_dump(exclude_unset=True)
    if "posicao" in campos and campos["posicao"] not in POSICOES_VALIDAS:
        return _erro(400, "posição inválida", f"valores aceitos: {sorted(POSICOES_VALIDAS)}")
    if not campos:
        return _erro(400, "Nada para atualizar")
    if "eh_capitao" in campos:
        campos["eh_capitao"] = int(campos["eh_capitao"])

    set_clause = ", ".join(f"{campo} = ?" for campo in campos)
    db.execute(f"UPDATE jogadores SET {set_clause} WHERE id = ?", (*campos.values(), jogador_id))
    db.commit()
    row = db.execute("SELECT * FROM jogadores WHERE id = ?", (jogador_id,)).fetchone()
    return _serializar_jogador(row)


@router.delete("/admin/jogadores/{jogador_id}")
def remover_jogador(
    jogador_id: int,
    x_admin_key: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    erro = _checar_admin_key(x_admin_key)
    if erro:
        return erro
    existente = db.execute("SELECT id FROM jogadores WHERE id = ?", (jogador_id,)).fetchone()
    if existente is None:
        return _erro(404, "Jogador não encontrado", f"id {jogador_id}")
    db.execute("DELETE FROM jogadores WHERE id = ?", (jogador_id,))
    db.commit()
    return {"ok": True}


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
