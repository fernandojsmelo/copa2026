"""Configuração da aplicação: variáveis de ambiente e paths."""
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BACKEND_DIR = Path(__file__).resolve().parent.parent

DB_PATH = Path(os.environ.get("DB_PATH", str(BACKEND_DIR / "db" / "copa2026.db")))
PORT = int(os.environ.get("PORT", "8000"))
ADMIN_KEY = os.environ.get("ADMIN_KEY", "")

CORS_ORIGINS = [
    origin.strip()
    for origin in os.environ.get("CORS_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]
