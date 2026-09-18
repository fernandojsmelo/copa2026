# Tasks.md — Copa do Mundo 2026 App
**Plano de Desenvolvimento por Sprints**
Versão: 1.0 | Metodologia: Iterativa por Feature

---

## Legenda
- [ ] Pendente
- [~] Em andamento
- [x] Concluído
- 🔴 Bloqueador
- 🟡 Dependência
- 🟢 Independente

---

## 📦 SPRINT 0 — Fundação e Setup (Estimativa: 1–2 dias)

### S0.1 — Estrutura do Projeto
- [x] 🟢 Criar estrutura de diretórios do projeto
  ```
  copa2026/
  ├── backend/
  │   ├── app/
  │   │   ├── routes/
  │   │   ├── models/
  │   │   └── services/
  │   ├── db/
  │   │   ├── migrations/
  │   │   └── seeds/
  │   └── main.py (ou index.js)
  ├── frontend/
  │   ├── public/
  │   ├── src/
  │   │   ├── components/
  │   │   ├── pages/
  │   │   └── assets/
  │   └── index.html
  ├── claude.md
  ├── prd.md
  └── tasks.md
  ```
- [x] 🟢 Inicializar projeto (package.json / pyproject.toml)
- [x] 🟢 Configurar linting e formatação (ESLint/Prettier ou Black/Ruff)
- [x] 🟢 Criar `.gitignore` adequado
- [x] 🟢 README.md com instruções de setup

### S0.2 — Banco de Dados SQLite
- [x] 🟢 Criar migration `001_create_tables.sql` com todas as tabelas
- [x] 🟢 Criar script de inicialização do banco `db/init.py` (ou `init.js`)
- [x] 🟢 Criar seed `seeds/selecoes.sql` — todas as 48 seleções com grupos, potes e cabeças de chave
- [x] 🟢 Criar seed `seeds/jogos_fase_grupos.sql` — jogos da fase de grupos com datas, horários e estádios (72 jogos, não 48 — ver nota no README.md)
- [x] 🟢 Criar seed `seeds/jogadores_brasil.sql` — elenco completo da Seleção Brasileira (23 jogadores)
- [x] 🟢 Criar seed `seeds/jogadores_outros.sql` — elencos simplificados das demais 47 seleções (placeholders, ver nota no README.md)
- [x] 🟢 Script `npm run db:reset` / `make db-reset` para recriar banco do zero
- [x] 🟢 Script `npm run db:seed` para popular dados
- [x] 🟢 Verificar integridade referencial (foreign keys ativas no SQLite)

### S0.3 — Backend Base
- [x] 🟢 Setup do servidor (FastAPI com uvicorn / Express)
- [x] 🟢 Configurar CORS para desenvolvimento local
- [x] 🟢 Middleware de logging de requests
- [x] 🟢 Rota de health check: `GET /api/health`
- [x] 🟢 Tratamento global de erros (404, 500)
- [x] 🟢 Variáveis de ambiente (.env): `DB_PATH`, `PORT`, `ADMIN_KEY`

### S0.4 — Frontend Base
- [x] 🟢 Setup React + Vite (ou HTML/CSS/JS simples)
- [x] 🟢 Instalar Tailwind CSS + configurar tema personalizado (cores verde/amarelo/azul do Brasil)
- [x] 🟢 Criar sistema de roteamento (React Router ou páginas HTML separadas)
- [x] 🟢 Criar componentes base: `Header`, `Footer`, `Layout`, `Loader`, `ErrorBoundary`
- [x] 🟢 Importar fontes: uma display moderna + corpo legível
- [x] 🟢 Definir design tokens (CSS variables): cores, espaçamentos, sombras

---

## 🏠 SPRINT 1 — Landing Page (Estimativa: 2–3 dias)

### S1.1 — Hero Section
- [x] 🟢 Criar componente `HeroSection`
- [x] 🟢 Background visual temático Copa 2026 (gradiente, textura ou imagem)
- [x] 🟢 Logo/título do app
- [x] 🟢 Tagline e chamada para ação

### S1.2 — Countdown Regressivo
- [x] 🟢 Criar componente `Countdown`
- [x] 🟢 Data alvo: 11/06/2026 às 17h00 (horário de Brasília, GMT-3)
- [x] 🟢 Exibir: DIAS / HORAS / MINUTOS / SEGUNDOS com animação de flip ou pulse
- [x] 🟢 `setInterval` atualizando a cada 1 segundo
- [x] 🟢 Mensagem pós-Copa: "A Copa começou!" quando countdown zera
- [x] 🟢 Responsivo: layout empilhado em mobile

