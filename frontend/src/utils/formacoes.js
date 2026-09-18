// Posições em percentual (x, y) sobre o campo, com o goleiro perto da base (y alto)
// e o ataque perto do topo (y baixo). Slot ids são estáveis por tipo+índice para
// preservar jogadores alocados ao trocar de formação quando o novo esquema
// também tem aquele slot (ex: DEF-0 continua DEF-0 em qualquer formação com defesa).

function linha(tipo, ys, xs) {
  return xs.map((x, i) => ({ id: `${tipo}-${i}`, tipo, x, y: ys }))
}

export const FORMACOES = {
  '4-3-3': [
    ...linha('GK', 92, [50]),
    ...linha('DEF', 72, [15, 38, 62, 85]),
    ...linha('MID', 48, [25, 50, 75]),
    ...linha('FWD', 18, [20, 50, 80]),
  ],
  '4-4-2': [
    ...linha('GK', 92, [50]),
    ...linha('DEF', 72, [15, 38, 62, 85]),
    ...linha('MID', 48, [15, 38, 62, 85]),
    ...linha('FWD', 18, [35, 65]),
  ],
  '4-2-3-1': [
    ...linha('GK', 92, [50]),
    ...linha('DEF', 75, [15, 38, 62, 85]),
    ...linha('MID', 55, [35, 65]),
    ...linha('MEIA', 35, [20, 50, 80]),
    ...linha('FWD', 12, [50]),
  ],
  '3-5-2': [
    ...linha('GK', 92, [50]),
    ...linha('DEF', 75, [25, 50, 75]),
    ...linha('MID', 48, [10, 30, 50, 70, 90]),
    ...linha('FWD', 18, [35, 65]),
  ],
  '5-3-2': [
    ...linha('GK', 92, [50]),
    ...linha('DEF', 78, [8, 28, 50, 72, 92]),
    ...linha('MID', 48, [25, 50, 75]),
    ...linha('FWD', 18, [35, 65]),
  ],
  '4-1-4-1': [
    ...linha('GK', 92, [50]),
    ...linha('DEF', 78, [15, 38, 62, 85]),
    ...linha('VOL', 58, [50]),
    ...linha('MID', 38, [15, 38, 62, 85]),
    ...linha('FWD', 12, [50]),
  ],
  '3-4-3': [
    ...linha('GK', 92, [50]),
    ...linha('DEF', 75, [25, 50, 75]),
    ...linha('MID', 48, [15, 38, 62, 85]),
    ...linha('FWD', 18, [20, 50, 80]),
  ],
}

export const NOMES_FORMACOES = Object.keys(FORMACOES)

// Ao trocar de formação, tenta manter o jogador de cada slot antigo cujo id
// (tipo-índice) também existe na formação nova; quem não tem slot correspondente
// some dos titulares e volta ao banco automaticamente (é derivado, não guardado).
export function migrarTitulares(titularesAntigos, formacaoNova) {
  const idsNovos = new Set(FORMACOES[formacaoNova].map((s) => s.id))
  const titularesMigrados = {}
  for (const [slotId, jogadorId] of Object.entries(titularesAntigos)) {
    if (idsNovos.has(slotId)) titularesMigrados[slotId] = jogadorId
  }
  return titularesMigrados
}
