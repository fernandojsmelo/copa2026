-- Migration 002: permite palpites de mata-mata sem um jogo real associado.
--
-- Contexto: os confrontos do mata-mata (oitavas em diante) do simulador de bolão
-- são hipotéticos — dependem de quem cada usuário simulou como classificado na
-- fase de grupos, então dois bolões diferentes podem ter "o vencedor do Grupo A"
-- distinto. Não é possível referenciar uma linha `jogos` real e compartilhada
-- para esses confrontos (ela precisaria ser diferente por bolão). Por isso,
-- `jogo_id` passa a aceitar NULL, e uma nova coluna `chave_slot` identifica o
-- confronto virtual (ex: 'oitavas-1', 'quartas-3', 'semi1-2', 'semi2-1',
-- 'terceiro', 'final') quando não há jogo real por trás do palpite.
--
-- SQLite não suporta ALTER COLUMN para remover NOT NULL, então a tabela é
-- recriada — não há dados de produção a perder (funcionalidade ainda não
-- lançada).

PRAGMA foreign_keys = OFF;

CREATE TABLE palpites_novo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bolao_id INTEGER NOT NULL REFERENCES boloes(id) ON DELETE CASCADE,
    jogo_id INTEGER REFERENCES jogos(id),       -- NULL para confrontos de mata-mata simulados
    chave_slot TEXT,                             -- identifica o confronto quando jogo_id é NULL
    gols_a INTEGER NOT NULL DEFAULT 0,
    gols_b INTEGER NOT NULL DEFAULT 0,
    penaltis_a INTEGER,
    penaltis_b INTEGER,
    prorrogacao INTEGER NOT NULL DEFAULT 0,
    UNIQUE(bolao_id, jogo_id),
    UNIQUE(bolao_id, chave_slot)
);

INSERT INTO palpites_novo (id, bolao_id, jogo_id, gols_a, gols_b, penaltis_a, penaltis_b)
SELECT id, bolao_id, jogo_id, gols_a, gols_b, penaltis_a, penaltis_b FROM palpites;

DROP TABLE palpites;
ALTER TABLE palpites_novo RENAME TO palpites;

PRAGMA foreign_keys = ON;
