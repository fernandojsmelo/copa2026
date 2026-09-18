-- Seed 04: elencos simplificados das demais 47 seleções (exceto Brasil e vagas 'A Definir')
-- Jogadores são placeholders genéricos ('Jogador N (COD)') até que elencos oficiais sejam
-- divulgados pelas federações — evita atribuir nomes de atletas reais sem fonte confirmada.
-- Mesmo template posicional do elenco do Brasil (3 GK / 7 DEF / 6 MID / 7 FWD) para manter
-- os 23 jogadores por seleção exigidos pelo RF-04 do PRD.md.
-- Um INSERT (com sua própria CTE) por seleção — SQLite aqui não aceita alias de colunas
-- nomeadas em subquery (AS v(col1,col2)), só via CTE (WITH v(col1,col2) AS (...)).

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (MX)', 'MX-1', 'GK', NULL),
    (12, 'Jogador 12 (MX)', 'MX-12', 'GK', NULL),
    (23, 'Jogador 23 (MX)', 'MX-23', 'GK', NULL),
    (2, 'Jogador 2 (MX)', 'MX-2', 'DEF', NULL),
    (3, 'Jogador 3 (MX)', 'MX-3', 'DEF', NULL),
    (4, 'Jogador 4 (MX)', 'MX-4', 'DEF', NULL),
    (5, 'Jogador 5 (MX)', 'MX-5', 'DEF', NULL),
    (6, 'Jogador 6 (MX)', 'MX-6', 'DEF', NULL),
    (13, 'Jogador 13 (MX)', 'MX-13', 'DEF', NULL),
    (22, 'Jogador 22 (MX)', 'MX-22', 'DEF', NULL),
    (8, 'Jogador 8 (MX)', 'MX-8', 'MID', NULL),
    (10, 'Jogador 10 (MX)', 'MX-10', 'MID', NULL),
    (15, 'Jogador 15 (MX)', 'MX-15', 'MID', NULL),
    (16, 'Jogador 16 (MX)', 'MX-16', 'MID', NULL),
    (17, 'Jogador 17 (MX)', 'MX-17', 'MID', NULL),
    (19, 'Jogador 19 (MX)', 'MX-19', 'MID', NULL),
    (7, 'Jogador 7 (MX)', 'MX-7', 'FWD', NULL),
    (9, 'Jogador 9 (MX)', 'MX-9', 'FWD', NULL),
    (11, 'Jogador 11 (MX)', 'MX-11', 'FWD', NULL),
    (14, 'Jogador 14 (MX)', 'MX-14', 'FWD', NULL),
    (18, 'Jogador 18 (MX)', 'MX-18', 'FWD', NULL),
    (20, 'Jogador 20 (MX)', 'MX-20', 'FWD', NULL),
    (21, 'Jogador 21 (MX)', 'MX-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'México';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (KR)', 'KR-1', 'GK', NULL),
    (12, 'Jogador 12 (KR)', 'KR-12', 'GK', NULL),
    (23, 'Jogador 23 (KR)', 'KR-23', 'GK', NULL),
    (2, 'Jogador 2 (KR)', 'KR-2', 'DEF', NULL),
    (3, 'Jogador 3 (KR)', 'KR-3', 'DEF', NULL),
    (4, 'Jogador 4 (KR)', 'KR-4', 'DEF', NULL),
    (5, 'Jogador 5 (KR)', 'KR-5', 'DEF', NULL),
    (6, 'Jogador 6 (KR)', 'KR-6', 'DEF', NULL),
    (13, 'Jogador 13 (KR)', 'KR-13', 'DEF', NULL),
    (22, 'Jogador 22 (KR)', 'KR-22', 'DEF', NULL),
    (8, 'Jogador 8 (KR)', 'KR-8', 'MID', NULL),
    (10, 'Jogador 10 (KR)', 'KR-10', 'MID', NULL),
    (15, 'Jogador 15 (KR)', 'KR-15', 'MID', NULL),
    (16, 'Jogador 16 (KR)', 'KR-16', 'MID', NULL),
    (17, 'Jogador 17 (KR)', 'KR-17', 'MID', NULL),
    (19, 'Jogador 19 (KR)', 'KR-19', 'MID', NULL),
    (7, 'Jogador 7 (KR)', 'KR-7', 'FWD', NULL),
    (9, 'Jogador 9 (KR)', 'KR-9', 'FWD', NULL),
    (11, 'Jogador 11 (KR)', 'KR-11', 'FWD', NULL),
    (14, 'Jogador 14 (KR)', 'KR-14', 'FWD', NULL),
    (18, 'Jogador 18 (KR)', 'KR-18', 'FWD', NULL),
    (20, 'Jogador 20 (KR)', 'KR-20', 'FWD', NULL),
    (21, 'Jogador 21 (KR)', 'KR-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Coreia do Sul';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (CZ)', 'CZ-1', 'GK', NULL),
    (12, 'Jogador 12 (CZ)', 'CZ-12', 'GK', NULL),
    (23, 'Jogador 23 (CZ)', 'CZ-23', 'GK', NULL),
    (2, 'Jogador 2 (CZ)', 'CZ-2', 'DEF', NULL),
    (3, 'Jogador 3 (CZ)', 'CZ-3', 'DEF', NULL),
    (4, 'Jogador 4 (CZ)', 'CZ-4', 'DEF', NULL),
    (5, 'Jogador 5 (CZ)', 'CZ-5', 'DEF', NULL),
    (6, 'Jogador 6 (CZ)', 'CZ-6', 'DEF', NULL),
    (13, 'Jogador 13 (CZ)', 'CZ-13', 'DEF', NULL),
    (22, 'Jogador 22 (CZ)', 'CZ-22', 'DEF', NULL),
    (8, 'Jogador 8 (CZ)', 'CZ-8', 'MID', NULL),
    (10, 'Jogador 10 (CZ)', 'CZ-10', 'MID', NULL),
    (15, 'Jogador 15 (CZ)', 'CZ-15', 'MID', NULL),
    (16, 'Jogador 16 (CZ)', 'CZ-16', 'MID', NULL),
    (17, 'Jogador 17 (CZ)', 'CZ-17', 'MID', NULL),
    (19, 'Jogador 19 (CZ)', 'CZ-19', 'MID', NULL),
    (7, 'Jogador 7 (CZ)', 'CZ-7', 'FWD', NULL),
    (9, 'Jogador 9 (CZ)', 'CZ-9', 'FWD', NULL),
    (11, 'Jogador 11 (CZ)', 'CZ-11', 'FWD', NULL),
    (14, 'Jogador 14 (CZ)', 'CZ-14', 'FWD', NULL),
    (18, 'Jogador 18 (CZ)', 'CZ-18', 'FWD', NULL),
    (20, 'Jogador 20 (CZ)', 'CZ-20', 'FWD', NULL),
    (21, 'Jogador 21 (CZ)', 'CZ-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'República Tcheca';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (ZA)', 'ZA-1', 'GK', NULL),
    (12, 'Jogador 12 (ZA)', 'ZA-12', 'GK', NULL),
    (23, 'Jogador 23 (ZA)', 'ZA-23', 'GK', NULL),
    (2, 'Jogador 2 (ZA)', 'ZA-2', 'DEF', NULL),
    (3, 'Jogador 3 (ZA)', 'ZA-3', 'DEF', NULL),
    (4, 'Jogador 4 (ZA)', 'ZA-4', 'DEF', NULL),
    (5, 'Jogador 5 (ZA)', 'ZA-5', 'DEF', NULL),
    (6, 'Jogador 6 (ZA)', 'ZA-6', 'DEF', NULL),
    (13, 'Jogador 13 (ZA)', 'ZA-13', 'DEF', NULL),
    (22, 'Jogador 22 (ZA)', 'ZA-22', 'DEF', NULL),
    (8, 'Jogador 8 (ZA)', 'ZA-8', 'MID', NULL),
    (10, 'Jogador 10 (ZA)', 'ZA-10', 'MID', NULL),
    (15, 'Jogador 15 (ZA)', 'ZA-15', 'MID', NULL),
    (16, 'Jogador 16 (ZA)', 'ZA-16', 'MID', NULL),
    (17, 'Jogador 17 (ZA)', 'ZA-17', 'MID', NULL),
    (19, 'Jogador 19 (ZA)', 'ZA-19', 'MID', NULL),
    (7, 'Jogador 7 (ZA)', 'ZA-7', 'FWD', NULL),
    (9, 'Jogador 9 (ZA)', 'ZA-9', 'FWD', NULL),
    (11, 'Jogador 11 (ZA)', 'ZA-11', 'FWD', NULL),
    (14, 'Jogador 14 (ZA)', 'ZA-14', 'FWD', NULL),
    (18, 'Jogador 18 (ZA)', 'ZA-18', 'FWD', NULL),
    (20, 'Jogador 20 (ZA)', 'ZA-20', 'FWD', NULL),
    (21, 'Jogador 21 (ZA)', 'ZA-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'África do Sul';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (CA)', 'CA-1', 'GK', NULL),
    (12, 'Jogador 12 (CA)', 'CA-12', 'GK', NULL),
    (23, 'Jogador 23 (CA)', 'CA-23', 'GK', NULL),
    (2, 'Jogador 2 (CA)', 'CA-2', 'DEF', NULL),
    (3, 'Jogador 3 (CA)', 'CA-3', 'DEF', NULL),
    (4, 'Jogador 4 (CA)', 'CA-4', 'DEF', NULL),
    (5, 'Jogador 5 (CA)', 'CA-5', 'DEF', NULL),
    (6, 'Jogador 6 (CA)', 'CA-6', 'DEF', NULL),
    (13, 'Jogador 13 (CA)', 'CA-13', 'DEF', NULL),
    (22, 'Jogador 22 (CA)', 'CA-22', 'DEF', NULL),
    (8, 'Jogador 8 (CA)', 'CA-8', 'MID', NULL),
    (10, 'Jogador 10 (CA)', 'CA-10', 'MID', NULL),
    (15, 'Jogador 15 (CA)', 'CA-15', 'MID', NULL),
    (16, 'Jogador 16 (CA)', 'CA-16', 'MID', NULL),
    (17, 'Jogador 17 (CA)', 'CA-17', 'MID', NULL),
    (19, 'Jogador 19 (CA)', 'CA-19', 'MID', NULL),
    (7, 'Jogador 7 (CA)', 'CA-7', 'FWD', NULL),
    (9, 'Jogador 9 (CA)', 'CA-9', 'FWD', NULL),
    (11, 'Jogador 11 (CA)', 'CA-11', 'FWD', NULL),
    (14, 'Jogador 14 (CA)', 'CA-14', 'FWD', NULL),
    (18, 'Jogador 18 (CA)', 'CA-18', 'FWD', NULL),
    (20, 'Jogador 20 (CA)', 'CA-20', 'FWD', NULL),
    (21, 'Jogador 21 (CA)', 'CA-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Canadá';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (BA)', 'BA-1', 'GK', NULL),
    (12, 'Jogador 12 (BA)', 'BA-12', 'GK', NULL),
    (23, 'Jogador 23 (BA)', 'BA-23', 'GK', NULL),
    (2, 'Jogador 2 (BA)', 'BA-2', 'DEF', NULL),
    (3, 'Jogador 3 (BA)', 'BA-3', 'DEF', NULL),
    (4, 'Jogador 4 (BA)', 'BA-4', 'DEF', NULL),
    (5, 'Jogador 5 (BA)', 'BA-5', 'DEF', NULL),
    (6, 'Jogador 6 (BA)', 'BA-6', 'DEF', NULL),
    (13, 'Jogador 13 (BA)', 'BA-13', 'DEF', NULL),
    (22, 'Jogador 22 (BA)', 'BA-22', 'DEF', NULL),
    (8, 'Jogador 8 (BA)', 'BA-8', 'MID', NULL),
    (10, 'Jogador 10 (BA)', 'BA-10', 'MID', NULL),
    (15, 'Jogador 15 (BA)', 'BA-15', 'MID', NULL),
    (16, 'Jogador 16 (BA)', 'BA-16', 'MID', NULL),
    (17, 'Jogador 17 (BA)', 'BA-17', 'MID', NULL),
    (19, 'Jogador 19 (BA)', 'BA-19', 'MID', NULL),
    (7, 'Jogador 7 (BA)', 'BA-7', 'FWD', NULL),
    (9, 'Jogador 9 (BA)', 'BA-9', 'FWD', NULL),
    (11, 'Jogador 11 (BA)', 'BA-11', 'FWD', NULL),
    (14, 'Jogador 14 (BA)', 'BA-14', 'FWD', NULL),
    (18, 'Jogador 18 (BA)', 'BA-18', 'FWD', NULL),
    (20, 'Jogador 20 (BA)', 'BA-20', 'FWD', NULL),
    (21, 'Jogador 21 (BA)', 'BA-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Bósnia e Herzegovina';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (QA)', 'QA-1', 'GK', NULL),
    (12, 'Jogador 12 (QA)', 'QA-12', 'GK', NULL),
    (23, 'Jogador 23 (QA)', 'QA-23', 'GK', NULL),
    (2, 'Jogador 2 (QA)', 'QA-2', 'DEF', NULL),
    (3, 'Jogador 3 (QA)', 'QA-3', 'DEF', NULL),
    (4, 'Jogador 4 (QA)', 'QA-4', 'DEF', NULL),
    (5, 'Jogador 5 (QA)', 'QA-5', 'DEF', NULL),
    (6, 'Jogador 6 (QA)', 'QA-6', 'DEF', NULL),
    (13, 'Jogador 13 (QA)', 'QA-13', 'DEF', NULL),
    (22, 'Jogador 22 (QA)', 'QA-22', 'DEF', NULL),
    (8, 'Jogador 8 (QA)', 'QA-8', 'MID', NULL),
    (10, 'Jogador 10 (QA)', 'QA-10', 'MID', NULL),
    (15, 'Jogador 15 (QA)', 'QA-15', 'MID', NULL),
    (16, 'Jogador 16 (QA)', 'QA-16', 'MID', NULL),
    (17, 'Jogador 17 (QA)', 'QA-17', 'MID', NULL),
    (19, 'Jogador 19 (QA)', 'QA-19', 'MID', NULL),
    (7, 'Jogador 7 (QA)', 'QA-7', 'FWD', NULL),
    (9, 'Jogador 9 (QA)', 'QA-9', 'FWD', NULL),
    (11, 'Jogador 11 (QA)', 'QA-11', 'FWD', NULL),
    (14, 'Jogador 14 (QA)', 'QA-14', 'FWD', NULL),
    (18, 'Jogador 18 (QA)', 'QA-18', 'FWD', NULL),
    (20, 'Jogador 20 (QA)', 'QA-20', 'FWD', NULL),
    (21, 'Jogador 21 (QA)', 'QA-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Catar';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (CH)', 'CH-1', 'GK', NULL),
    (12, 'Jogador 12 (CH)', 'CH-12', 'GK', NULL),
    (23, 'Jogador 23 (CH)', 'CH-23', 'GK', NULL),
    (2, 'Jogador 2 (CH)', 'CH-2', 'DEF', NULL),
    (3, 'Jogador 3 (CH)', 'CH-3', 'DEF', NULL),
    (4, 'Jogador 4 (CH)', 'CH-4', 'DEF', NULL),
    (5, 'Jogador 5 (CH)', 'CH-5', 'DEF', NULL),
    (6, 'Jogador 6 (CH)', 'CH-6', 'DEF', NULL),
    (13, 'Jogador 13 (CH)', 'CH-13', 'DEF', NULL),
    (22, 'Jogador 22 (CH)', 'CH-22', 'DEF', NULL),
    (8, 'Jogador 8 (CH)', 'CH-8', 'MID', NULL),
    (10, 'Jogador 10 (CH)', 'CH-10', 'MID', NULL),
    (15, 'Jogador 15 (CH)', 'CH-15', 'MID', NULL),
    (16, 'Jogador 16 (CH)', 'CH-16', 'MID', NULL),
    (17, 'Jogador 17 (CH)', 'CH-17', 'MID', NULL),
    (19, 'Jogador 19 (CH)', 'CH-19', 'MID', NULL),
    (7, 'Jogador 7 (CH)', 'CH-7', 'FWD', NULL),
    (9, 'Jogador 9 (CH)', 'CH-9', 'FWD', NULL),
    (11, 'Jogador 11 (CH)', 'CH-11', 'FWD', NULL),
    (14, 'Jogador 14 (CH)', 'CH-14', 'FWD', NULL),
    (18, 'Jogador 18 (CH)', 'CH-18', 'FWD', NULL),
    (20, 'Jogador 20 (CH)', 'CH-20', 'FWD', NULL),
    (21, 'Jogador 21 (CH)', 'CH-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Suíça';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (AR)', 'AR-1', 'GK', NULL),
    (12, 'Jogador 12 (AR)', 'AR-12', 'GK', NULL),
    (23, 'Jogador 23 (AR)', 'AR-23', 'GK', NULL),
    (2, 'Jogador 2 (AR)', 'AR-2', 'DEF', NULL),
    (3, 'Jogador 3 (AR)', 'AR-3', 'DEF', NULL),
    (4, 'Jogador 4 (AR)', 'AR-4', 'DEF', NULL),
    (5, 'Jogador 5 (AR)', 'AR-5', 'DEF', NULL),
    (6, 'Jogador 6 (AR)', 'AR-6', 'DEF', NULL),
    (13, 'Jogador 13 (AR)', 'AR-13', 'DEF', NULL),
    (22, 'Jogador 22 (AR)', 'AR-22', 'DEF', NULL),
    (8, 'Jogador 8 (AR)', 'AR-8', 'MID', NULL),
    (10, 'Jogador 10 (AR)', 'AR-10', 'MID', NULL),
    (15, 'Jogador 15 (AR)', 'AR-15', 'MID', NULL),
    (16, 'Jogador 16 (AR)', 'AR-16', 'MID', NULL),
    (17, 'Jogador 17 (AR)', 'AR-17', 'MID', NULL),
    (19, 'Jogador 19 (AR)', 'AR-19', 'MID', NULL),
    (7, 'Jogador 7 (AR)', 'AR-7', 'FWD', NULL),
    (9, 'Jogador 9 (AR)', 'AR-9', 'FWD', NULL),
    (11, 'Jogador 11 (AR)', 'AR-11', 'FWD', NULL),
    (14, 'Jogador 14 (AR)', 'AR-14', 'FWD', NULL),
    (18, 'Jogador 18 (AR)', 'AR-18', 'FWD', NULL),
    (20, 'Jogador 20 (AR)', 'AR-20', 'FWD', NULL),
    (21, 'Jogador 21 (AR)', 'AR-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Argentina';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (HR)', 'HR-1', 'GK', NULL),
    (12, 'Jogador 12 (HR)', 'HR-12', 'GK', NULL),
    (23, 'Jogador 23 (HR)', 'HR-23', 'GK', NULL),
    (2, 'Jogador 2 (HR)', 'HR-2', 'DEF', NULL),
    (3, 'Jogador 3 (HR)', 'HR-3', 'DEF', NULL),
    (4, 'Jogador 4 (HR)', 'HR-4', 'DEF', NULL),
    (5, 'Jogador 5 (HR)', 'HR-5', 'DEF', NULL),
    (6, 'Jogador 6 (HR)', 'HR-6', 'DEF', NULL),
    (13, 'Jogador 13 (HR)', 'HR-13', 'DEF', NULL),
    (22, 'Jogador 22 (HR)', 'HR-22', 'DEF', NULL),
    (8, 'Jogador 8 (HR)', 'HR-8', 'MID', NULL),
    (10, 'Jogador 10 (HR)', 'HR-10', 'MID', NULL),
    (15, 'Jogador 15 (HR)', 'HR-15', 'MID', NULL),
    (16, 'Jogador 16 (HR)', 'HR-16', 'MID', NULL),
    (17, 'Jogador 17 (HR)', 'HR-17', 'MID', NULL),
    (19, 'Jogador 19 (HR)', 'HR-19', 'MID', NULL),
    (7, 'Jogador 7 (HR)', 'HR-7', 'FWD', NULL),
    (9, 'Jogador 9 (HR)', 'HR-9', 'FWD', NULL),
    (11, 'Jogador 11 (HR)', 'HR-11', 'FWD', NULL),
    (14, 'Jogador 14 (HR)', 'HR-14', 'FWD', NULL),
    (18, 'Jogador 18 (HR)', 'HR-18', 'FWD', NULL),
    (20, 'Jogador 20 (HR)', 'HR-20', 'FWD', NULL),
    (21, 'Jogador 21 (HR)', 'HR-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Croácia';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (MA)', 'MA-1', 'GK', NULL),
    (12, 'Jogador 12 (MA)', 'MA-12', 'GK', NULL),
    (23, 'Jogador 23 (MA)', 'MA-23', 'GK', NULL),
    (2, 'Jogador 2 (MA)', 'MA-2', 'DEF', NULL),
    (3, 'Jogador 3 (MA)', 'MA-3', 'DEF', NULL),
    (4, 'Jogador 4 (MA)', 'MA-4', 'DEF', NULL),
    (5, 'Jogador 5 (MA)', 'MA-5', 'DEF', NULL),
    (6, 'Jogador 6 (MA)', 'MA-6', 'DEF', NULL),
    (13, 'Jogador 13 (MA)', 'MA-13', 'DEF', NULL),
    (22, 'Jogador 22 (MA)', 'MA-22', 'DEF', NULL),
    (8, 'Jogador 8 (MA)', 'MA-8', 'MID', NULL),
    (10, 'Jogador 10 (MA)', 'MA-10', 'MID', NULL),
    (15, 'Jogador 15 (MA)', 'MA-15', 'MID', NULL),
    (16, 'Jogador 16 (MA)', 'MA-16', 'MID', NULL),
    (17, 'Jogador 17 (MA)', 'MA-17', 'MID', NULL),
    (19, 'Jogador 19 (MA)', 'MA-19', 'MID', NULL),
    (7, 'Jogador 7 (MA)', 'MA-7', 'FWD', NULL),
    (9, 'Jogador 9 (MA)', 'MA-9', 'FWD', NULL),
    (11, 'Jogador 11 (MA)', 'MA-11', 'FWD', NULL),
    (14, 'Jogador 14 (MA)', 'MA-14', 'FWD', NULL),
    (18, 'Jogador 18 (MA)', 'MA-18', 'FWD', NULL),
    (20, 'Jogador 20 (MA)', 'MA-20', 'FWD', NULL),
    (21, 'Jogador 21 (MA)', 'MA-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Marrocos';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (EC)', 'EC-1', 'GK', NULL),
    (12, 'Jogador 12 (EC)', 'EC-12', 'GK', NULL),
    (23, 'Jogador 23 (EC)', 'EC-23', 'GK', NULL),
    (2, 'Jogador 2 (EC)', 'EC-2', 'DEF', NULL),
    (3, 'Jogador 3 (EC)', 'EC-3', 'DEF', NULL),
    (4, 'Jogador 4 (EC)', 'EC-4', 'DEF', NULL),
    (5, 'Jogador 5 (EC)', 'EC-5', 'DEF', NULL),
    (6, 'Jogador 6 (EC)', 'EC-6', 'DEF', NULL),
    (13, 'Jogador 13 (EC)', 'EC-13', 'DEF', NULL),
    (22, 'Jogador 22 (EC)', 'EC-22', 'DEF', NULL),
    (8, 'Jogador 8 (EC)', 'EC-8', 'MID', NULL),
    (10, 'Jogador 10 (EC)', 'EC-10', 'MID', NULL),
    (15, 'Jogador 15 (EC)', 'EC-15', 'MID', NULL),
    (16, 'Jogador 16 (EC)', 'EC-16', 'MID', NULL),
    (17, 'Jogador 17 (EC)', 'EC-17', 'MID', NULL),
    (19, 'Jogador 19 (EC)', 'EC-19', 'MID', NULL),
    (7, 'Jogador 7 (EC)', 'EC-7', 'FWD', NULL),
    (9, 'Jogador 9 (EC)', 'EC-9', 'FWD', NULL),
    (11, 'Jogador 11 (EC)', 'EC-11', 'FWD', NULL),
    (14, 'Jogador 14 (EC)', 'EC-14', 'FWD', NULL),
    (18, 'Jogador 18 (EC)', 'EC-18', 'FWD', NULL),
    (20, 'Jogador 20 (EC)', 'EC-20', 'FWD', NULL),
    (21, 'Jogador 21 (EC)', 'EC-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Equador';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (US)', 'US-1', 'GK', NULL),
    (12, 'Jogador 12 (US)', 'US-12', 'GK', NULL),
    (23, 'Jogador 23 (US)', 'US-23', 'GK', NULL),
    (2, 'Jogador 2 (US)', 'US-2', 'DEF', NULL),
    (3, 'Jogador 3 (US)', 'US-3', 'DEF', NULL),
    (4, 'Jogador 4 (US)', 'US-4', 'DEF', NULL),
    (5, 'Jogador 5 (US)', 'US-5', 'DEF', NULL),
    (6, 'Jogador 6 (US)', 'US-6', 'DEF', NULL),
    (13, 'Jogador 13 (US)', 'US-13', 'DEF', NULL),
    (22, 'Jogador 22 (US)', 'US-22', 'DEF', NULL),
    (8, 'Jogador 8 (US)', 'US-8', 'MID', NULL),
    (10, 'Jogador 10 (US)', 'US-10', 'MID', NULL),
    (15, 'Jogador 15 (US)', 'US-15', 'MID', NULL),
    (16, 'Jogador 16 (US)', 'US-16', 'MID', NULL),
    (17, 'Jogador 17 (US)', 'US-17', 'MID', NULL),
    (19, 'Jogador 19 (US)', 'US-19', 'MID', NULL),
    (7, 'Jogador 7 (US)', 'US-7', 'FWD', NULL),
    (9, 'Jogador 9 (US)', 'US-9', 'FWD', NULL),
    (11, 'Jogador 11 (US)', 'US-11', 'FWD', NULL),
    (14, 'Jogador 14 (US)', 'US-14', 'FWD', NULL),
    (18, 'Jogador 18 (US)', 'US-18', 'FWD', NULL),
    (20, 'Jogador 20 (US)', 'US-20', 'FWD', NULL),
    (21, 'Jogador 21 (US)', 'US-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Estados Unidos';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (AU)', 'AU-1', 'GK', NULL),
    (12, 'Jogador 12 (AU)', 'AU-12', 'GK', NULL),
    (23, 'Jogador 23 (AU)', 'AU-23', 'GK', NULL),
    (2, 'Jogador 2 (AU)', 'AU-2', 'DEF', NULL),
    (3, 'Jogador 3 (AU)', 'AU-3', 'DEF', NULL),
    (4, 'Jogador 4 (AU)', 'AU-4', 'DEF', NULL),
    (5, 'Jogador 5 (AU)', 'AU-5', 'DEF', NULL),
    (6, 'Jogador 6 (AU)', 'AU-6', 'DEF', NULL),
    (13, 'Jogador 13 (AU)', 'AU-13', 'DEF', NULL),
    (22, 'Jogador 22 (AU)', 'AU-22', 'DEF', NULL),
    (8, 'Jogador 8 (AU)', 'AU-8', 'MID', NULL),
    (10, 'Jogador 10 (AU)', 'AU-10', 'MID', NULL),
    (15, 'Jogador 15 (AU)', 'AU-15', 'MID', NULL),
    (16, 'Jogador 16 (AU)', 'AU-16', 'MID', NULL),
    (17, 'Jogador 17 (AU)', 'AU-17', 'MID', NULL),
    (19, 'Jogador 19 (AU)', 'AU-19', 'MID', NULL),
    (7, 'Jogador 7 (AU)', 'AU-7', 'FWD', NULL),
    (9, 'Jogador 9 (AU)', 'AU-9', 'FWD', NULL),
    (11, 'Jogador 11 (AU)', 'AU-11', 'FWD', NULL),
    (14, 'Jogador 14 (AU)', 'AU-14', 'FWD', NULL),
    (18, 'Jogador 18 (AU)', 'AU-18', 'FWD', NULL),
    (20, 'Jogador 20 (AU)', 'AU-20', 'FWD', NULL),
    (21, 'Jogador 21 (AU)', 'AU-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Austrália';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (PY)', 'PY-1', 'GK', NULL),
    (12, 'Jogador 12 (PY)', 'PY-12', 'GK', NULL),
    (23, 'Jogador 23 (PY)', 'PY-23', 'GK', NULL),
    (2, 'Jogador 2 (PY)', 'PY-2', 'DEF', NULL),
    (3, 'Jogador 3 (PY)', 'PY-3', 'DEF', NULL),
    (4, 'Jogador 4 (PY)', 'PY-4', 'DEF', NULL),
    (5, 'Jogador 5 (PY)', 'PY-5', 'DEF', NULL),
    (6, 'Jogador 6 (PY)', 'PY-6', 'DEF', NULL),
    (13, 'Jogador 13 (PY)', 'PY-13', 'DEF', NULL),
    (22, 'Jogador 22 (PY)', 'PY-22', 'DEF', NULL),
    (8, 'Jogador 8 (PY)', 'PY-8', 'MID', NULL),
    (10, 'Jogador 10 (PY)', 'PY-10', 'MID', NULL),
    (15, 'Jogador 15 (PY)', 'PY-15', 'MID', NULL),
    (16, 'Jogador 16 (PY)', 'PY-16', 'MID', NULL),
    (17, 'Jogador 17 (PY)', 'PY-17', 'MID', NULL),
    (19, 'Jogador 19 (PY)', 'PY-19', 'MID', NULL),
    (7, 'Jogador 7 (PY)', 'PY-7', 'FWD', NULL),
    (9, 'Jogador 9 (PY)', 'PY-9', 'FWD', NULL),
    (11, 'Jogador 11 (PY)', 'PY-11', 'FWD', NULL),
    (14, 'Jogador 14 (PY)', 'PY-14', 'FWD', NULL),
    (18, 'Jogador 18 (PY)', 'PY-18', 'FWD', NULL),
    (20, 'Jogador 20 (PY)', 'PY-20', 'FWD', NULL),
    (21, 'Jogador 21 (PY)', 'PY-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Paraguai';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (TR)', 'TR-1', 'GK', NULL),
    (12, 'Jogador 12 (TR)', 'TR-12', 'GK', NULL),
    (23, 'Jogador 23 (TR)', 'TR-23', 'GK', NULL),
    (2, 'Jogador 2 (TR)', 'TR-2', 'DEF', NULL),
    (3, 'Jogador 3 (TR)', 'TR-3', 'DEF', NULL),
    (4, 'Jogador 4 (TR)', 'TR-4', 'DEF', NULL),
    (5, 'Jogador 5 (TR)', 'TR-5', 'DEF', NULL),
    (6, 'Jogador 6 (TR)', 'TR-6', 'DEF', NULL),
    (13, 'Jogador 13 (TR)', 'TR-13', 'DEF', NULL),
    (22, 'Jogador 22 (TR)', 'TR-22', 'DEF', NULL),
    (8, 'Jogador 8 (TR)', 'TR-8', 'MID', NULL),
    (10, 'Jogador 10 (TR)', 'TR-10', 'MID', NULL),
    (15, 'Jogador 15 (TR)', 'TR-15', 'MID', NULL),
    (16, 'Jogador 16 (TR)', 'TR-16', 'MID', NULL),
    (17, 'Jogador 17 (TR)', 'TR-17', 'MID', NULL),
    (19, 'Jogador 19 (TR)', 'TR-19', 'MID', NULL),
    (7, 'Jogador 7 (TR)', 'TR-7', 'FWD', NULL),
    (9, 'Jogador 9 (TR)', 'TR-9', 'FWD', NULL),
    (11, 'Jogador 11 (TR)', 'TR-11', 'FWD', NULL),
    (14, 'Jogador 14 (TR)', 'TR-14', 'FWD', NULL),
    (18, 'Jogador 18 (TR)', 'TR-18', 'FWD', NULL),
    (20, 'Jogador 20 (TR)', 'TR-20', 'FWD', NULL),
    (21, 'Jogador 21 (TR)', 'TR-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Turquia';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (DE)', 'DE-1', 'GK', NULL),
    (12, 'Jogador 12 (DE)', 'DE-12', 'GK', NULL),
    (23, 'Jogador 23 (DE)', 'DE-23', 'GK', NULL),
    (2, 'Jogador 2 (DE)', 'DE-2', 'DEF', NULL),
    (3, 'Jogador 3 (DE)', 'DE-3', 'DEF', NULL),
    (4, 'Jogador 4 (DE)', 'DE-4', 'DEF', NULL),
    (5, 'Jogador 5 (DE)', 'DE-5', 'DEF', NULL),
    (6, 'Jogador 6 (DE)', 'DE-6', 'DEF', NULL),
    (13, 'Jogador 13 (DE)', 'DE-13', 'DEF', NULL),
    (22, 'Jogador 22 (DE)', 'DE-22', 'DEF', NULL),
    (8, 'Jogador 8 (DE)', 'DE-8', 'MID', NULL),
    (10, 'Jogador 10 (DE)', 'DE-10', 'MID', NULL),
    (15, 'Jogador 15 (DE)', 'DE-15', 'MID', NULL),
    (16, 'Jogador 16 (DE)', 'DE-16', 'MID', NULL),
    (17, 'Jogador 17 (DE)', 'DE-17', 'MID', NULL),
    (19, 'Jogador 19 (DE)', 'DE-19', 'MID', NULL),
    (7, 'Jogador 7 (DE)', 'DE-7', 'FWD', NULL),
    (9, 'Jogador 9 (DE)', 'DE-9', 'FWD', NULL),
    (11, 'Jogador 11 (DE)', 'DE-11', 'FWD', NULL),
    (14, 'Jogador 14 (DE)', 'DE-14', 'FWD', NULL),
    (18, 'Jogador 18 (DE)', 'DE-18', 'FWD', NULL),
    (20, 'Jogador 20 (DE)', 'DE-20', 'FWD', NULL),
    (21, 'Jogador 21 (DE)', 'DE-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Alemanha';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (JP)', 'JP-1', 'GK', NULL),
    (12, 'Jogador 12 (JP)', 'JP-12', 'GK', NULL),
    (23, 'Jogador 23 (JP)', 'JP-23', 'GK', NULL),
    (2, 'Jogador 2 (JP)', 'JP-2', 'DEF', NULL),
    (3, 'Jogador 3 (JP)', 'JP-3', 'DEF', NULL),
    (4, 'Jogador 4 (JP)', 'JP-4', 'DEF', NULL),
    (5, 'Jogador 5 (JP)', 'JP-5', 'DEF', NULL),
    (6, 'Jogador 6 (JP)', 'JP-6', 'DEF', NULL),
    (13, 'Jogador 13 (JP)', 'JP-13', 'DEF', NULL),
    (22, 'Jogador 22 (JP)', 'JP-22', 'DEF', NULL),
    (8, 'Jogador 8 (JP)', 'JP-8', 'MID', NULL),
    (10, 'Jogador 10 (JP)', 'JP-10', 'MID', NULL),
    (15, 'Jogador 15 (JP)', 'JP-15', 'MID', NULL),
    (16, 'Jogador 16 (JP)', 'JP-16', 'MID', NULL),
    (17, 'Jogador 17 (JP)', 'JP-17', 'MID', NULL),
    (19, 'Jogador 19 (JP)', 'JP-19', 'MID', NULL),
    (7, 'Jogador 7 (JP)', 'JP-7', 'FWD', NULL),
    (9, 'Jogador 9 (JP)', 'JP-9', 'FWD', NULL),
    (11, 'Jogador 11 (JP)', 'JP-11', 'FWD', NULL),
    (14, 'Jogador 14 (JP)', 'JP-14', 'FWD', NULL),
    (18, 'Jogador 18 (JP)', 'JP-18', 'FWD', NULL),
    (20, 'Jogador 20 (JP)', 'JP-20', 'FWD', NULL),
    (21, 'Jogador 21 (JP)', 'JP-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Japão';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (CI)', 'CI-1', 'GK', NULL),
    (12, 'Jogador 12 (CI)', 'CI-12', 'GK', NULL),
    (23, 'Jogador 23 (CI)', 'CI-23', 'GK', NULL),
    (2, 'Jogador 2 (CI)', 'CI-2', 'DEF', NULL),
    (3, 'Jogador 3 (CI)', 'CI-3', 'DEF', NULL),
    (4, 'Jogador 4 (CI)', 'CI-4', 'DEF', NULL),
    (5, 'Jogador 5 (CI)', 'CI-5', 'DEF', NULL),
    (6, 'Jogador 6 (CI)', 'CI-6', 'DEF', NULL),
    (13, 'Jogador 13 (CI)', 'CI-13', 'DEF', NULL),
    (22, 'Jogador 22 (CI)', 'CI-22', 'DEF', NULL),
    (8, 'Jogador 8 (CI)', 'CI-8', 'MID', NULL),
    (10, 'Jogador 10 (CI)', 'CI-10', 'MID', NULL),
    (15, 'Jogador 15 (CI)', 'CI-15', 'MID', NULL),
    (16, 'Jogador 16 (CI)', 'CI-16', 'MID', NULL),
    (17, 'Jogador 17 (CI)', 'CI-17', 'MID', NULL),
    (19, 'Jogador 19 (CI)', 'CI-19', 'MID', NULL),
    (7, 'Jogador 7 (CI)', 'CI-7', 'FWD', NULL),
    (9, 'Jogador 9 (CI)', 'CI-9', 'FWD', NULL),
    (11, 'Jogador 11 (CI)', 'CI-11', 'FWD', NULL),
    (14, 'Jogador 14 (CI)', 'CI-14', 'FWD', NULL),
    (18, 'Jogador 18 (CI)', 'CI-18', 'FWD', NULL),
    (20, 'Jogador 20 (CI)', 'CI-20', 'FWD', NULL),
    (21, 'Jogador 21 (CI)', 'CI-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Costa do Marfim';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (CW)', 'CW-1', 'GK', NULL),
    (12, 'Jogador 12 (CW)', 'CW-12', 'GK', NULL),
    (23, 'Jogador 23 (CW)', 'CW-23', 'GK', NULL),
    (2, 'Jogador 2 (CW)', 'CW-2', 'DEF', NULL),
    (3, 'Jogador 3 (CW)', 'CW-3', 'DEF', NULL),
    (4, 'Jogador 4 (CW)', 'CW-4', 'DEF', NULL),
    (5, 'Jogador 5 (CW)', 'CW-5', 'DEF', NULL),
    (6, 'Jogador 6 (CW)', 'CW-6', 'DEF', NULL),
    (13, 'Jogador 13 (CW)', 'CW-13', 'DEF', NULL),
    (22, 'Jogador 22 (CW)', 'CW-22', 'DEF', NULL),
    (8, 'Jogador 8 (CW)', 'CW-8', 'MID', NULL),
    (10, 'Jogador 10 (CW)', 'CW-10', 'MID', NULL),
    (15, 'Jogador 15 (CW)', 'CW-15', 'MID', NULL),
    (16, 'Jogador 16 (CW)', 'CW-16', 'MID', NULL),
    (17, 'Jogador 17 (CW)', 'CW-17', 'MID', NULL),
    (19, 'Jogador 19 (CW)', 'CW-19', 'MID', NULL),
    (7, 'Jogador 7 (CW)', 'CW-7', 'FWD', NULL),
    (9, 'Jogador 9 (CW)', 'CW-9', 'FWD', NULL),
    (11, 'Jogador 11 (CW)', 'CW-11', 'FWD', NULL),
    (14, 'Jogador 14 (CW)', 'CW-14', 'FWD', NULL),
    (18, 'Jogador 18 (CW)', 'CW-18', 'FWD', NULL),
    (20, 'Jogador 20 (CW)', 'CW-20', 'FWD', NULL),
    (21, 'Jogador 21 (CW)', 'CW-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Curaçao';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (NL)', 'NL-1', 'GK', NULL),
    (12, 'Jogador 12 (NL)', 'NL-12', 'GK', NULL),
    (23, 'Jogador 23 (NL)', 'NL-23', 'GK', NULL),
    (2, 'Jogador 2 (NL)', 'NL-2', 'DEF', NULL),
    (3, 'Jogador 3 (NL)', 'NL-3', 'DEF', NULL),
    (4, 'Jogador 4 (NL)', 'NL-4', 'DEF', NULL),
    (5, 'Jogador 5 (NL)', 'NL-5', 'DEF', NULL),
    (6, 'Jogador 6 (NL)', 'NL-6', 'DEF', NULL),
    (13, 'Jogador 13 (NL)', 'NL-13', 'DEF', NULL),
    (22, 'Jogador 22 (NL)', 'NL-22', 'DEF', NULL),
    (8, 'Jogador 8 (NL)', 'NL-8', 'MID', NULL),
    (10, 'Jogador 10 (NL)', 'NL-10', 'MID', NULL),
    (15, 'Jogador 15 (NL)', 'NL-15', 'MID', NULL),
    (16, 'Jogador 16 (NL)', 'NL-16', 'MID', NULL),
    (17, 'Jogador 17 (NL)', 'NL-17', 'MID', NULL),
    (19, 'Jogador 19 (NL)', 'NL-19', 'MID', NULL),
    (7, 'Jogador 7 (NL)', 'NL-7', 'FWD', NULL),
    (9, 'Jogador 9 (NL)', 'NL-9', 'FWD', NULL),
    (11, 'Jogador 11 (NL)', 'NL-11', 'FWD', NULL),
    (14, 'Jogador 14 (NL)', 'NL-14', 'FWD', NULL),
    (18, 'Jogador 18 (NL)', 'NL-18', 'FWD', NULL),
    (20, 'Jogador 20 (NL)', 'NL-20', 'FWD', NULL),
    (21, 'Jogador 21 (NL)', 'NL-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Holanda';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (SE)', 'SE-1', 'GK', NULL),
    (12, 'Jogador 12 (SE)', 'SE-12', 'GK', NULL),
    (23, 'Jogador 23 (SE)', 'SE-23', 'GK', NULL),
    (2, 'Jogador 2 (SE)', 'SE-2', 'DEF', NULL),
    (3, 'Jogador 3 (SE)', 'SE-3', 'DEF', NULL),
    (4, 'Jogador 4 (SE)', 'SE-4', 'DEF', NULL),
    (5, 'Jogador 5 (SE)', 'SE-5', 'DEF', NULL),
    (6, 'Jogador 6 (SE)', 'SE-6', 'DEF', NULL),
    (13, 'Jogador 13 (SE)', 'SE-13', 'DEF', NULL),
    (22, 'Jogador 22 (SE)', 'SE-22', 'DEF', NULL),
    (8, 'Jogador 8 (SE)', 'SE-8', 'MID', NULL),
    (10, 'Jogador 10 (SE)', 'SE-10', 'MID', NULL),
    (15, 'Jogador 15 (SE)', 'SE-15', 'MID', NULL),
    (16, 'Jogador 16 (SE)', 'SE-16', 'MID', NULL),
    (17, 'Jogador 17 (SE)', 'SE-17', 'MID', NULL),
    (19, 'Jogador 19 (SE)', 'SE-19', 'MID', NULL),
    (7, 'Jogador 7 (SE)', 'SE-7', 'FWD', NULL),
    (9, 'Jogador 9 (SE)', 'SE-9', 'FWD', NULL),
    (11, 'Jogador 11 (SE)', 'SE-11', 'FWD', NULL),
    (14, 'Jogador 14 (SE)', 'SE-14', 'FWD', NULL),
    (18, 'Jogador 18 (SE)', 'SE-18', 'FWD', NULL),
    (20, 'Jogador 20 (SE)', 'SE-20', 'FWD', NULL),
    (21, 'Jogador 21 (SE)', 'SE-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Suécia';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (TN)', 'TN-1', 'GK', NULL),
    (12, 'Jogador 12 (TN)', 'TN-12', 'GK', NULL),
    (23, 'Jogador 23 (TN)', 'TN-23', 'GK', NULL),
    (2, 'Jogador 2 (TN)', 'TN-2', 'DEF', NULL),
    (3, 'Jogador 3 (TN)', 'TN-3', 'DEF', NULL),
    (4, 'Jogador 4 (TN)', 'TN-4', 'DEF', NULL),
    (5, 'Jogador 5 (TN)', 'TN-5', 'DEF', NULL),
    (6, 'Jogador 6 (TN)', 'TN-6', 'DEF', NULL),
    (13, 'Jogador 13 (TN)', 'TN-13', 'DEF', NULL),
    (22, 'Jogador 22 (TN)', 'TN-22', 'DEF', NULL),
    (8, 'Jogador 8 (TN)', 'TN-8', 'MID', NULL),
    (10, 'Jogador 10 (TN)', 'TN-10', 'MID', NULL),
    (15, 'Jogador 15 (TN)', 'TN-15', 'MID', NULL),
    (16, 'Jogador 16 (TN)', 'TN-16', 'MID', NULL),
    (17, 'Jogador 17 (TN)', 'TN-17', 'MID', NULL),
    (19, 'Jogador 19 (TN)', 'TN-19', 'MID', NULL),
    (7, 'Jogador 7 (TN)', 'TN-7', 'FWD', NULL),
    (9, 'Jogador 9 (TN)', 'TN-9', 'FWD', NULL),
    (11, 'Jogador 11 (TN)', 'TN-11', 'FWD', NULL),
    (14, 'Jogador 14 (TN)', 'TN-14', 'FWD', NULL),
    (18, 'Jogador 18 (TN)', 'TN-18', 'FWD', NULL),
    (20, 'Jogador 20 (TN)', 'TN-20', 'FWD', NULL),
    (21, 'Jogador 21 (TN)', 'TN-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Tunísia';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (NG)', 'NG-1', 'GK', NULL),
    (12, 'Jogador 12 (NG)', 'NG-12', 'GK', NULL),
    (23, 'Jogador 23 (NG)', 'NG-23', 'GK', NULL),
    (2, 'Jogador 2 (NG)', 'NG-2', 'DEF', NULL),
    (3, 'Jogador 3 (NG)', 'NG-3', 'DEF', NULL),
    (4, 'Jogador 4 (NG)', 'NG-4', 'DEF', NULL),
    (5, 'Jogador 5 (NG)', 'NG-5', 'DEF', NULL),
    (6, 'Jogador 6 (NG)', 'NG-6', 'DEF', NULL),
    (13, 'Jogador 13 (NG)', 'NG-13', 'DEF', NULL),
    (22, 'Jogador 22 (NG)', 'NG-22', 'DEF', NULL),
    (8, 'Jogador 8 (NG)', 'NG-8', 'MID', NULL),
    (10, 'Jogador 10 (NG)', 'NG-10', 'MID', NULL),
    (15, 'Jogador 15 (NG)', 'NG-15', 'MID', NULL),
    (16, 'Jogador 16 (NG)', 'NG-16', 'MID', NULL),
    (17, 'Jogador 17 (NG)', 'NG-17', 'MID', NULL),
    (19, 'Jogador 19 (NG)', 'NG-19', 'MID', NULL),
    (7, 'Jogador 7 (NG)', 'NG-7', 'FWD', NULL),
    (9, 'Jogador 9 (NG)', 'NG-9', 'FWD', NULL),
    (11, 'Jogador 11 (NG)', 'NG-11', 'FWD', NULL),
    (14, 'Jogador 14 (NG)', 'NG-14', 'FWD', NULL),
    (18, 'Jogador 18 (NG)', 'NG-18', 'FWD', NULL),
    (20, 'Jogador 20 (NG)', 'NG-20', 'FWD', NULL),
    (21, 'Jogador 21 (NG)', 'NG-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Nigéria';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (CO)', 'CO-1', 'GK', NULL),
    (12, 'Jogador 12 (CO)', 'CO-12', 'GK', NULL),
    (23, 'Jogador 23 (CO)', 'CO-23', 'GK', NULL),
    (2, 'Jogador 2 (CO)', 'CO-2', 'DEF', NULL),
    (3, 'Jogador 3 (CO)', 'CO-3', 'DEF', NULL),
    (4, 'Jogador 4 (CO)', 'CO-4', 'DEF', NULL),
    (5, 'Jogador 5 (CO)', 'CO-5', 'DEF', NULL),
    (6, 'Jogador 6 (CO)', 'CO-6', 'DEF', NULL),
    (13, 'Jogador 13 (CO)', 'CO-13', 'DEF', NULL),
    (22, 'Jogador 22 (CO)', 'CO-22', 'DEF', NULL),
    (8, 'Jogador 8 (CO)', 'CO-8', 'MID', NULL),
    (10, 'Jogador 10 (CO)', 'CO-10', 'MID', NULL),
    (15, 'Jogador 15 (CO)', 'CO-15', 'MID', NULL),
    (16, 'Jogador 16 (CO)', 'CO-16', 'MID', NULL),
    (17, 'Jogador 17 (CO)', 'CO-17', 'MID', NULL),
    (19, 'Jogador 19 (CO)', 'CO-19', 'MID', NULL),
    (7, 'Jogador 7 (CO)', 'CO-7', 'FWD', NULL),
    (9, 'Jogador 9 (CO)', 'CO-9', 'FWD', NULL),
    (11, 'Jogador 11 (CO)', 'CO-11', 'FWD', NULL),
    (14, 'Jogador 14 (CO)', 'CO-14', 'FWD', NULL),
    (18, 'Jogador 18 (CO)', 'CO-18', 'FWD', NULL),
    (20, 'Jogador 20 (CO)', 'CO-20', 'FWD', NULL),
    (21, 'Jogador 21 (CO)', 'CO-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Colômbia';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (SA)', 'SA-1', 'GK', NULL),
    (12, 'Jogador 12 (SA)', 'SA-12', 'GK', NULL),
    (23, 'Jogador 23 (SA)', 'SA-23', 'GK', NULL),
    (2, 'Jogador 2 (SA)', 'SA-2', 'DEF', NULL),
    (3, 'Jogador 3 (SA)', 'SA-3', 'DEF', NULL),
    (4, 'Jogador 4 (SA)', 'SA-4', 'DEF', NULL),
    (5, 'Jogador 5 (SA)', 'SA-5', 'DEF', NULL),
    (6, 'Jogador 6 (SA)', 'SA-6', 'DEF', NULL),
    (13, 'Jogador 13 (SA)', 'SA-13', 'DEF', NULL),
    (22, 'Jogador 22 (SA)', 'SA-22', 'DEF', NULL),
    (8, 'Jogador 8 (SA)', 'SA-8', 'MID', NULL),
    (10, 'Jogador 10 (SA)', 'SA-10', 'MID', NULL),
    (15, 'Jogador 15 (SA)', 'SA-15', 'MID', NULL),
    (16, 'Jogador 16 (SA)', 'SA-16', 'MID', NULL),
    (17, 'Jogador 17 (SA)', 'SA-17', 'MID', NULL),
    (19, 'Jogador 19 (SA)', 'SA-19', 'MID', NULL),
    (7, 'Jogador 7 (SA)', 'SA-7', 'FWD', NULL),
    (9, 'Jogador 9 (SA)', 'SA-9', 'FWD', NULL),
    (11, 'Jogador 11 (SA)', 'SA-11', 'FWD', NULL),
    (14, 'Jogador 14 (SA)', 'SA-14', 'FWD', NULL),
    (18, 'Jogador 18 (SA)', 'SA-18', 'FWD', NULL),
    (20, 'Jogador 20 (SA)', 'SA-20', 'FWD', NULL),
    (21, 'Jogador 21 (SA)', 'SA-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Arábia Saudita';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (ES)', 'ES-1', 'GK', NULL),
    (12, 'Jogador 12 (ES)', 'ES-12', 'GK', NULL),
    (23, 'Jogador 23 (ES)', 'ES-23', 'GK', NULL),
    (2, 'Jogador 2 (ES)', 'ES-2', 'DEF', NULL),
    (3, 'Jogador 3 (ES)', 'ES-3', 'DEF', NULL),
    (4, 'Jogador 4 (ES)', 'ES-4', 'DEF', NULL),
    (5, 'Jogador 5 (ES)', 'ES-5', 'DEF', NULL),
    (6, 'Jogador 6 (ES)', 'ES-6', 'DEF', NULL),
    (13, 'Jogador 13 (ES)', 'ES-13', 'DEF', NULL),
    (22, 'Jogador 22 (ES)', 'ES-22', 'DEF', NULL),
    (8, 'Jogador 8 (ES)', 'ES-8', 'MID', NULL),
    (10, 'Jogador 10 (ES)', 'ES-10', 'MID', NULL),
    (15, 'Jogador 15 (ES)', 'ES-15', 'MID', NULL),
    (16, 'Jogador 16 (ES)', 'ES-16', 'MID', NULL),
    (17, 'Jogador 17 (ES)', 'ES-17', 'MID', NULL),
    (19, 'Jogador 19 (ES)', 'ES-19', 'MID', NULL),
    (7, 'Jogador 7 (ES)', 'ES-7', 'FWD', NULL),
    (9, 'Jogador 9 (ES)', 'ES-9', 'FWD', NULL),
    (11, 'Jogador 11 (ES)', 'ES-11', 'FWD', NULL),
    (14, 'Jogador 14 (ES)', 'ES-14', 'FWD', NULL),
    (18, 'Jogador 18 (ES)', 'ES-18', 'FWD', NULL),
    (20, 'Jogador 20 (ES)', 'ES-20', 'FWD', NULL),
    (21, 'Jogador 21 (ES)', 'ES-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Espanha';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (UY)', 'UY-1', 'GK', NULL),
    (12, 'Jogador 12 (UY)', 'UY-12', 'GK', NULL),
    (23, 'Jogador 23 (UY)', 'UY-23', 'GK', NULL),
    (2, 'Jogador 2 (UY)', 'UY-2', 'DEF', NULL),
    (3, 'Jogador 3 (UY)', 'UY-3', 'DEF', NULL),
    (4, 'Jogador 4 (UY)', 'UY-4', 'DEF', NULL),
    (5, 'Jogador 5 (UY)', 'UY-5', 'DEF', NULL),
    (6, 'Jogador 6 (UY)', 'UY-6', 'DEF', NULL),
    (13, 'Jogador 13 (UY)', 'UY-13', 'DEF', NULL),
    (22, 'Jogador 22 (UY)', 'UY-22', 'DEF', NULL),
    (8, 'Jogador 8 (UY)', 'UY-8', 'MID', NULL),
    (10, 'Jogador 10 (UY)', 'UY-10', 'MID', NULL),
    (15, 'Jogador 15 (UY)', 'UY-15', 'MID', NULL),
    (16, 'Jogador 16 (UY)', 'UY-16', 'MID', NULL),
    (17, 'Jogador 17 (UY)', 'UY-17', 'MID', NULL),
    (19, 'Jogador 19 (UY)', 'UY-19', 'MID', NULL),
    (7, 'Jogador 7 (UY)', 'UY-7', 'FWD', NULL),
    (9, 'Jogador 9 (UY)', 'UY-9', 'FWD', NULL),
    (11, 'Jogador 11 (UY)', 'UY-11', 'FWD', NULL),
    (14, 'Jogador 14 (UY)', 'UY-14', 'FWD', NULL),
    (18, 'Jogador 18 (UY)', 'UY-18', 'FWD', NULL),
    (20, 'Jogador 20 (UY)', 'UY-20', 'FWD', NULL),
    (21, 'Jogador 21 (UY)', 'UY-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Uruguai';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (CV)', 'CV-1', 'GK', NULL),
    (12, 'Jogador 12 (CV)', 'CV-12', 'GK', NULL),
    (23, 'Jogador 23 (CV)', 'CV-23', 'GK', NULL),
    (2, 'Jogador 2 (CV)', 'CV-2', 'DEF', NULL),
    (3, 'Jogador 3 (CV)', 'CV-3', 'DEF', NULL),
    (4, 'Jogador 4 (CV)', 'CV-4', 'DEF', NULL),
    (5, 'Jogador 5 (CV)', 'CV-5', 'DEF', NULL),
    (6, 'Jogador 6 (CV)', 'CV-6', 'DEF', NULL),
    (13, 'Jogador 13 (CV)', 'CV-13', 'DEF', NULL),
    (22, 'Jogador 22 (CV)', 'CV-22', 'DEF', NULL),
    (8, 'Jogador 8 (CV)', 'CV-8', 'MID', NULL),
    (10, 'Jogador 10 (CV)', 'CV-10', 'MID', NULL),
    (15, 'Jogador 15 (CV)', 'CV-15', 'MID', NULL),
    (16, 'Jogador 16 (CV)', 'CV-16', 'MID', NULL),
    (17, 'Jogador 17 (CV)', 'CV-17', 'MID', NULL),
    (19, 'Jogador 19 (CV)', 'CV-19', 'MID', NULL),
    (7, 'Jogador 7 (CV)', 'CV-7', 'FWD', NULL),
    (9, 'Jogador 9 (CV)', 'CV-9', 'FWD', NULL),
    (11, 'Jogador 11 (CV)', 'CV-11', 'FWD', NULL),
    (14, 'Jogador 14 (CV)', 'CV-14', 'FWD', NULL),
    (18, 'Jogador 18 (CV)', 'CV-18', 'FWD', NULL),
    (20, 'Jogador 20 (CV)', 'CV-20', 'FWD', NULL),
    (21, 'Jogador 21 (CV)', 'CV-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Cabo Verde';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (FR)', 'FR-1', 'GK', NULL),
    (12, 'Jogador 12 (FR)', 'FR-12', 'GK', NULL),
    (23, 'Jogador 23 (FR)', 'FR-23', 'GK', NULL),
    (2, 'Jogador 2 (FR)', 'FR-2', 'DEF', NULL),
    (3, 'Jogador 3 (FR)', 'FR-3', 'DEF', NULL),
    (4, 'Jogador 4 (FR)', 'FR-4', 'DEF', NULL),
    (5, 'Jogador 5 (FR)', 'FR-5', 'DEF', NULL),
    (6, 'Jogador 6 (FR)', 'FR-6', 'DEF', NULL),
    (13, 'Jogador 13 (FR)', 'FR-13', 'DEF', NULL),
    (22, 'Jogador 22 (FR)', 'FR-22', 'DEF', NULL),
    (8, 'Jogador 8 (FR)', 'FR-8', 'MID', NULL),
    (10, 'Jogador 10 (FR)', 'FR-10', 'MID', NULL),
    (15, 'Jogador 15 (FR)', 'FR-15', 'MID', NULL),
    (16, 'Jogador 16 (FR)', 'FR-16', 'MID', NULL),
    (17, 'Jogador 17 (FR)', 'FR-17', 'MID', NULL),
    (19, 'Jogador 19 (FR)', 'FR-19', 'MID', NULL),
    (7, 'Jogador 7 (FR)', 'FR-7', 'FWD', NULL),
    (9, 'Jogador 9 (FR)', 'FR-9', 'FWD', NULL),
    (11, 'Jogador 11 (FR)', 'FR-11', 'FWD', NULL),
    (14, 'Jogador 14 (FR)', 'FR-14', 'FWD', NULL),
    (18, 'Jogador 18 (FR)', 'FR-18', 'FWD', NULL),
    (20, 'Jogador 20 (FR)', 'FR-20', 'FWD', NULL),
    (21, 'Jogador 21 (FR)', 'FR-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'França';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (NO)', 'NO-1', 'GK', NULL),
    (12, 'Jogador 12 (NO)', 'NO-12', 'GK', NULL),
    (23, 'Jogador 23 (NO)', 'NO-23', 'GK', NULL),
    (2, 'Jogador 2 (NO)', 'NO-2', 'DEF', NULL),
    (3, 'Jogador 3 (NO)', 'NO-3', 'DEF', NULL),
    (4, 'Jogador 4 (NO)', 'NO-4', 'DEF', NULL),
    (5, 'Jogador 5 (NO)', 'NO-5', 'DEF', NULL),
    (6, 'Jogador 6 (NO)', 'NO-6', 'DEF', NULL),
    (13, 'Jogador 13 (NO)', 'NO-13', 'DEF', NULL),
    (22, 'Jogador 22 (NO)', 'NO-22', 'DEF', NULL),
    (8, 'Jogador 8 (NO)', 'NO-8', 'MID', NULL),
    (10, 'Jogador 10 (NO)', 'NO-10', 'MID', NULL),
    (15, 'Jogador 15 (NO)', 'NO-15', 'MID', NULL),
    (16, 'Jogador 16 (NO)', 'NO-16', 'MID', NULL),
    (17, 'Jogador 17 (NO)', 'NO-17', 'MID', NULL),
    (19, 'Jogador 19 (NO)', 'NO-19', 'MID', NULL),
    (7, 'Jogador 7 (NO)', 'NO-7', 'FWD', NULL),
    (9, 'Jogador 9 (NO)', 'NO-9', 'FWD', NULL),
    (11, 'Jogador 11 (NO)', 'NO-11', 'FWD', NULL),
    (14, 'Jogador 14 (NO)', 'NO-14', 'FWD', NULL),
    (18, 'Jogador 18 (NO)', 'NO-18', 'FWD', NULL),
    (20, 'Jogador 20 (NO)', 'NO-20', 'FWD', NULL),
    (21, 'Jogador 21 (NO)', 'NO-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Noruega';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (SN)', 'SN-1', 'GK', NULL),
    (12, 'Jogador 12 (SN)', 'SN-12', 'GK', NULL),
    (23, 'Jogador 23 (SN)', 'SN-23', 'GK', NULL),
    (2, 'Jogador 2 (SN)', 'SN-2', 'DEF', NULL),
    (3, 'Jogador 3 (SN)', 'SN-3', 'DEF', NULL),
    (4, 'Jogador 4 (SN)', 'SN-4', 'DEF', NULL),
    (5, 'Jogador 5 (SN)', 'SN-5', 'DEF', NULL),
    (6, 'Jogador 6 (SN)', 'SN-6', 'DEF', NULL),
    (13, 'Jogador 13 (SN)', 'SN-13', 'DEF', NULL),
    (22, 'Jogador 22 (SN)', 'SN-22', 'DEF', NULL),
    (8, 'Jogador 8 (SN)', 'SN-8', 'MID', NULL),
    (10, 'Jogador 10 (SN)', 'SN-10', 'MID', NULL),
    (15, 'Jogador 15 (SN)', 'SN-15', 'MID', NULL),
    (16, 'Jogador 16 (SN)', 'SN-16', 'MID', NULL),
    (17, 'Jogador 17 (SN)', 'SN-17', 'MID', NULL),
    (19, 'Jogador 19 (SN)', 'SN-19', 'MID', NULL),
    (7, 'Jogador 7 (SN)', 'SN-7', 'FWD', NULL),
    (9, 'Jogador 9 (SN)', 'SN-9', 'FWD', NULL),
    (11, 'Jogador 11 (SN)', 'SN-11', 'FWD', NULL),
    (14, 'Jogador 14 (SN)', 'SN-14', 'FWD', NULL),
    (18, 'Jogador 18 (SN)', 'SN-18', 'FWD', NULL),
    (20, 'Jogador 20 (SN)', 'SN-20', 'FWD', NULL),
    (21, 'Jogador 21 (SN)', 'SN-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Senegal';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (IQ)', 'IQ-1', 'GK', NULL),
    (12, 'Jogador 12 (IQ)', 'IQ-12', 'GK', NULL),
    (23, 'Jogador 23 (IQ)', 'IQ-23', 'GK', NULL),
    (2, 'Jogador 2 (IQ)', 'IQ-2', 'DEF', NULL),
    (3, 'Jogador 3 (IQ)', 'IQ-3', 'DEF', NULL),
    (4, 'Jogador 4 (IQ)', 'IQ-4', 'DEF', NULL),
    (5, 'Jogador 5 (IQ)', 'IQ-5', 'DEF', NULL),
    (6, 'Jogador 6 (IQ)', 'IQ-6', 'DEF', NULL),
    (13, 'Jogador 13 (IQ)', 'IQ-13', 'DEF', NULL),
    (22, 'Jogador 22 (IQ)', 'IQ-22', 'DEF', NULL),
    (8, 'Jogador 8 (IQ)', 'IQ-8', 'MID', NULL),
    (10, 'Jogador 10 (IQ)', 'IQ-10', 'MID', NULL),
    (15, 'Jogador 15 (IQ)', 'IQ-15', 'MID', NULL),
    (16, 'Jogador 16 (IQ)', 'IQ-16', 'MID', NULL),
    (17, 'Jogador 17 (IQ)', 'IQ-17', 'MID', NULL),
    (19, 'Jogador 19 (IQ)', 'IQ-19', 'MID', NULL),
    (7, 'Jogador 7 (IQ)', 'IQ-7', 'FWD', NULL),
    (9, 'Jogador 9 (IQ)', 'IQ-9', 'FWD', NULL),
    (11, 'Jogador 11 (IQ)', 'IQ-11', 'FWD', NULL),
    (14, 'Jogador 14 (IQ)', 'IQ-14', 'FWD', NULL),
    (18, 'Jogador 18 (IQ)', 'IQ-18', 'FWD', NULL),
    (20, 'Jogador 20 (IQ)', 'IQ-20', 'FWD', NULL),
    (21, 'Jogador 21 (IQ)', 'IQ-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Iraque';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (PT)', 'PT-1', 'GK', NULL),
    (12, 'Jogador 12 (PT)', 'PT-12', 'GK', NULL),
    (23, 'Jogador 23 (PT)', 'PT-23', 'GK', NULL),
    (2, 'Jogador 2 (PT)', 'PT-2', 'DEF', NULL),
    (3, 'Jogador 3 (PT)', 'PT-3', 'DEF', NULL),
    (4, 'Jogador 4 (PT)', 'PT-4', 'DEF', NULL),
    (5, 'Jogador 5 (PT)', 'PT-5', 'DEF', NULL),
    (6, 'Jogador 6 (PT)', 'PT-6', 'DEF', NULL),
    (13, 'Jogador 13 (PT)', 'PT-13', 'DEF', NULL),
    (22, 'Jogador 22 (PT)', 'PT-22', 'DEF', NULL),
    (8, 'Jogador 8 (PT)', 'PT-8', 'MID', NULL),
    (10, 'Jogador 10 (PT)', 'PT-10', 'MID', NULL),
    (15, 'Jogador 15 (PT)', 'PT-15', 'MID', NULL),
    (16, 'Jogador 16 (PT)', 'PT-16', 'MID', NULL),
    (17, 'Jogador 17 (PT)', 'PT-17', 'MID', NULL),
    (19, 'Jogador 19 (PT)', 'PT-19', 'MID', NULL),
    (7, 'Jogador 7 (PT)', 'PT-7', 'FWD', NULL),
    (9, 'Jogador 9 (PT)', 'PT-9', 'FWD', NULL),
    (11, 'Jogador 11 (PT)', 'PT-11', 'FWD', NULL),
    (14, 'Jogador 14 (PT)', 'PT-14', 'FWD', NULL),
    (18, 'Jogador 18 (PT)', 'PT-18', 'FWD', NULL),
    (20, 'Jogador 20 (PT)', 'PT-20', 'FWD', NULL),
    (21, 'Jogador 21 (PT)', 'PT-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Portugal';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (CD)', 'CD-1', 'GK', NULL),
    (12, 'Jogador 12 (CD)', 'CD-12', 'GK', NULL),
    (23, 'Jogador 23 (CD)', 'CD-23', 'GK', NULL),
    (2, 'Jogador 2 (CD)', 'CD-2', 'DEF', NULL),
    (3, 'Jogador 3 (CD)', 'CD-3', 'DEF', NULL),
    (4, 'Jogador 4 (CD)', 'CD-4', 'DEF', NULL),
    (5, 'Jogador 5 (CD)', 'CD-5', 'DEF', NULL),
    (6, 'Jogador 6 (CD)', 'CD-6', 'DEF', NULL),
    (13, 'Jogador 13 (CD)', 'CD-13', 'DEF', NULL),
    (22, 'Jogador 22 (CD)', 'CD-22', 'DEF', NULL),
    (8, 'Jogador 8 (CD)', 'CD-8', 'MID', NULL),
    (10, 'Jogador 10 (CD)', 'CD-10', 'MID', NULL),
    (15, 'Jogador 15 (CD)', 'CD-15', 'MID', NULL),
    (16, 'Jogador 16 (CD)', 'CD-16', 'MID', NULL),
    (17, 'Jogador 17 (CD)', 'CD-17', 'MID', NULL),
    (19, 'Jogador 19 (CD)', 'CD-19', 'MID', NULL),
    (7, 'Jogador 7 (CD)', 'CD-7', 'FWD', NULL),
    (9, 'Jogador 9 (CD)', 'CD-9', 'FWD', NULL),
    (11, 'Jogador 11 (CD)', 'CD-11', 'FWD', NULL),
    (14, 'Jogador 14 (CD)', 'CD-14', 'FWD', NULL),
    (18, 'Jogador 18 (CD)', 'CD-18', 'FWD', NULL),
    (20, 'Jogador 20 (CD)', 'CD-20', 'FWD', NULL),
    (21, 'Jogador 21 (CD)', 'CD-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Rep. Dem. Congo';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (UZ)', 'UZ-1', 'GK', NULL),
    (12, 'Jogador 12 (UZ)', 'UZ-12', 'GK', NULL),
    (23, 'Jogador 23 (UZ)', 'UZ-23', 'GK', NULL),
    (2, 'Jogador 2 (UZ)', 'UZ-2', 'DEF', NULL),
    (3, 'Jogador 3 (UZ)', 'UZ-3', 'DEF', NULL),
    (4, 'Jogador 4 (UZ)', 'UZ-4', 'DEF', NULL),
    (5, 'Jogador 5 (UZ)', 'UZ-5', 'DEF', NULL),
    (6, 'Jogador 6 (UZ)', 'UZ-6', 'DEF', NULL),
    (13, 'Jogador 13 (UZ)', 'UZ-13', 'DEF', NULL),
    (22, 'Jogador 22 (UZ)', 'UZ-22', 'DEF', NULL),
    (8, 'Jogador 8 (UZ)', 'UZ-8', 'MID', NULL),
    (10, 'Jogador 10 (UZ)', 'UZ-10', 'MID', NULL),
    (15, 'Jogador 15 (UZ)', 'UZ-15', 'MID', NULL),
    (16, 'Jogador 16 (UZ)', 'UZ-16', 'MID', NULL),
    (17, 'Jogador 17 (UZ)', 'UZ-17', 'MID', NULL),
    (19, 'Jogador 19 (UZ)', 'UZ-19', 'MID', NULL),
    (7, 'Jogador 7 (UZ)', 'UZ-7', 'FWD', NULL),
    (9, 'Jogador 9 (UZ)', 'UZ-9', 'FWD', NULL),
    (11, 'Jogador 11 (UZ)', 'UZ-11', 'FWD', NULL),
    (14, 'Jogador 14 (UZ)', 'UZ-14', 'FWD', NULL),
    (18, 'Jogador 18 (UZ)', 'UZ-18', 'FWD', NULL),
    (20, 'Jogador 20 (UZ)', 'UZ-20', 'FWD', NULL),
    (21, 'Jogador 21 (UZ)', 'UZ-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Uzbequistão';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (BE)', 'BE-1', 'GK', NULL),
    (12, 'Jogador 12 (BE)', 'BE-12', 'GK', NULL),
    (23, 'Jogador 23 (BE)', 'BE-23', 'GK', NULL),
    (2, 'Jogador 2 (BE)', 'BE-2', 'DEF', NULL),
    (3, 'Jogador 3 (BE)', 'BE-3', 'DEF', NULL),
    (4, 'Jogador 4 (BE)', 'BE-4', 'DEF', NULL),
    (5, 'Jogador 5 (BE)', 'BE-5', 'DEF', NULL),
    (6, 'Jogador 6 (BE)', 'BE-6', 'DEF', NULL),
    (13, 'Jogador 13 (BE)', 'BE-13', 'DEF', NULL),
    (22, 'Jogador 22 (BE)', 'BE-22', 'DEF', NULL),
    (8, 'Jogador 8 (BE)', 'BE-8', 'MID', NULL),
    (10, 'Jogador 10 (BE)', 'BE-10', 'MID', NULL),
    (15, 'Jogador 15 (BE)', 'BE-15', 'MID', NULL),
    (16, 'Jogador 16 (BE)', 'BE-16', 'MID', NULL),
    (17, 'Jogador 17 (BE)', 'BE-17', 'MID', NULL),
    (19, 'Jogador 19 (BE)', 'BE-19', 'MID', NULL),
    (7, 'Jogador 7 (BE)', 'BE-7', 'FWD', NULL),
    (9, 'Jogador 9 (BE)', 'BE-9', 'FWD', NULL),
    (11, 'Jogador 11 (BE)', 'BE-11', 'FWD', NULL),
    (14, 'Jogador 14 (BE)', 'BE-14', 'FWD', NULL),
    (18, 'Jogador 18 (BE)', 'BE-18', 'FWD', NULL),
    (20, 'Jogador 20 (BE)', 'BE-20', 'FWD', NULL),
    (21, 'Jogador 21 (BE)', 'BE-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Bélgica';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (IR)', 'IR-1', 'GK', NULL),
    (12, 'Jogador 12 (IR)', 'IR-12', 'GK', NULL),
    (23, 'Jogador 23 (IR)', 'IR-23', 'GK', NULL),
    (2, 'Jogador 2 (IR)', 'IR-2', 'DEF', NULL),
    (3, 'Jogador 3 (IR)', 'IR-3', 'DEF', NULL),
    (4, 'Jogador 4 (IR)', 'IR-4', 'DEF', NULL),
    (5, 'Jogador 5 (IR)', 'IR-5', 'DEF', NULL),
    (6, 'Jogador 6 (IR)', 'IR-6', 'DEF', NULL),
    (13, 'Jogador 13 (IR)', 'IR-13', 'DEF', NULL),
    (22, 'Jogador 22 (IR)', 'IR-22', 'DEF', NULL),
    (8, 'Jogador 8 (IR)', 'IR-8', 'MID', NULL),
    (10, 'Jogador 10 (IR)', 'IR-10', 'MID', NULL),
    (15, 'Jogador 15 (IR)', 'IR-15', 'MID', NULL),
    (16, 'Jogador 16 (IR)', 'IR-16', 'MID', NULL),
    (17, 'Jogador 17 (IR)', 'IR-17', 'MID', NULL),
    (19, 'Jogador 19 (IR)', 'IR-19', 'MID', NULL),
    (7, 'Jogador 7 (IR)', 'IR-7', 'FWD', NULL),
    (9, 'Jogador 9 (IR)', 'IR-9', 'FWD', NULL),
    (11, 'Jogador 11 (IR)', 'IR-11', 'FWD', NULL),
    (14, 'Jogador 14 (IR)', 'IR-14', 'FWD', NULL),
    (18, 'Jogador 18 (IR)', 'IR-18', 'FWD', NULL),
    (20, 'Jogador 20 (IR)', 'IR-20', 'FWD', NULL),
    (21, 'Jogador 21 (IR)', 'IR-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Irã';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (EG)', 'EG-1', 'GK', NULL),
    (12, 'Jogador 12 (EG)', 'EG-12', 'GK', NULL),
    (23, 'Jogador 23 (EG)', 'EG-23', 'GK', NULL),
    (2, 'Jogador 2 (EG)', 'EG-2', 'DEF', NULL),
    (3, 'Jogador 3 (EG)', 'EG-3', 'DEF', NULL),
    (4, 'Jogador 4 (EG)', 'EG-4', 'DEF', NULL),
    (5, 'Jogador 5 (EG)', 'EG-5', 'DEF', NULL),
    (6, 'Jogador 6 (EG)', 'EG-6', 'DEF', NULL),
    (13, 'Jogador 13 (EG)', 'EG-13', 'DEF', NULL),
    (22, 'Jogador 22 (EG)', 'EG-22', 'DEF', NULL),
    (8, 'Jogador 8 (EG)', 'EG-8', 'MID', NULL),
    (10, 'Jogador 10 (EG)', 'EG-10', 'MID', NULL),
    (15, 'Jogador 15 (EG)', 'EG-15', 'MID', NULL),
    (16, 'Jogador 16 (EG)', 'EG-16', 'MID', NULL),
    (17, 'Jogador 17 (EG)', 'EG-17', 'MID', NULL),
    (19, 'Jogador 19 (EG)', 'EG-19', 'MID', NULL),
    (7, 'Jogador 7 (EG)', 'EG-7', 'FWD', NULL),
    (9, 'Jogador 9 (EG)', 'EG-9', 'FWD', NULL),
    (11, 'Jogador 11 (EG)', 'EG-11', 'FWD', NULL),
    (14, 'Jogador 14 (EG)', 'EG-14', 'FWD', NULL),
    (18, 'Jogador 18 (EG)', 'EG-18', 'FWD', NULL),
    (20, 'Jogador 20 (EG)', 'EG-20', 'FWD', NULL),
    (21, 'Jogador 21 (EG)', 'EG-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Egito';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (NZ)', 'NZ-1', 'GK', NULL),
    (12, 'Jogador 12 (NZ)', 'NZ-12', 'GK', NULL),
    (23, 'Jogador 23 (NZ)', 'NZ-23', 'GK', NULL),
    (2, 'Jogador 2 (NZ)', 'NZ-2', 'DEF', NULL),
    (3, 'Jogador 3 (NZ)', 'NZ-3', 'DEF', NULL),
    (4, 'Jogador 4 (NZ)', 'NZ-4', 'DEF', NULL),
    (5, 'Jogador 5 (NZ)', 'NZ-5', 'DEF', NULL),
    (6, 'Jogador 6 (NZ)', 'NZ-6', 'DEF', NULL),
    (13, 'Jogador 13 (NZ)', 'NZ-13', 'DEF', NULL),
    (22, 'Jogador 22 (NZ)', 'NZ-22', 'DEF', NULL),
    (8, 'Jogador 8 (NZ)', 'NZ-8', 'MID', NULL),
    (10, 'Jogador 10 (NZ)', 'NZ-10', 'MID', NULL),
    (15, 'Jogador 15 (NZ)', 'NZ-15', 'MID', NULL),
    (16, 'Jogador 16 (NZ)', 'NZ-16', 'MID', NULL),
    (17, 'Jogador 17 (NZ)', 'NZ-17', 'MID', NULL),
    (19, 'Jogador 19 (NZ)', 'NZ-19', 'MID', NULL),
    (7, 'Jogador 7 (NZ)', 'NZ-7', 'FWD', NULL),
    (9, 'Jogador 9 (NZ)', 'NZ-9', 'FWD', NULL),
    (11, 'Jogador 11 (NZ)', 'NZ-11', 'FWD', NULL),
    (14, 'Jogador 14 (NZ)', 'NZ-14', 'FWD', NULL),
    (18, 'Jogador 18 (NZ)', 'NZ-18', 'FWD', NULL),
    (20, 'Jogador 20 (NZ)', 'NZ-20', 'FWD', NULL),
    (21, 'Jogador 21 (NZ)', 'NZ-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Nova Zelândia';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (GB-ENG)', 'GB-ENG-1', 'GK', NULL),
    (12, 'Jogador 12 (GB-ENG)', 'GB-ENG-12', 'GK', NULL),
    (23, 'Jogador 23 (GB-ENG)', 'GB-ENG-23', 'GK', NULL),
    (2, 'Jogador 2 (GB-ENG)', 'GB-ENG-2', 'DEF', NULL),
    (3, 'Jogador 3 (GB-ENG)', 'GB-ENG-3', 'DEF', NULL),
    (4, 'Jogador 4 (GB-ENG)', 'GB-ENG-4', 'DEF', NULL),
    (5, 'Jogador 5 (GB-ENG)', 'GB-ENG-5', 'DEF', NULL),
    (6, 'Jogador 6 (GB-ENG)', 'GB-ENG-6', 'DEF', NULL),
    (13, 'Jogador 13 (GB-ENG)', 'GB-ENG-13', 'DEF', NULL),
    (22, 'Jogador 22 (GB-ENG)', 'GB-ENG-22', 'DEF', NULL),
    (8, 'Jogador 8 (GB-ENG)', 'GB-ENG-8', 'MID', NULL),
    (10, 'Jogador 10 (GB-ENG)', 'GB-ENG-10', 'MID', NULL),
    (15, 'Jogador 15 (GB-ENG)', 'GB-ENG-15', 'MID', NULL),
    (16, 'Jogador 16 (GB-ENG)', 'GB-ENG-16', 'MID', NULL),
    (17, 'Jogador 17 (GB-ENG)', 'GB-ENG-17', 'MID', NULL),
    (19, 'Jogador 19 (GB-ENG)', 'GB-ENG-19', 'MID', NULL),
    (7, 'Jogador 7 (GB-ENG)', 'GB-ENG-7', 'FWD', NULL),
    (9, 'Jogador 9 (GB-ENG)', 'GB-ENG-9', 'FWD', NULL),
    (11, 'Jogador 11 (GB-ENG)', 'GB-ENG-11', 'FWD', NULL),
    (14, 'Jogador 14 (GB-ENG)', 'GB-ENG-14', 'FWD', NULL),
    (18, 'Jogador 18 (GB-ENG)', 'GB-ENG-18', 'FWD', NULL),
    (20, 'Jogador 20 (GB-ENG)', 'GB-ENG-20', 'FWD', NULL),
    (21, 'Jogador 21 (GB-ENG)', 'GB-ENG-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Inglaterra';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (GH)', 'GH-1', 'GK', NULL),
    (12, 'Jogador 12 (GH)', 'GH-12', 'GK', NULL),
    (23, 'Jogador 23 (GH)', 'GH-23', 'GK', NULL),
    (2, 'Jogador 2 (GH)', 'GH-2', 'DEF', NULL),
    (3, 'Jogador 3 (GH)', 'GH-3', 'DEF', NULL),
    (4, 'Jogador 4 (GH)', 'GH-4', 'DEF', NULL),
    (5, 'Jogador 5 (GH)', 'GH-5', 'DEF', NULL),
    (6, 'Jogador 6 (GH)', 'GH-6', 'DEF', NULL),
    (13, 'Jogador 13 (GH)', 'GH-13', 'DEF', NULL),
    (22, 'Jogador 22 (GH)', 'GH-22', 'DEF', NULL),
    (8, 'Jogador 8 (GH)', 'GH-8', 'MID', NULL),
    (10, 'Jogador 10 (GH)', 'GH-10', 'MID', NULL),
    (15, 'Jogador 15 (GH)', 'GH-15', 'MID', NULL),
    (16, 'Jogador 16 (GH)', 'GH-16', 'MID', NULL),
    (17, 'Jogador 17 (GH)', 'GH-17', 'MID', NULL),
    (19, 'Jogador 19 (GH)', 'GH-19', 'MID', NULL),
    (7, 'Jogador 7 (GH)', 'GH-7', 'FWD', NULL),
    (9, 'Jogador 9 (GH)', 'GH-9', 'FWD', NULL),
    (11, 'Jogador 11 (GH)', 'GH-11', 'FWD', NULL),
    (14, 'Jogador 14 (GH)', 'GH-14', 'FWD', NULL),
    (18, 'Jogador 18 (GH)', 'GH-18', 'FWD', NULL),
    (20, 'Jogador 20 (GH)', 'GH-20', 'FWD', NULL),
    (21, 'Jogador 21 (GH)', 'GH-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Gana';

WITH v(numero, nome, nome_curto, posicao, clube) AS (VALUES
    (1, 'Jogador 1 (PA)', 'PA-1', 'GK', NULL),
    (12, 'Jogador 12 (PA)', 'PA-12', 'GK', NULL),
    (23, 'Jogador 23 (PA)', 'PA-23', 'GK', NULL),
    (2, 'Jogador 2 (PA)', 'PA-2', 'DEF', NULL),
    (3, 'Jogador 3 (PA)', 'PA-3', 'DEF', NULL),
    (4, 'Jogador 4 (PA)', 'PA-4', 'DEF', NULL),
    (5, 'Jogador 5 (PA)', 'PA-5', 'DEF', NULL),
    (6, 'Jogador 6 (PA)', 'PA-6', 'DEF', NULL),
    (13, 'Jogador 13 (PA)', 'PA-13', 'DEF', NULL),
    (22, 'Jogador 22 (PA)', 'PA-22', 'DEF', NULL),
    (8, 'Jogador 8 (PA)', 'PA-8', 'MID', NULL),
    (10, 'Jogador 10 (PA)', 'PA-10', 'MID', NULL),
    (15, 'Jogador 15 (PA)', 'PA-15', 'MID', NULL),
    (16, 'Jogador 16 (PA)', 'PA-16', 'MID', NULL),
    (17, 'Jogador 17 (PA)', 'PA-17', 'MID', NULL),
    (19, 'Jogador 19 (PA)', 'PA-19', 'MID', NULL),
    (7, 'Jogador 7 (PA)', 'PA-7', 'FWD', NULL),
    (9, 'Jogador 9 (PA)', 'PA-9', 'FWD', NULL),
    (11, 'Jogador 11 (PA)', 'PA-11', 'FWD', NULL),
    (14, 'Jogador 14 (PA)', 'PA-14', 'FWD', NULL),
    (18, 'Jogador 18 (PA)', 'PA-18', 'FWD', NULL),
    (20, 'Jogador 20 (PA)', 'PA-20', 'FWD', NULL),
    (21, 'Jogador 21 (PA)', 'PA-21', 'FWD', NULL)
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome_curto, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Panamá';
