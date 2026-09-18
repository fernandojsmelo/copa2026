"""Rotas de escalações da Seleção Brasileira — escopadas por sessão (header X-Session-Id)."""
import json
import sqlite3

from fastapi import APIRouter, Depends, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel, field_validator

from app.database import get_db_dependency

router = APIRouter()

FORMACOES_VALIDAS = {"4-3-3", "4-4-2", "4-2-3-1", "3-5-2", "5-3-2", "4-1-4-1", "3-4-3"}
MAX_ESCALACOES_POR_SESSAO = 10
MAX_TITULARES = 11
MAX_RESERVAS = 12


def _erro(status_code: int, mensagem: str, detalhe: str = "") -> JSONResponse:
    return JSONResponse(status_code=status_code, content={"error": mensagem, "detail": detalhe})


class TitularBody(BaseModel):
    slot: str
    jogador_id: int


class EscalacaoBody(BaseModel):
    nome: str = "Minha Escalação"
    formacao: str = "4-3-3"
    titulares: list[TitularBody]
    reservas: list[int] = []

    @field_validator("formacao")
    @classmethod
    def formacao_valida(cls, v):
        if v not in FORMACOES_VALIDAS:
            raise ValueError(f"formação inválida — valores aceitos: {sorted(FORMACOES_VALIDAS)}")
        return v


def _selecao_brasil_id(db: sqlite3.Connection) -> int:
    row = db.execute("SELECT id FROM selecoes WHERE nome_pt = 'Brasil'").fetchone()
    return row["id"]


def _validar_jogadores(db: sqlite3.Connection, body: EscalacaoBody) -> str | None:
    if len(body.titulares) > MAX_TITULARES:
        return f"máximo de {MAX_TITULARES} titulares"
    if len(body.reservas) > MAX_RESERVAS:
        return f"máximo de {MAX_RESERVAS} reservas"

    ids_titulares = [t.jogador_id for t in body.titulares]
    if len(set(ids_titulares)) != len(ids_titulares):
        return "jogador escalado em mais de um slot titular"
    if set(ids_titulares) & set(body.reservas):
        return "jogador não pode estar entre titulares e reservas ao mesmo tempo"

    todos_ids = set(ids_titulares) | set(body.reservas)
    if not todos_ids:
        return None

    brasil_id = _selecao_brasil_id(db)
    placeholders = ",".join("?" for _ in todos_ids)
    rows = db.execute(
        f"SELECT id FROM jogadores WHERE id IN ({placeholders}) AND selecao_id = ?",
        (*todos_ids, brasil_id),
    ).fetchall()
    if len(rows) != len(todos_ids):
        return "um ou mais jogadores não pertencem ao elenco da Seleção Brasileira"
    return None


def _serializar(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "nome": row["nome"],
        "formacao": row["formacao"],
        "titulares": json.loads(row["titulares_json"]),
        "reservas": json.loads(row["reservas_json"] or "[]"),
        "criado_em": row["criado_em"],
    }


@router.get("/escalacoes")
def listar_escalacoes(
    x_session_id: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    if not x_session_id:
        return _erro(400, "Header X-Session-Id obrigatório")
    rows = db.execute(
        "SELECT * FROM escalacoes WHERE session_id = ? ORDER BY criado_em DESC",
        (x_session_id,),
    ).fetchall()
    return [_serializar(row) for row in rows]


@router.post("/escalacoes")
def criar_escalacao(
    body: EscalacaoBody,
    x_session_id: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    if not x_session_id:
        return _erro(400, "Header X-Session-Id obrigatório")

    erro = _validar_jogadores(db, body)
    if erro:
        return _erro(400, "Escalação inválida", erro)

    total = db.execute(
        "SELECT COUNT(*) FROM escalacoes WHERE session_id = ?", (x_session_id,)
    ).fetchone()[0]
    if total >= MAX_ESCALACOES_POR_SESSAO:
        return _erro(400, f"Limite de {MAX_ESCALACOES_POR_SESSAO} escalações salvas atingido")

    titulares_json = json.dumps([t.model_dump() for t in body.titulares])
    reservas_json = json.dumps(body.reservas)

    cursor = db.execute(
        """
        INSERT INTO escalacoes (nome, formacao, titulares_json, reservas_json, session_id)
        VALUES (?, ?, ?, ?, ?)
        """,
        (body.nome, body.formacao, titulares_json, reservas_json, x_session_id),
    )
    db.commit()

    row = db.execute("SELECT * FROM escalacoes WHERE id = ?", (cursor.lastrowid,)).fetchone()
    return _serializar(row)


@router.put("/escalacoes/{escalacao_id}")
def atualizar_escalacao(
    escalacao_id: int,
    body: EscalacaoBody,
    x_session_id: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    if not x_session_id:
        return _erro(400, "Header X-Session-Id obrigatório")

    existente = db.execute("SELECT session_id FROM escalacoes WHERE id = ?", (escalacao_id,)).fetchone()
    if existente is None:
        return _erro(404, "Escalação não encontrada", f"id {escalacao_id}")
    if existente["session_id"] != x_session_id:
        return _erro(403, "Não autorizado", "essa escalação pertence a outra sessão")

    erro = _validar_jogadores(db, body)
    if erro:
        return _erro(400, "Escalação inválida", erro)

    titulares_json = json.dumps([t.model_dump() for t in body.titulares])
    reservas_json = json.dumps(body.reservas)

    db.execute(
        """
        UPDATE escalacoes
        SET nome = ?, formacao = ?, titulares_json = ?, reservas_json = ?
        WHERE id = ?
        """,
        (body.nome, body.formacao, titulares_json, reservas_json, escalacao_id),
    )
    db.commit()

    row = db.execute("SELECT * FROM escalacoes WHERE id = ?", (escalacao_id,)).fetchone()
    return _serializar(row)


@router.delete("/escalacoes/{escalacao_id}")
def remover_escalacao(
    escalacao_id: int,
    x_session_id: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    if not x_session_id:
        return _erro(400, "Header X-Session-Id obrigatório")

    existente = db.execute("SELECT session_id FROM escalacoes WHERE id = ?", (escalacao_id,)).fetchone()
    if existente is None:
        return _erro(404, "Escalação não encontrada", f"id {escalacao_id}")
    if existente["session_id"] != x_session_id:
        return _erro(403, "Não autorizado", "essa escalação pertence a outra sessão")

    db.execute("DELETE FROM escalacoes WHERE id = ?", (escalacao_id,))
    db.commit()
    return {"ok": True}