### S1.3 — Próximos Jogos (widget)
- [x] 🟡 (depende S0.2) Criar API: `GET /api/jogos?limit=5&status=agendado`
- [x] 🟢 Componente `ProximosJogos` com scroll horizontal em mobile
- [x] 🟢 Card de jogo: bandeiras, horário (brasília), estádio

### S1.4 — Últimos Resultados (widget)
- [x] 🟡 Criar API: `GET /api/jogos?status=encerrado&limit=5`
- [x] 🟢 Componente `UltimosResultados` com placar final

### S1.5 — Stats da Copa
- [x] 🟢 Seção com cards estáticos: 48 seleções, 104 jogos, 16 cidades, 3 países-sede
- [x] 🟢 Animação de count-up nos números ao entrar na viewport

### S1.6 — Navegação Principal
- [x] 🟢 Navbar fixa com links: Tabela | Grupos | Elencos | Brasil | Bolão
- [x] 🟢 Menu hamburger mobile
- [x] 🟢 Indicador de página ativa

---

## 📅 SPRINT 2 — Tabela de Jogos (Estimativa: 3 dias)

### S2.1 — API de Jogos
- [x] 🟡 `GET /api/jogos` — lista paginada com filtros:
  - `?fase=grupo|oitavas|quartas|semi|terceiro|final` (schema usa `grupo`, singular — Tasks.md original dizia `grupos`)
  - `?grupo=A|B|...|L`
  - `?selecao_id=:id`
  - `?data=YYYY-MM-DD` (data civil em horário de Brasília)
  - `?status=agendado|em_andamento|encerrado`
- [x] 🟡 `GET /api/jogos/:id` — detalhe de um jogo
- [x] 🟡 `PATCH /api/admin/jogos/:id` — atualizar placar (autenticado via header `X-Admin-Key`)

### S2.2 — Componente de Tabela
- [x] 🟡 Página `TabelaPage`
- [x] 🟢 Barra de filtros: fase, grupo, data, seleção
- [x] 🟢 Agrupamento visual por data (ex: "Terça, 11 de junho")
- [x] 🟡 Componente `JogoCard`:
  - Bandeiras e nomes das seleções
  - Horário (brasília)
  - Placar (ou "-" se não iniciado)
  - Estádio e cidade
  - Badge de status (Agendado / Ao vivo / Encerrado)
  - Fase e grupo
- [x] 🟢 Loading skeleton durante fetch
- [x] 🟢 Estado vazio: "Nenhum jogo encontrado para esse filtro"

### S2.3 — Detalhes do Jogo
- [x] 🟡 Página de detalhe do jogo (`/jogos/:id`)
- [x] 🟢 Informações completas: data, horário, sede (árbitro não consta no schema/PRD, não há dado a exibir)
- [ ] 🟢 Mini-tabela do grupo ao qual pertence o jogo — depende do serviço de cálculo de classificação (Sprint 3, S3.1)

---

## 🏆 SPRINT 3 — Classificação e Grupos (Estimativa: 3 dias)

### S3.1 — API de Grupos e Classificação
- [x] 🟡 `GET /api/grupos` — lista de todos os grupos com seleções
- [x] 🟡 `GET /api/grupos/:letra` — detalhe de um grupo com classificação calculada
- [x] 🟡 `GET /api/classificacao` — classificação de todos os grupos
- [x] 🟢 Serviço de cálculo de classificação: aplica pontuação + regras de desempate FIFA (confronto direto via mini-liga; fair play não implementado — não há esse dado no schema)

### S3.2 — Visualização de Grupos
- [x] 🟡 Página `GruposPage`
- [x] 🟢 Grid de 12 grupos (A–L) em 3 ou 4 colunas
- [x] 🟡 Componente `TabelaGrupo`:
  - Header com nome do grupo e bandeira da cabeça de chave
  - Linhas: posição, bandeira, seleção, J, V, E, D, GP, GC, SG, Pts
  - Cores: verde (top 2), amarelo (3º em disputa), vermelho (eliminado) — só aplicadas quando o grupo já tem os 6 jogos encerrados; senão "indefinido"
  - Badge "Cabeça de Chave" na seleção do Pote 1
- [x] 🟢 Tab/filtro para ver grupo específico em tela cheia
- [x] 🟡 Jogos do grupo abaixo da tabela (rodadas 1, 2, 3)

### S3.3 — Seção de Potes
- [x] 🟢 Componente `PotesSection`
- [x] 🟢 4 potes com bandeiras e nomes de todas as 48 seleções
- [x] 🟢 Destaque visual para cabeças de chave (Pote 1)

