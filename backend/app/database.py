"""Conexão com o SQLite. SQL puro, sem ORM — queries sempre parametrizadas."""
import sqlite3
from contextlib import contextmanager

from app.config import DB_PATH


def _connect() -> sqlite3.Connection:
    # check_same_thread=False: dependências síncronas do FastAPI rodam em threadpool
    # (anyio), e a fase de setup/teardown de um generator dependency pode cair em
    # threads diferentes do anyio para a mesma requisição — a conexão nunca é
    # compartilhada entre requisições concorrentes, então é seguro desativar o check.
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    # WAL: leitores não bloqueiam o escritor (e vice-versa) — importante em
    # produção, onde várias requisições GET podem chegar enquanto um PATCH
    # admin está em andamento. Sem isso, o modo padrão (rollback journal)
    # bloqueia todo mundo durante uma escrita.
    conn.execute("PRAGMA journal_mode = WAL")
    return conn


@contextmanager
def get_db():
    """Context manager para uso direto: `with get_db() as db: ...`."""
    conn = _connect()
    try:
        yield conn
    finally:
        conn.close()


def get_db_dependency():
    """Dependency do FastAPI: `db: sqlite3.Connection = Depends(get_db_dependency)`."""
    conn = _connect()
    try:
        yield conn
    finally:
        conn.close()
