-- Migration 001: criação das tabelas principais
-- Ativar sempre em cada conexão
PRAGMA foreign_keys = ON;

-- Seleções
CREATE TABLE IF NOT EXISTS selecoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,                -- Nome em inglês (chave)
    nome_pt TEXT NOT NULL,             -- Nome em português
    codigo_iso TEXT NOT NULL,          -- BR, AR, FR...
    bandeira_emoji TEXT,               -- 🇧🇷
    confederacao TEXT NOT NULL,        -- CONMEBOL, UEFA, CAF, CONCACAF, AFC, OFC
    grupo TEXT NOT NULL,               -- A a L
    pote INTEGER NOT NULL,             -- 1 a 4
    eh_cabeca_chave INTEGER NOT NULL DEFAULT 0,
    eh_sede INTEGER NOT NULL DEFAULT 0,
    treinador TEXT,
    ranking_fifa INTEGER,
    criado_em TEXT DEFAULT (datetime('now'))
);

-- Jogadores
CREATE TABLE IF NOT EXISTS jogadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    selecao_id INTEGER NOT NULL REFERENCES selecoes(id) ON DELETE CASCADE,
    numero INTEGER,
    nome TEXT NOT NULL,
    nome_curto TEXT,
    posicao TEXT NOT NULL CHECK(posicao IN ('GK','DEF','MID','FWD')),
    clube TEXT,
    idade INTEGER,
    eh_capitao INTEGER NOT NULL DEFAULT 0,
    criado_em TEXT DEFAULT (datetime('now'))
);

-- Jogos
CREATE TABLE IF NOT EXISTS jogos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fase TEXT NOT NULL CHECK(fase IN (
        'grupo','oitavas','quartas','semi','terceiro','final'
    )),
    grupo TEXT,                         -- Nulo nas fases eliminatórias
    rodada INTEGER,                     -- 1, 2 ou 3 na fase de grupos
    selecao_a_id INTEGER REFERENCES selecoes(id),
    selecao_b_id INTEGER REFERENCES selecoes(id),
    data_hora_utc TEXT NOT NULL,        -- ISO 8601 UTC
    estadio TEXT,
    cidade TEXT,
    pais_sede TEXT,
    gols_a INTEGER,
    gols_b INTEGER,
    penaltis_a INTEGER,
    penaltis_b INTEGER,
    status TEXT NOT NULL DEFAULT 'agendado'
        CHECK(status IN ('agendado','em_andamento','encerrado')),
    criado_em TEXT DEFAULT (datetime('now'))
);

-- Índices de performance
CREATE INDEX IF NOT EXISTS idx_jogos_fase ON jogos(fase);
CREATE INDEX IF NOT EXISTS idx_jogos_grupo ON jogos(grupo);
CREATE INDEX IF NOT EXISTS idx_jogos_data ON jogos(data_hora_utc);
CREATE INDEX IF NOT EXISTS idx_jogos_status ON jogos(status);
CREATE INDEX IF NOT EXISTS idx_jogadores_selecao ON jogadores(selecao_id);

-- Bolões
CREATE TABLE IF NOT EXISTS boloes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL DEFAULT 'Meu Bolão',
    session_id TEXT NOT NULL,
    criado_em TEXT DEFAULT (datetime('now')),
    atualizado_em TEXT DEFAULT (datetime('now'))
);

-- Palpites
CREATE TABLE IF NOT EXISTS palpites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bolao_id INTEGER NOT NULL REFERENCES boloes(id) ON DELETE CASCADE,
    jogo_id INTEGER NOT NULL REFERENCES jogos(id),
    gols_a INTEGER NOT NULL DEFAULT 0,
    gols_b INTEGER NOT NULL DEFAULT 0,
    penaltis_a INTEGER,
    penaltis_b INTEGER,
    UNIQUE(bolao_id, jogo_id)
);

-- Escalações salvas (somente Brasil)
CREATE TABLE IF NOT EXISTS escalacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL DEFAULT 'Minha Escalação',
    formacao TEXT NOT NULL DEFAULT '4-3-3',
    titulares_json TEXT NOT NULL,       -- Array de {slot, jogador_id}
    reservas_json TEXT,                 -- Array de jogador_ids
    session_id TEXT,
    criado_em TEXT DEFAULT (datetime('now'))
);
