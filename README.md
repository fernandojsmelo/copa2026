# Copa do Mundo 2026 App

Aplicação web sobre a Copa do Mundo FIFA 2026 (EUA, Canadá e México). Backend em
Python/FastAPI com SQLite (sem ORM), frontend em React + Vite + Tailwind CSS.

Contexto completo do produto e das decisões técnicas em [PRD.md](PRD.md),
[Tasks.md](Tasks.md) e [Claude.md](Claude.md).

## Requisitos

- Python 3.11+
- Node.js 20+

## Setup

```bash
# Instala backend (venv + deps) e frontend (node_modules)
make install

# Cria o banco SQLite e popula com os dados iniciais
make db-init
```

## Rodando em desenvolvimento

Em dois terminais separados:

```bash
make dev-backend    # http://localhost:8000
make dev-frontend   # http://localhost:5173
```

A documentação interativa da API fica em `http://localhost:8000/docs`.

## Banco de dados

O banco é um arquivo SQLite único (`backend/db/copa2026.db`), sem Docker e sem
servidor externo.

```bash
make db-reset   # apaga o banco e recria do zero (migrations + seeds)
make db-seed    # limpa e repopula os dados, sem recriar o schema
```

Migrations ficam em `backend/db/migrations/`, seeds em `backend/db/seeds/`.

## Estrutura do projeto

```
backend/    API FastAPI, banco SQLite, migrations e seeds
frontend/   React + Vite + Tailwind CSS
```

## Notas sobre os dados de seed

- **48 seleções** (`01_selecoes.sql`): grupos e potes derivados da tabela "Grupos
  Completos" do PRD.md. Essa tabela original tinha duas seleções duplicadas em
  grupos diferentes (Colômbia em G/J, Croácia em C/L) e duas vagas de repescagem
  em aberto (grupos F e H) — todas as 4 vagas correspondentes foram semeadas como
  placeholder `"A Definir"` até a correção dos dados oficiais do sorteio.
- **72 jogos da fase de grupos** (`02_jogos.sql`): PRD.md/Tasks.md citam "48
  jogos", mas o round-robin padrão de 4 seleções por grupo (3 jogos por seleção,
  regra oficial da Copa) resulta em 72 jogos (6 por grupo × 12 grupos) — é esse
  número que bate com o total de 104 jogos do torneio citado na seção 1.2 do
  PRD.md (72 + 16 + 8 + 4 + 2 + 1 + 1). Datas, horários e estádios são uma
  distribuição sintética para popular o ambiente de desenvolvimento, não o
  calendário oficial da FIFA.
- **Elenco do Brasil** (`03_jogadores_brasil.sql`): os 23 jogadores da seção 8 do
  PRD.md.
- **Elencos das demais 47 seleções** (`04_jogadores_outros.sql`): jogadores
  placeholder (`"Jogador N (COD)"`) até que elencos oficiais sejam divulgados —
  evita atribuir nomes de atletas reais sem fonte confirmada.

## Status

- [x] Sprint 0 — Fundação e Setup
- [x] Sprint 1 — Landing Page
- [x] Sprint 2 — Tabela de Jogos
- [x] Sprint 3 — Classificação e Grupos
- [x] Sprint 4 — Elencos das Seleções
- [ ] Sprint 5 — Escalação da Seleção Brasileira
- [ ] Sprint 6 — Bolão e Simulador de Chaveamento
- [ ] Sprint 7 — Painel Admin e Polimento
- [ ] Sprint 8 — Testes e Deploy

Detalhamento completo em [Tasks.md](Tasks.md).
