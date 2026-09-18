"""Cria o banco SQLite, roda as migrations e popula os seeds.

Uso:
    python db/init.py                 # cria (se não existir) + migrations + seeds
    python db/init.py --reset         # apaga o arquivo do banco e recria do zero
    python db/init.py --seed-only     # roda apenas os seeds (sem migrations), limpando as tabelas antes
"""
import argparse
import os
import sqlite3
import sys
from pathlib import Path

DB_DIR = Path(__file__).resolve().parent
MIGRATIONS_DIR = DB_DIR / "migrations"
SEEDS_DIR = DB_DIR / "seeds"

DEFAULT_DB_PATH = DB_DIR / "copa2026.db"

# Ordem de limpeza respeita as foreign keys (filhas antes das mães)
TABELAS_EM_ORDEM_DE_LIMPEZA = [
    "palpites",
    "boloes",
    "escalacoes",
    "jogos",
    "jogadores",
    "selecoes",
]


def get_db_path() -> Path:
    return Path(os.environ.get("DB_PATH", str(DEFAULT_DB_PATH)))


def executar_sql_file(conn: sqlite3.Connection, path: Path) -> None:
    with open(path, encoding="utf-8") as f:
        conn.executescript(f.read())


def rodar_migrations(conn: sqlite3.Connection) -> None:
    for path in sorted(MIGRATIONS_DIR.glob("*.sql")):
        print(f"  migration: {path.name}")
        executar_sql_file(conn, path)


def rodar_seeds(conn: sqlite3.Connection) -> None:
    for path in sorted(SEEDS_DIR.glob("*.sql")):
        print(f"  seed: {path.name}")
        executar_sql_file(conn, path)


def limpar_dados(conn: sqlite3.Connection) -> None:
    for tabela in TABELAS_EM_ORDEM_DE_LIMPEZA:
        conn.execute(f"DELETE FROM {tabela}")
        conn.execute("DELETE FROM sqlite_sequence WHERE name = ?", (tabela,))
    conn.commit()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--reset", action="store_true", help="Apaga o arquivo do banco e recria do zero")
    parser.add_argument("--seed-only", action="store_true", help="Roda apenas os seeds, sem migrations")
    args = parser.parse_args()

    db_path = get_db_path()

    if args.reset and db_path.exists():
        print(f"Removendo banco existente: {db_path}")
        db_path.unlink()

    db_path.parent.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON")

    try:
        if args.seed_only:
            print("Limpando dados das tabelas...")
            limpar_dados(conn)
        else:
            print("Rodando migrations...")
            rodar_migrations(conn)

        print("Rodando seeds...")
        rodar_seeds(conn)
        conn.commit()
    finally:
        conn.close()

    print(f"Banco pronto em: {db_path}")


if __name__ == "__main__":
    sys.exit(main())
