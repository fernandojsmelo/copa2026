"""Rotas do simulador de bolão: bolões, palpites e chaveamento calculado."""
import sqlite3

from fastapi import APIRouter, Depends, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel, model_validator

from app.database import get_db_dependency
from app.services.chaveamento import GRUPOS, SLOTS_MATA_MATA, montar_chaveamento, selecionar_melhores_terceiros
from app.services.classificacao import calcular_classificacao_de_resultados

router = APIRouter()

SLOTS_VALIDOS = set(SLOTS_MATA_MATA)


def _erro(status_code: int, mensagem: str, detalhe: str = "") -> JSONResponse:
    return JSONResponse(status_code=status_code, content={"error": mensagem, "detail": detalhe})


def _exigir_sessao(x_session_id: str | None):
    if not x_session_id:
        return _erro(400, "Header X-Session-Id obrigatório")
    return None


def _bolao_da_sessao(db: sqlite3.Connection, bolao_id: int, session_id: str):
    row = db.execute("SELECT * FROM boloes WHERE id = ?", (bolao_id,)).fetchone()
    if row is None:
        return None, _erro(404, "Bolão não encontrado", f"id {bolao_id}")
    if row["session_id"] != session_id:
        return None, _erro(403, "Não autorizado", "esse bolão pertence a outra sessão")
    return row, None


class CriarBolaoBody(BaseModel):
    nome: str = "Meu Bolão"


class PalpiteBody(BaseModel):
    jogo_id: int | None = None
    chave_slot: str | None = None
    gols_a: int = 0
    gols_b: int = 0
    penaltis_a: int | None = None
    penaltis_b: int | None = None
    prorrogacao: bool = False

    @model_validator(mode="after")
    def um_dos_dois(self):
        if bool(self.jogo_id) == bool(self.chave_slot):
            raise ValueError("informe exatamente um entre jogo_id e chave_slot")
        if self.chave_slot and self.chave_slot not in SLOTS_VALIDOS:
            raise ValueError(f"chave_slot inválido — valores aceitos: {SLOTS_MATA_MATA}")
        return self


def _serializar_palpite(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "jogo_id": row["jogo_id"],
        "chave_slot": row["chave_slot"],
        "gols_a": row["gols_a"],
        "gols_b": row["gols_b"],
        "penaltis_a": row["penaltis_a"],
        "penaltis_b": row["penaltis_b"],
        "prorrogacao": bool(row["prorrogacao"]),
    }


@router.get("/boloes")
def listar_boloes(x_session_id: str | None = Header(default=None), db: sqlite3.Connection = Depends(get_db_dependency)):
    erro = _exigir_sessao(x_session_id)
    if erro:
        return erro
    rows = db.execute(
        "SELECT * FROM boloes WHERE session_id = ? ORDER BY criado_em DESC", (x_session_id,)
    ).fetchall()
    return [dict(row) for row in rows]


