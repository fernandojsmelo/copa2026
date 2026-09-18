"""Chaveamento do mata-mata simulado no bolão.

NOTA: as fontes deste projeto (PRD.md/Claude.md) não trazem a tabela oficial
de cruzamento das oitavas de final da Copa de 48 seleções — só dizem que ela
"deve estar hardcoded" sem fornecer os dados. Apresentar um cruzamento
inventado como se fosse a tabela oficial da FIFA seria arriscar informação
incorreta. Por isso o chaveamento abaixo é um algoritmo próprio e
determinístico, documentado aqui, usado só para o simulador de bolão — não
representa o sorteio oficial do torneio.

Classificação para o mata-mata (RN-02 do PRD.md):
  - 1º e 2º de cada um dos 12 grupos (24 times)
  - os 8 melhores 3º colocados entre os 12 grupos (8 times)

Algoritmo de cruzamento das oitavas (32 times → 16 jogos):
  - 12 jogos: 1º do grupo N × 2º do grupo seguinte (N+1, com A após L), para
    nenhum confronto ser entre seleções do mesmo grupo.
  - 4 jogos: os 8 melhores terceiros, semeados entre si (1º×8º, 2º×7º, 3º×6º,
    4º×5º) para manter os mais bem colocados afastados o quanto possível.

Rodadas seguintes (cada uma reduz o número de times pela metade), usando só os
6 valores de `fase` que o schema aceita — 'semi' cobre duas rodadas (8→4 e
depois 4→2), diferenciadas por `semi1`/`semi2` só no identificador do slot:
  oitavas (16 jogos) → quartas (8) → semi1 (4) → semi2 (2) → final (1) + terceiro (1)
Total: 16+8+4+2+1+1 = 32 jogos de mata-mata + 72 da fase de grupos = 104,
batendo com o total do torneio citado no PRD.md.
"""

GRUPOS = list("ABCDEFGHIJKL")

RODADAS = [
    ("oitavas", 16, "quartas"),
    ("quartas", 8, "semi1"),
    ("semi1", 4, "semi2"),
]

SLOTS_MATA_MATA = (
    [f"oitavas-{i}" for i in range(1, 17)]
    + [f"quartas-{i}" for i in range(1, 9)]
    + [f"semi1-{i}" for i in range(1, 5)]
    + [f"semi2-{i}" for i in range(1, 3)]
    + ["terceiro", "final"]
)


def selecionar_melhores_terceiros(linhas_terceiros: list[dict]) -> list[dict]:
    """Recebe as linhas de classificação (posição 3) dos 12 grupos e retorna as 8 melhores."""

    def chave(linha):
        ranking = linha["selecao"].get("ranking_fifa")
        ranking = ranking if ranking is not None else 9999
        return (-linha["pontos"], -linha["saldo_gols"], -linha["gols_pro"], ranking, linha["selecao"]["id"])

    return sorted(linhas_terceiros, key=chave)[:8]


def _vencedor_perdedor(selecao_a_id: int, selecao_b_id: int, palpite: dict | None) -> tuple[int | None, int | None]:
    if palpite is None:
        return None, None
    ga, gb = palpite["gols_a"], palpite["gols_b"]
    if ga > gb:
        return selecao_a_id, selecao_b_id
    if gb > ga:
        return selecao_b_id, selecao_a_id
    pa, pb = palpite.get("penaltis_a"), palpite.get("penaltis_b")
    if pa is None or pb is None or pa == pb:
        return None, None
    return (selecao_a_id, selecao_b_id) if pa > pb else (selecao_b_id, selecao_a_id)


def _confronto(selecao_a_id: int | None, selecao_b_id: int | None, palpite: dict | None) -> dict:
    vencedor_id = perdedor_id = None
    if selecao_a_id is not None and selecao_b_id is not None:
        vencedor_id, perdedor_id = _vencedor_perdedor(selecao_a_id, selecao_b_id, palpite)
    return {
        "selecao_a_id": selecao_a_id,
        "selecao_b_id": selecao_b_id,
        "vencedor_id": vencedor_id,
        "perdedor_id": perdedor_id,
        "palpite": palpite,
    }


def montar_chaveamento(classificacoes: dict[str, list[dict]], palpites_mata_mata: dict[str, dict]) -> dict[str, dict]:
    """
    `classificacoes`: {letra_do_grupo: [linha_posicao_1, linha_posicao_2, linha_posicao_3, linha_posicao_4]}
    `palpites_mata_mata`: {chave_slot: {gols_a, gols_b, penaltis_a, penaltis_b}}

    Retorna {slot: {selecao_a_id, selecao_b_id, vencedor_id, perdedor_id, palpite}}
    para todos os 32 confrontos do mata-mata (16+8+4+2+1+1).
    """
    terceiros = [classificacoes[g][2] for g in GRUPOS if len(classificacoes.get(g, [])) >= 3]
    melhores_terceiros = selecionar_melhores_terceiros(terceiros)
    ids_terceiros = [linha["selecao"]["id"] for linha in melhores_terceiros]

    pares_oitavas: list[tuple[int | None, int | None]] = []
    for i, grupo in enumerate(GRUPOS):
        proximo = GRUPOS[(i + 1) % len(GRUPOS)]
        primeiro = classificacoes.get(grupo, [None])[0]
        segundo = classificacoes.get(proximo, [None, None])[1] if len(classificacoes.get(proximo, [])) >= 2 else None
        pares_oitavas.append(
            (
                primeiro["selecao"]["id"] if primeiro else None,
                segundo["selecao"]["id"] if segundo else None,
            )
        )
    for i in range(4):
        a = ids_terceiros[i] if i < len(ids_terceiros) else None
        b = ids_terceiros[7 - i] if (7 - i) < len(ids_terceiros) else None
        pares_oitavas.append((a, b))

    confrontos: dict[str, dict] = {}
    for i, (a, b) in enumerate(pares_oitavas, start=1):
        slot = f"oitavas-{i}"
        confrontos[slot] = _confronto(a, b, palpites_mata_mata.get(slot))

    for nome_atual, quantidade, nome_novo in RODADAS:
        for i in range(quantidade // 2):
            slot_a = f"{nome_atual}-{2 * i + 1}"
            slot_b = f"{nome_atual}-{2 * i + 2}"
            vencedor_a = confrontos[slot_a]["vencedor_id"]
            vencedor_b = confrontos[slot_b]["vencedor_id"]
            slot_novo = f"{nome_novo}-{i + 1}"
            confrontos[slot_novo] = _confronto(vencedor_a, vencedor_b, palpites_mata_mata.get(slot_novo))

    confrontos["final"] = _confronto(
        confrontos["semi2-1"]["vencedor_id"], confrontos["semi2-2"]["vencedor_id"], palpites_mata_mata.get("final")
    )
    confrontos["terceiro"] = _confronto(
        confrontos["semi2-1"]["perdedor_id"], confrontos["semi2-2"]["perdedor_id"], palpites_mata_mata.get("terceiro")
    )

    return confrontos