---

## 🌍 SPRINT 4 — Elencos das Seleções (Estimativa: 3–4 dias)

### S4.1 — API de Seleções e Jogadores
- [x] 🟡 `GET /api/selecoes` — lista de todas as 48 seleções (perfil completo: confederação, treinador, ranking FIFA)
- [x] 🟡 `GET /api/selecoes/:id` — dados da seleção
- [x] 🟡 `GET /api/selecoes/:id/jogadores` — elenco completo com filtro por posição
- [x] 🟡 `GET /api/selecoes/:id/jogos` — não é uma rota própria: `GET /api/jogos?selecao_id=:id` (Sprint 2) já cobre isso, evitando duplicar a query

### S4.2 — Página de Seleções
- [x] 🟡 Página `ElencoPage`
- [x] 🟢 Search bar para buscar seleção por nome
- [x] 🟢 Grid de seleções com bandeira e nome (filtro por grupo/confederação)
- [x] 🟡 Componente `PerfilSelecao`:
  - Banner com bandeira grande
  - Treinador, confederação, ranking FIFA
  - Grupo e pote
  - Resultados na Copa (atualizado) — jogos da seleção + posição atual no grupo
- [x] 🟡 Componente `TabelaElenco`:
  - Colunas: #, Nome, Posição, Clube, Idade
  - Filtros por posição
  - Ícone de capitão
- [x] 🟢 Navegação entre seleções (anterior / próxima)

---

## 🇧🇷 SPRINT 5 — Escalação da Seleção Brasileira (Estimativa: 4–5 dias)

### S5.1 — API de Escalação
- [x] 🟡 `GET /api/escalacoes` — listar escalações salvas (escopo por sessão via header `X-Session-Id`)
- [x] 🟡 `POST /api/escalacoes` — salvar nova escalação (valida formação, duplicidade e se os jogadores pertencem ao elenco do Brasil)
- [x] 🟡 `PUT /api/escalacoes/:id` — atualizar escalação (só o dono da sessão)
- [x] 🟡 `DELETE /api/escalacoes/:id` — remover escalação (só o dono da sessão)

### S5.2 — Campo de Futebol Interativo
- [x] 🟢 Componente `CampoFutebol` (SVG para as linhas + overlay HTML para os slots interativos)
- [x] 🟢 Campo com gramado, linhas, área, círculo central
- [x] 🟢 Slots de posição baseados na formação selecionada
- [x] 🟢 Cada slot mostra: número e nome do jogador alocado
- [x] 🟢 Slot vazio: círculo pulsante indicando que precisa ser preenchido

### S5.3 — Seletor de Formação
- [x] 🟢 Dropdown com formações: 4-3-3, 4-4-2, 4-2-3-1, 3-5-2, 5-3-2, 4-1-4-1, 3-4-3
- [x] 🟢 Ao mudar formação: repositicionar slots no campo, manter jogadores alocados quando possível (testado: GK/DEF preservados, quem perde o slot volta ao banco)

### S5.4 — Lista de Convocados
- [x] 🟡 Painel lateral com 23 convocados
- [x] 🟢 Filtro por posição (GK, DEF, MEI, ATA)
- [x] 🟢 Jogador já alocado aparece destacado (marcado "titular")
- [x] 🟢 Arrastar jogador para o slot (drag & drop via HTML5 API)
- [x] 🟢 Fallback mobile: em vez de modal, toque no convocado arma a seleção e o toque no slot posiciona — funciona igual para trocar titulares entre si

### S5.5 — Reservas e Banco
- [x] 🟢 Banco de reservas — derivado automaticamente (não é estado à parte): todo convocado que não está em nenhum slot titular
- [x] 🟢 Jogadores não titulares aparecem no banco automaticamente
- [x] 🟢 Troca fácil: clicar em jogador (banco ou campo) arma a seleção, clicar em um slot posiciona/troca

### S5.6 — Salvar e Compartilhar
- [x] 🟡 Botão "Salvar Escalação" com nome personalizado
- [x] 🟡 Persistência no SQLite via API
- [x] 🟢 Lista de escalações salvas (máx. 10, reforçado no backend)
- [x] 🟢 Botão "Exportar como imagem" (html2canvas, testado e confere)
- [x] 🟢 Validação: botão "Salvar" fica desabilitado até os 11 titulares estarem definidos, com contador "X/11" visível

---

## 🎯 SPRINT 6 — Bolão e Simulador de Chaveamento (Estimativa: 5–6 dias)

