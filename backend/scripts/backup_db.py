"""Backup do banco SQLite com timestamp e rotação de backups antigos.

Uso: python scripts/backup_db.py

Variáveis de ambiente:
    DB_PATH         caminho do banco (padrão: db/copa2026.db)
    BACKUP_DIR      pasta de destino dos backups (padrão: db/backups)
    MANTER_ULTIMOS  quantos backups mais recentes manter (padrão: 14)

Agendar via cron (backup diário às 3h da manhã):
    0 3 * * * cd /caminho/para/backend && .venv/bin/python scripts/backup_db.py >> /var/log/copa2026-backup.log 2>&1
"""
import gzip
import os
import shutil
import sqlite3
import sys
from datetime import datetime
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent
DB_PATH = Path(os.environ.get("DB_PATH", BACKEND_DIR / "db" / "copa2026.db"))
BACKUP_DIR = Path(os.environ.get("BACKUP_DIR", BACKEND_DIR / "db" / "backups"))
MANTER_ULTIMOS = int(os.environ.get("MANTER_ULTIMOS", "14"))


def main() -> None:
    if not DB_PATH.exists():
        print(f"Banco não encontrado em {DB_PATH}", file=sys.stderr)
        sys.exit(1)

    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    destino = BACKUP_DIR / f"copa2026-{timestamp}.db"

    # Connection.backup() é seguro com o banco em uso (ao contrário de copiar
    # o arquivo cru, que pode capturar um estado inconsistente em WAL).
    origem = sqlite3.connect(DB_PATH)
    copia = sqlite3.connect(destino)
    with copia:
        origem.backup(copia)
    origem.close()
    copia.close()

    destino_gz = destino.with_suffix(".db.gz")
    with open(destino, "rb") as f_in, gzip.open(destino_gz, "wb") as f_out:
        shutil.copyfileobj(f_in, f_out)
    destino.unlink()

    backups = sorted(BACKUP_DIR.glob("copa2026-*.db.gz"), reverse=True)
    for antigo in backups[MANTER_ULTIMOS:]:
        antigo.unlink()

    print(f"Backup criado: {destino_gz}")


if __name__ == "__main__":
    main()
