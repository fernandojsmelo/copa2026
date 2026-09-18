"""Conexão com o SQLite. SQL puro, sem ORM — queries sempre parametrizadas."""
import sqlite3
from contextlib import contextmanager

from app.config import DB_PATH


def _connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
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