### S6.1 — API de Bolão
- [x] 🟡 `GET /api/boloes` — listar bolões da sessão
- [x] 🟡 `POST /api/boloes` — criar bolão
- [x] 🟡 `GET /api/boloes/:id/palpites` — palpites de um bolão
- [x] 🟡 `POST /api/boloes/:id/palpites` — salvar/atualizar palpite (grupo via `jogo_id` ou mata-mata via `chave_slot` virtual — ver nota no README.md sobre a migration 002)
- [x] 🟡 `GET /api/boloes/:id/chaveamento` — chaveamento calculado com base nos palpites
- [x] 🟡 `DELETE /api/boloes/:id` — remover bolão
- [x] 🟢 (extra, necessário para S6.4) `POST /api/boloes/:id/duplicar`

### S6.2 — Simulador de Fase de Grupos
- [x] 🟡 Página `BolaoPage`
- [x] 🟢 Abas: "Fase de Grupos" e "Mata-Mata" — 2 abas em vez de 5 ("Grupos"/"Oitavas"/"Quartas"/"Semis"/"Final"); o Mata-Mata mostra o chaveamento completo com scroll horizontal em vez de fragmentar em 4 abas quase vazias
- [x] 🟡 Para cada jogo da fase de grupos:
  - Bandeiras e nomes das seleções
  - Input de placar (0–20, steppers +/-)
  - Botão de empate rápido
- [x] 🟡 Classificação em tempo real ao lado (atualiza conforme palpites)
- [x] 🟡 Serviço de cálculo: `calcular_classificacao_de_resultados` (reaproveitado do serviço de classificação real do Sprint 3) → classificados
- [x] 🟡 Seleção dos 8 melhores terceiros — automático (pontos/saldo/gols/ranking FIFA/id); não há UI para desempate manual quando todos os critérios empatam (cai num fallback determinístico)

### S6.3 — Chaveamento Visual (Bracket)
- [x] 🟡 Componente `Chaveamento` (colunas por rodada, scroll horizontal)
- [x] 🟢 Visual de chave estilo mata-mata: oitavas → quartas → semi → final
- [x] 🟢 Cada confronto: bandeira das seleções, placar, vencedor destacado
- [x] 🟢 Destaque visual para o campeão (troféu + bandeira grande); sem animação de confete
- [x] 🟡 Ao definir palpite em um jogo: vencedor avança automaticamente para próxima fase
- [x] 🟢 Toggle "Prorrogação" e "Pênaltis" em cada confronto de mata-mata (pênaltis só aparecem quando o placar empata)
- [x] 🟢 Input de placar nos pênaltis (ex: 4 × 3)
- [x] 🟢 Chaveamento navegável em mobile (scroll horizontal)

### S6.4 — Gestão de Múltiplos Bolões
- [x] 🟡 Dropdown para alternar entre bolões
- [x] 🟢 Criar novo bolão com nome personalizado — formulário inline, não modal (consistente com o resto do app, que não usa modais)
- [x] 🟢 Duplicar bolão existente (copia todos os palpites)
- [ ] 🟡 Comparação: resultado do bolão vs. resultado real — não implementado; só faz sentido quando a Copa tiver jogos reais encerrados, o que ainda não é o caso
- [ ] 🟢 Percentual de acertos ao lado de cada palpite — depende do item acima

### S6.5 — Progresso e Persistência
- [x] 🟡 Barra de progresso: "X de 104 palpites preenchidos" (72 da fase de grupos + 32 do mata-mata — ver nota sobre "48 jogos" no README.md desde o Sprint 0)
- [x] 🟡 Auto-save a cada mudança de placar (debounce 800ms por jogo/confronto)
- [x] 🟢 Indicador "Salvo" / "Salvando..."

---

## ⚙️ SPRINT 7 — Painel Admin e Polimento (Estimativa: 2–3 dias)

### S7.1 — Painel Administrativo
- [x] 🟢 Rota protegida `/admin` com senha simples (login via `POST /api/admin/login`, chave guardada em `sessionStorage`, reenviada como `X-Admin-Key`)
- [x] 🟡 Lista de jogos com status e placar atuais
- [x] 🟡 Formulário para atualizar placar de jogo
- [x] 🟡 Alternar status via dropdown (Agendado / Em andamento / Encerrado)
- [x] 🟡 Atualização de elencos (adicionar/editar/remover jogadores) — novas rotas `POST`/`PUT`/`DELETE /api/admin/jogadores`