@router.post("/boloes")
def criar_bolao(
    body: CriarBolaoBody,
    x_session_id: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    erro = _exigir_sessao(x_session_id)
    if erro:
        return erro
    cursor = db.execute("INSERT INTO boloes (nome, session_id) VALUES (?, ?)", (body.nome, x_session_id))
    db.commit()
    row = db.execute("SELECT * FROM boloes WHERE id = ?", (cursor.lastrowid,)).fetchone()
    return dict(row)


@router.delete("/boloes/{bolao_id}")
def remover_bolao(
    bolao_id: int,
    x_session_id: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    erro = _exigir_sessao(x_session_id)
    if erro:
        return erro
    _, erro = _bolao_da_sessao(db, bolao_id, x_session_id)
    if erro:
        return erro
    db.execute("DELETE FROM boloes WHERE id = ?", (bolao_id,))
    db.commit()
    return {"ok": True}


@router.post("/boloes/{bolao_id}/duplicar")
def duplicar_bolao(
    bolao_id: int,
    x_session_id: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    erro = _exigir_sessao(x_session_id)
    if erro:
        return erro
    original, erro = _bolao_da_sessao(db, bolao_id, x_session_id)
    if erro:
        return erro

    cursor = db.execute(
        "INSERT INTO boloes (nome, session_id) VALUES (?, ?)", (f"{original['nome']} (cópia)", x_session_id)
    )
    novo_id = cursor.lastrowid
    db.execute(
        """
        INSERT INTO palpites (bolao_id, jogo_id, chave_slot, gols_a, gols_b, penaltis_a, penaltis_b, prorrogacao)
        SELECT ?, jogo_id, chave_slot, gols_a, gols_b, penaltis_a, penaltis_b, prorrogacao
        FROM palpites WHERE bolao_id = ?
        """,
        (novo_id, bolao_id),
    )
    db.commit()
    row = db.execute("SELECT * FROM boloes WHERE id = ?", (novo_id,)).fetchone()
    return dict(row)


@router.get("/boloes/{bolao_id}/palpites")
def listar_palpites(
    bolao_id: int,
    x_session_id: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    erro = _exigir_sessao(x_session_id)
    if erro:
        return erro
    _, erro = _bolao_da_sessao(db, bolao_id, x_session_id)
    if erro:
        return erro
    rows = db.execute("SELECT * FROM palpites WHERE bolao_id = ?", (bolao_id,)).fetchall()
    return [_serializar_palpite(row) for row in rows]


@router.post("/boloes/{bolao_id}/palpites")
def salvar_palpite(
    bolao_id: int,
    body: PalpiteBody,
    x_session_id: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    erro = _exigir_sessao(x_session_id)
    if erro:
        return erro
    _, erro = _bolao_da_sessao(db, bolao_id, x_session_id)
    if erro:
        return erro

    if body.jogo_id is not None:
        jogo = db.execute("SELECT fase FROM jogos WHERE id = ?", (body.jogo_id,)).fetchone()
        if jogo is None:
            return _erro(404, "Jogo não encontrado", f"id {body.jogo_id}")
        if jogo["fase"] != "grupo":
            return _erro(400, "Palpite por jogo_id só vale para a fase de grupos", "use chave_slot para o mata-mata")
        db.execute(
            """
            INSERT INTO palpites (bolao_id, jogo_id, gols_a, gols_b, penaltis_a, penaltis_b, prorrogacao)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(bolao_id, jogo_id) DO UPDATE SET
                gols_a = excluded.gols_a, gols_b = excluded.gols_b,
                penaltis_a = excluded.penaltis_a, penaltis_b = excluded.penaltis_b,
                prorrogacao = excluded.prorrogacao
            """,
            (bolao_id, body.jogo_id, body.gols_a, body.gols_b, body.penaltis_a, body.penaltis_b, int(body.prorrogacao)),
        )
        row = db.execute(
            "SELECT * FROM palpites WHERE bolao_id = ? AND jogo_id = ?", (bolao_id, body.jogo_id)
        ).fetchone()
    else:
        db.execute(
            """
            INSERT INTO palpites (bolao_id, chave_slot, gols_a, gols_b, penaltis_a, penaltis_b, prorrogacao)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(bolao_id, chave_slot) DO UPDATE SET
                gols_a = excluded.gols_a, gols_b = excluded.gols_b,
                penaltis_a = excluded.penaltis_a, penaltis_b = excluded.penaltis_b,
                prorrogacao = excluded.prorrogacao
            """,
            (bolao_id, body.chave_slot, body.gols_a, body.gols_b, body.penaltis_a, body.penaltis_b, int(body.prorrogacao)),
        )
        row = db.execute(
            "SELECT * FROM palpites WHERE bolao_id = ? AND chave_slot = ?", (bolao_id, body.chave_slot)
        ).fetchone()

    db.execute("UPDATE boloes SET atualizado_em = datetime('now') WHERE id = ?", (bolao_id,))
    db.commit()
    return _serializar_palpite(row)


def _selecoes_por_grupo(db: sqlite3.Connection) -> dict[str, list[dict]]:
    rows = db.execute(
        "SELECT id, grupo, nome_pt, codigo_iso, bandeira_emoji, eh_cabeca_chave, ranking_fifa FROM selecoes ORDER BY grupo, pote"
    ).fetchall()
    por_grupo: dict[str, list[dict]] = {g: [] for g in GRUPOS}
    for row in rows:
        if row["grupo"] in por_grupo:
            por_grupo[row["grupo"]].append(dict(row))
    return por_grupo


def _enriquecer_confronto(confronto: dict, selecoes_por_id: dict[int, dict]) -> dict:
    return {
        "selecao_a": selecoes_por_id.get(confronto["selecao_a_id"]),
        "selecao_b": selecoes_por_id.get(confronto["selecao_b_id"]),
        "vencedor_id": confronto["vencedor_id"],
        "palpite": confronto["palpite"],
    }


@router.get("/boloes/{bolao_id}/chaveamento")
def obter_chaveamento(
    bolao_id: int,
    x_session_id: str | None = Header(default=None),
    db: sqlite3.Connection = Depends(get_db_dependency),
):
    erro = _exigir_sessao(x_session_id)
    if erro:
        return erro
    _, erro = _bolao_da_sessao(db, bolao_id, x_session_id)
    if erro:
        return erro

    selecoes_por_id = {
        row["id"]: dict(row)
        for row in db.execute("SELECT id, nome_pt, codigo_iso, bandeira_emoji FROM selecoes").fetchall()
    }
    jogos_grupo = db.execute(
        "SELECT id, grupo, selecao_a_id, selecao_b_id FROM jogos WHERE fase = 'grupo' ORDER BY grupo, id"
    ).fetchall()

    palpites_rows = db.execute("SELECT * FROM palpites WHERE bolao_id = ?", (bolao_id,)).fetchall()
    palpites_por_jogo = {r["jogo_id"]: dict(r) for r in palpites_rows if r["jogo_id"] is not None}
    palpites_mata_mata = {r["chave_slot"]: dict(r) for r in palpites_rows if r["chave_slot"] is not None}

    selecoes_por_grupo = _selecoes_por_grupo(db)
    classificacoes: dict[str, list[dict]] = {}
    for grupo in GRUPOS:
        resultados = []
        for jogo in jogos_grupo:
            if jogo["grupo"] != grupo:
                continue
            palpite = palpites_por_jogo.get(jogo["id"])
            if palpite is None:
                continue
            resultados.append(
                {
                    "selecao_a_id": jogo["selecao_a_id"],
                    "selecao_b_id": jogo["selecao_b_id"],
                    "gols_a": palpite["gols_a"],
                    "gols_b": palpite["gols_b"],
                }
            )
        classificacoes[grupo] = calcular_classificacao_de_resultados(selecoes_por_grupo[grupo], resultados)

    melhores_terceiros = [classificacoes[g][2] for g in GRUPOS if len(classificacoes[g]) >= 3]
    confrontos = montar_chaveamento(classificacoes, palpites_mata_mata)

    def _fase(prefixo: str, quantidade: int):
        return [_enriquecer_confronto(confrontos[f"{prefixo}-{i}"], selecoes_por_id) for i in range(1, quantidade + 1)]

    campeao_id = confrontos["final"]["vencedor_id"]

    total_palpites_grupo = len(palpites_por_jogo)
    total_palpites_mata_mata = len(palpites_mata_mata)

    return {
        "grupos": classificacoes,
        "melhores_terceiros": selecionar_melhores_terceiros(melhores_terceiros),
        "mata_mata": {
            "oitavas": _fase("oitavas", 16),
            "quartas": _fase("quartas", 8),
            "semi1": _fase("semi1", 4),
            "semi2": _fase("semi2", 2),
            "terceiro": _enriquecer_confronto(confrontos["terceiro"], selecoes_por_id),
            "final": _enriquecer_confronto(confrontos["final"], selecoes_por_id),
        },
        "campeao": selecoes_por_id.get(campeao_id),
        "progresso": {
            "palpites_grupo": total_palpites_grupo,
            "total_grupo": len(jogos_grupo),
            "palpites_mata_mata": total_palpites_mata_mata,
            "total_mata_mata": len(SLOTS_MATA_MATA),
        },
    }
