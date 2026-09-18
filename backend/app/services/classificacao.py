"""Cálculo de classificação de um grupo, com desempate FIFA.

Critérios em ordem (RN-01 do PRD.md):
1. Pontos
2. Saldo de gols geral
3. Gols marcados geral
4. Confronto direto (mini-liga entre os times empatados nos 3 primeiros critérios)
5. Ranking FIFA (fallback final, quando disponível)

Fair play (cartões) não é aplicado — não há esse dado no schema (v1).
"""
import sqlite3

JOGOS_POR_GRUPO = 6  # round-robin de 4 seleções: C(4,2) = 6 jogos


def _stats_vazias():
    return {"jogos": 0, "vitorias": 0, "empates": 0, "derrotas": 0, "gols_pro": 0, "gols_contra": 0}


def _computar_stats(selecao_ids: set[int], jogos_encerrados: list[dict]) -> dict[int, dict]:
    stats = {sid: _stats_vazias() for sid in selecao_ids}
    for jogo in jogos_encerrados:
        a, b = jogo["selecao_a_id"], jogo["selecao_b_id"]
        if a not in selecao_ids or b not in selecao_ids:
            continue
        ga, gb = jogo["gols_a"], jogo["gols_b"]
        stats[a]["jogos"] += 1
        stats[b]["jogos"] += 1
        stats[a]["gols_pro"] += ga
        stats[a]["gols_contra"] += gb
        stats[b]["gols_pro"] += gb
        stats[b]["gols_contra"] += ga
        if ga > gb:
            stats[a]["vitorias"] += 1
            stats[b]["derrotas"] += 1
        elif gb > ga:
            stats[b]["vitorias"] += 1
            stats[a]["derrotas"] += 1
        else:
            stats[a]["empates"] += 1
            stats[b]["empates"] += 1
    for st in stats.values():
        st["pontos"] = st["vitorias"] * 3 + st["empates"]
        st["saldo_gols"] = st["gols_pro"] - st["gols_contra"]
    return stats


def _chave_criterios_gerais(stats: dict) -> tuple:
    return (-stats["pontos"], -stats["saldo_gols"], -stats["gols_pro"])


def _desempatar_confronto_direto(selecoes: list[dict], stats_gerais: dict, jogos_encerrados: list[dict]) -> list[dict]:
    """Reordena um cluster empatado usando uma mini-liga só com os jogos entre eles."""
    ids = {s["id"] for s in selecoes}
    stats_mini = _computar_stats(ids, jogos_encerrados)

    def chave(selecao):
        mini = stats_mini[selecao["id"]]
        ranking = selecao["ranking_fifa"] if selecao["ranking_fifa"] is not None else 9999
        return (-mini["pontos"], -mini["saldo_gols"], -mini["gols_pro"], ranking)

    return sorted(selecoes, key=chave)


def calcular_classificacao(db: sqlite3.Connection, grupo: str) -> list[dict]:
    selecoes = [
        dict(row)
        for row in db.execute(
            """
            SELECT id, nome_pt, codigo_iso, bandeira_emoji, pote, eh_cabeca_chave, ranking_fifa
            FROM selecoes
            WHERE grupo = ?
            ORDER BY pote
            """,
            (grupo,),
        ).fetchall()
    ]
    if not selecoes:
        return []

    ids = {s["id"] for s in selecoes}
    jogos_encerrados = [
        dict(row)
        for row in db.execute(
            """
            SELECT selecao_a_id, selecao_b_id, gols_a, gols_b
            FROM jogos
            WHERE grupo = ? AND fase = 'grupo' AND status = 'encerrado'
              AND gols_a IS NOT NULL AND gols_b IS NOT NULL
            """,
            (grupo,),
        ).fetchall()
    ]

    stats_gerais = _computar_stats(ids, jogos_encerrados)

    ordenados = sorted(selecoes, key=lambda s: _chave_criterios_gerais(stats_gerais[s["id"]]))

    # Reagrupa em clusters empatados nos 3 critérios gerais e desempata por confronto direto
    resultado: list[dict] = []
    i = 0
    while i < len(ordenados):
        j = i + 1
        while j < len(ordenados) and _chave_criterios_gerais(stats_gerais[ordenados[j]["id"]]) == _chave_criterios_gerais(
            stats_gerais[ordenados[i]["id"]]
        ):
            j += 1
        cluster = ordenados[i:j]
        if len(cluster) > 1:
            cluster = _desempatar_confronto_direto(cluster, stats_gerais, jogos_encerrados)
        resultado.extend(cluster)
        i = j

    total_encerrados = len(jogos_encerrados)
    grupo_completo = total_encerrados == JOGOS_POR_GRUPO

    linhas = []
    for posicao, selecao in enumerate(resultado, start=1):
        st = stats_gerais[selecao["id"]]
        if grupo_completo:
            status = "classificado" if posicao <= 2 else ("em_disputa" if posicao == 3 else "eliminado")
        else:
            status = "indefinido"
        linhas.append(
            {
                "posicao": posicao,
                "selecao": {
                    "id": selecao["id"],
                    "nome_pt": selecao["nome_pt"],
                    "codigo_iso": selecao["codigo_iso"],
                    "bandeira_emoji": selecao["bandeira_emoji"],
                    "eh_cabeca_chave": bool(selecao["eh_cabeca_chave"]),
                },
                "pontos": st["pontos"],
                "jogos": st["jogos"],
                "vitorias": st["vitorias"],
                "empates": st["empates"],
                "derrotas": st["derrotas"],
                "gols_pro": st["gols_pro"],
                "gols_contra": st["gols_contra"],
                "saldo_gols": st["saldo_gols"],
                "status": status,
            }
        )
    return linhas
