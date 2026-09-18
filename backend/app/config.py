"""Configuração da aplicação: variáveis de ambiente e paths."""
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BACKEND_DIR = Path(__file__).resolve().parent.parent

DB_PATH = Path(os.environ.get("DB_PATH", str(BACKEND_DIR / "db" / "copa2026.db")))
PORT = int(os.environ.get("PORT", "8000"))
ADMIN_KEY = os.environ.get("ADMIN_KEY", "")

# Fallback inclui o domínio do frontend em produção (Vercel) além do dev local,
# para não depender de configurar a variável de ambiente CORS_ORIGINS no painel
# do Vercel — defina a env var lá se o domínio mudar no futuro.
_CORS_PADRAO = "http://localhost:5173,https://frontend-eight-pi-37.vercel.app"

CORS_ORIGINS = [
    origin.strip()
    for origin in os.environ.get("CORS_ORIGINS", _CORS_PADRAO).split(",")
    if origin.strip()
]
