-- Seed 03: elenco completo da Seleção Brasileira (23 jogadores, referência PRD.md seção 8)
-- selecao_id resolvido via subquery (não depende da ordem de inserção do seed 01)
-- idade e capitão não constam no PRD.md, ficam NULL/0 até serem definidos via painel admin (RF-07)
-- clube de Alex Telles consta como "reserve" no PRD.md (provável placeholder do documento original) — mantido NULL

WITH v(numero, nome, posicao, clube) AS (VALUES
    (1,  'Ederson',              'GK',  'Manchester City'),
    (12, 'Weverton',             'GK',  'Palmeiras'),
    (23, 'Bento',                'GK',  'Al-Qadsiah'),
    (2,  'Danilo',               'DEF', 'Flamengo'),
    (3,  'Guilherme Arana',      'DEF', 'Atlético MG'),
    (4,  'Marquinhos',           'DEF', 'PSG'),
    (5,  'Gabriel Magalhães',    'DEF', 'Arsenal'),
    (6,  'Éder Militão',         'DEF', 'Real Madrid'),
    (13, 'Alex Telles',          'DEF', NULL),
    (22, 'Vanderson',            'DEF', 'Monaco'),
    (7,  'Vinícius Jr.',         'FWD', 'Real Madrid'),
    (8,  'Bruno Guimarães',      'MID', 'Newcastle'),
    (9,  'Richarlison',          'FWD', 'Tottenham'),
    (10, 'Neymar Jr.',           'MID', 'Al-Hilal'),
    (11, 'Raphinha',             'FWD', 'Barcelona'),
    (14, 'Endrick',              'FWD', 'Real Madrid'),
    (15, 'Casemiro',             'MID', 'Manchester United'),
    (16, 'Gerson',               'MID', 'Flamengo'),
    (17, 'Rodrygo',              'MID', 'Real Madrid'),
    (18, 'Gabriel Martinelli',   'FWD', 'Arsenal'),
    (19, 'Lucas Paquetá',        'MID', 'West Ham'),
    (20, 'Savinho',              'FWD', 'Manchester City'),
    (21, 'Evanilson',            'FWD', 'Bournemouth')
)
INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
SELECT s.id, v.numero, v.nome, v.nome, v.posicao, v.clube, NULL, 0
FROM selecoes s, v
WHERE s.nome_pt = 'Brasil';
