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

## Painel administrativo

Acesse `http://localhost:5173/admin` (sem link na navegação pública) e use o
valor de `ADMIN_KEY` do `backend/.env` como senha — por padrão, em
desenvolvimento, `troque-esta-chave` (definido em `backend/.env.example`).
Permite atualizar placar/status dos jogos e editar os elencos.

## Banco de dados

O banco é um arquivo SQLite único (`backend/db/copa2026.db`), sem Docker e sem
servidor externo.

```bash
make db-reset   # apaga o banco e recria do zero (migrations + seeds)
make db-seed    # limpa e repopula os dados, sem recriar o schema
```

Migrations ficam em `backend/db/migrations/`, seeds em `backend/db/seeds/`.

## Deploy

O projeto roda direto na máquina/servidor, sem Docker (decisão do Claude.md).
Os arquivos de exemplo estão em [deploy/](deploy/).

1. **Backend**: crie o venv e instale as dependências normalmente
   (`make install-backend`), copie `backend/.env.production.example` para
   `backend/.env` no servidor e ajuste `ADMIN_KEY` (gere uma chave forte, ex.
   `openssl rand -hex 32`) e `CORS_ORIGINS` (domínio real do frontend). Rode
   `make db-init` uma vez para criar o banco. Instale o serviço systemd:

   ```bash
   sudo cp deploy/copa2026-backend.service /etc/systemd/system/
   # edite User=, WorkingDirectory= e o caminho do ExecStart= para o seu ambiente
   sudo systemctl daemon-reload
   sudo systemctl enable --now copa2026-backend
   ```

   Um único worker uvicorn é o recomendado: SQLite não paraleliza escritas
   entre processos, então múltiplos workers não ajudam a performance e só
   aumentam o risco de "database is locked" em picos de escrita simultânea.
   O modo WAL do SQLite (já ativado em `app/database.py`) permite leituras
   concorrentes durante uma escrita, que é o ganho de concorrência real
   disponível aqui.

2. **Frontend**: gere o build de produção (`make build-frontend`, gera
   `frontend/dist/`) e sirva os arquivos estáticos com proxy reverso para a
   API — `deploy/nginx.conf.example` tem um exemplo completo (SPA fallback
   para `index.html`, proxy de `/api/` para `127.0.0.1:8000`, gzip para os
   assets). Para HTTPS, rode o certbot depois de confirmar que o HTTP
   funciona.

3. **Backup do banco**: `backend/scripts/backup_db.py` faz uma cópia segura
   do SQLite mesmo com o banco em uso (usa `sqlite3.Connection.backup()`,
   não uma cópia crua do arquivo), compacta em `.gz` e mantém só os N mais
   recentes (`MANTER_ULTIMOS`, padrão 14). Testado localmente: backup gerado,
   restaurado e os dados conferidos íntegros. Agendar via cron:

   ```bash
   0 3 * * * cd /opt/copa2026/backend && .venv/bin/python scripts/backup_db.py >> /var/log/copa2026-backup.log 2>&1
   ```

   (ou `make backup-db` para rodar manualmente em qualquer ambiente)

## Testes realizados (Sprint 8)

Não há uma suíte de testes automatizados configurada (Jest/Pytest) — o
Tasks.md pede verificação manual dos fluxos críticos, feita via navegador
(Playwright) e chamadas diretas à API:

- **Classificação**: validada com cenários variados em grupos reais (via
  painel admin), incluindo um desempate por confronto direto construído
  propositalmente (dois times empatados em pontos/saldo/gols, decidido pelo
  resultado entre eles) — o resultado bateu exatamente com o esperado.
- **Bolão**: simulação completa dos 72 jogos de grupo + 32 do mata-mata até
  o campeão, testada tanto via API (script E2E) quanto via UI real.
- **Escalação**: as 7 formações (4-3-3, 4-4-2, 4-2-3-1, 3-5-2, 5-3-2,
  4-1-4-1, 3-4-3) confirmadas com 11 slots corretamente posicionados cada.
- **Countdown**: testado ponta a ponta contando até zero (data-alvo alterada
  temporariamente para alguns segundos no futuro) e a transição para "A Copa
  começou!" confirmada.
- **Mobile**: testado em viewport 375×812 (Chromium via Playwright) em todas
  as páginas principais. Isso **não** é o mesmo que testar em iOS Safari ou
  Chrome Android de verdade (engines de renderização diferentes) — o item do
  Tasks.md pede especificamente esses navegadores, que não há como acessar
  neste ambiente.

## Estrutura do projeto

```
backend/    API FastAPI, banco SQLite, migrations e seeds
frontend/   React + Vite + Tailwind CSS
deploy/     Templates de systemd e nginx para produção
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

## Notas sobre o simulador de bolão

- **`palpites.jogo_id` virou opcional** (migration `002_palpites_chave_virtual.sql`):
  os confrontos do mata-mata no simulador são hipotéticos — dependem de quem
  cada usuário simulou como classificado na fase de grupos, então dois bolões
  podem ter "o vencedor do Grupo A" diferente. Não dá pra referenciar uma linha
  `jogos` real e compartilhada nesse caso. A nova coluna `chave_slot` (ex.:
  `"oitavas-1"`, `"final"`) identifica o confronto virtual quando `jogo_id` é
  `NULL`.
- **Chaveamento das oitavas é um algoritmo próprio**, não a tabela oficial da
  FIFA: as fontes do projeto (PRD.md/Claude.md) não trazem essa tabela, só
  dizem que ela "deve estar hardcoded" sem fornecer os dados — inventar um
  cruzamento e apresentá-lo como oficial arriscaria informação incorreta. O
  algoritmo (documentado em `backend/app/services/chaveamento.py`) pareia o
  1º de cada grupo com o 2º do grupo seguinte, e semeia os 8 melhores
  terceiros entre si (1º×8º, 2º×7º...).
- **`db/init.py` agora rastreia migrations e seeds já aplicados** (tabela
  `_schema_migrations`): antes, rodar `python db/init.py` sem `--reset`
  duplicava todos os dados a cada execução (os seeds eram sempre
  reinseridos). Isso já existia desde o Sprint 0 e só foi notado agora, ao
  precisar de uma migration que recria uma tabela (`002`, para tornar
  `jogo_id` opcional) — rodar essa migration duas vezes teria apagado a
  coluna nova.

## Status

- [x] Sprint 0 — Fundação e Setup
- [x] Sprint 1 — Landing Page
- [x] Sprint 2 — Tabela de Jogos
- [x] Sprint 3 — Classificação e Grupos
- [x] Sprint 4 — Elencos das Seleções
- [x] Sprint 5 — Escalação da Seleção Brasileira
- [x] Sprint 6 — Bolão e Simulador de Chaveamento
- [x] Sprint 7 — Painel Admin e Polimento
- [x] Sprint 8 — Testes e Deploy

Detalhamento completo em [Tasks.md](Tasks.md).
