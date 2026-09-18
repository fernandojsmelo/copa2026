import logging
import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import CORS_ORIGINS
from app.routes import health

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("copa2026")

app = FastAPI(title="Copa do Mundo 2026 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    inicio = time.monotonic()
    response = await call_next(request)
    duracao_ms = (time.monotonic() - inicio) * 1000
    logger.info("%s %s -> %s (%.1fms)", request.method, request.url.path, response.status_code, duracao_ms)
    return response


@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(status_code=404, content={"error": "Não encontrado", "detail": str(exc)})


@app.exception_handler(500)
async def internal_error_handler(request: Request, exc):
    logger.exception("Erro interno em %s %s", request.method, request.url.path)
    return JSONResponse(status_code=500, content={"error": "Erro interno do servidor", "detail": str(exc)})


app.include_router(health.router, prefix="/api")
