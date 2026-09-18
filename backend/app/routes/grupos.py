"""Rotas de grupos e classificação."""
import sqlite3

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from app.database import get_db_dependency
from app.services.classificacao import calcular_classificacao

router = APIRouter()

GRUPOS_VALIDOS = list("ABCDEFGHIJKL")


def _erro(status_code: int, mensagem: str, detalhe: str = "") -> JSONResponse:
    return JSONResponse(status_code=status_code, content={"error": mensagem, "detail": detalhe})


@router.get("/grupos")
def listar_grupos(db: sqlite3.Connection = Depends(get_db_dependency)):
    return [{"grupo": letra, "selecoes": calcular_classificacao(db, letra)} for letra in GRUPOS_VALIDOS]


@router.get("/grupos/{letra}")
def obter_grupo(letra: str, db: sqlite3.Connection = Depends(get_db_dependency)):
    letra = letra.upper()
    if letra not in GRUPOS_VALIDOS:
        return _erro(400, "grupo inválido", "valores aceitos: A a L")
    return {"grupo": letra, "selecoes": calcular_classificacao(db, letra)}


@router.get("/classificacao")
def listar_classificacao(db: sqlite3.Connection = Depends(get_db_dependency)):
    return [{"grupo": letra, "selecoes": calcular_classificacao(db, letra)} for letra in GRUPOS_VALIDOS]