### S7.2 — Melhorias de UX
- [x] 🟢 Toasts de feedback nas ações do painel admin (salvar jogo, salvar/adicionar/remover jogador, erros); o restante do app já tinha padrão próprio de feedback inline (ex.: mensagem "Escalação salva!" na S5, "Salvo"/"Salvando..." no bolão na S6) — não convertido para toast para não regredir esses fluxos já testados
- [x] 🟢 Skeleton loaders nas listagens mais visíveis (Tabela de Jogos, Grupos, Elencos); Bolão e Escalação mantêm o spinner (`Loader`) que já tinham
- [x] 🟢 Tratamento de erro de rede: retry automático (2 tentativas, 500ms) só em GET — reexecutar POST/PUT/DELETE sozinho arriscaria duplicar efeitos colaterais
- [ ] 🟢 Modo escuro / claro — **decisão do usuário: não implementar**. O Claude.md define um sistema de design fixo e só escuro, sem paleta clara especificada; inventar uma paleta nova unilateralmente fugiria do que foi definido
- [x] 🟢 Animações de transição entre páginas (fade + leve deslocamento, respeitando `prefers-reduced-motion`)
- [x] 🟢 Scroll to top ao navegar

### S7.3 — SEO e Performance
- [x] 🟢 Meta tags: title e description dinâmicos por página (hook `useDocumentTitle`); `og:title`/`og:description` ficam estáticos no nível do app (`index.html`) — não implementados por página. Sem `og:image`: não há uma imagem de capa gerada/hospedada para o projeto
- [x] 🟢 Favicon temático Copa 2026 (bola de futebol em SVG, cores da marca)
- [x] 🟢 Lazy loading de imagens/bandeiras — **não aplicável**: bandeiras são emoji (texto), não `<img>`, decisão já tomada no Sprint 0
- [x] 🟢 Compressão de assets — o build de produção do Vite já minifica JS/CSS (ver `npm run build`); compressão HTTP (gzip/brotli) é responsabilidade do servidor em produção, fica para o Sprint 8 (Deploy)

---

## 🧪 SPRINT 8 — Testes e Deploy (Estimativa: 2 dias)

### S8.1 — Testes
- [ ] 🟢 Testar todos os 12 grupos com classificação manual
- [ ] 🟢 Testar simulação completa de bolão (grupos → final)
- [ ] 🟢 Testar escalação com todas as 7 formações
- [ ] 🟢 Testar em mobile (iOS Safari, Chrome Android)
- [ ] 🟢 Testar countdown nos últimos segundos

### S8.2 — Deploy
- [ ] 🟢 Build de produção do frontend
- [ ] 🟢 Configurar servidor (local ou VPS)
- [ ] 🟢 Backup automático do SQLite (script cron)
- [ ] 🟢 Variáveis de ambiente de produção
- [ ] 🟢 Documentação de deploy no README

---

## 📊 Backlog (Futuras Versões)

- [ ] Notificações push para início de jogos (PWA)
- [ ] Tabela histórica de Copas do Mundo anteriores
- [ ] Estatísticas de goleadores e artilheiros
- [ ] Integração com API de odds
- [ ] Sistema de comentários por jogo
- [ ] Login com Google para salvar bolão na nuvem
- [ ] Visualização do caminho de cada seleção até a final

---

## 🗓️ Cronograma Sugerido

| Sprint | Conteúdo | Duração | Início |
|--------|----------|---------|--------|
| 0 | Fundação + DB | 2 dias | Dia 1 |
| 1 | Landing Page | 3 dias | Dia 3 |
| 2 | Tabela de Jogos | 3 dias | Dia 6 |
| 3 | Grupos e Classificação | 3 dias | Dia 9 |
| 4 | Elencos | 3 dias | Dia 12 |
| 5 | Escalação Brasil | 4 dias | Dia 15 |
| 6 | Bolão + Chaveamento | 5 dias | Dia 19 |
| 7 | Admin + Polimento | 3 dias | Dia 24 |
| 8 | Testes + Deploy | 2 dias | Dia 27 |
| **Total** | | **~29 dias** | |

---

## 🔑 Dependências Críticas

```
S0.2 (Banco) → [S2.1, S3.1, S4.1, S5.1, S6.1]  ← BLOQUEADOR PRINCIPAL
S2.1 (API Jogos) → S1.3, S1.4, S2.2
S3.1 (API Grupos) → S3.2, S6.2
S4.1 (API Seleções) → S4.2, S5.4
S5.1 (API Escalação) → S5.6
S6.1 (API Bolão) → S6.2, S6.3, S6.4
```
