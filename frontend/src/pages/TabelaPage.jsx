import { useMemo, useState } from 'react'
import { useJogos } from '../hooks/useJogos'
import { toDataLongaBrasilia } from '../utils/formatDate'
import FiltrosJogos from '../components/jogos/FiltrosJogos'
import JogoCard from '../components/jogos/JogoCard'
import JogoCardSkeleton from '../components/jogos/JogoCardSkeleton'

const PER_PAGE = 20

function agruparPorData(jogos) {
  const grupos = []
  for (const jogo of jogos) {
    const chave = toDataLongaBrasilia(jogo.data_hora_utc)
    const grupoAtual = grupos.at(-1)
    if (grupoAtual?.chave === chave) {
      grupoAtual.jogos.push(jogo)
    } else {
      grupos.push({ chave, jogos: [jogo] })
    }
  }
  return grupos
}

export default function TabelaPage() {
  const [filtros, setFiltros] = useState({})
  const [page, setPage] = useState(1)

  const { jogos, total, loading, error } = useJogos({ ...filtros, page, perPage: PER_PAGE })
  const gruposPorData = useMemo(() => agruparPorData(jogos), [jogos])
  const totalPaginas = Math.max(1, Math.ceil(total / PER_PAGE))

  function handleFiltroChange(novosFiltros) {
    setFiltros(novosFiltros)
    setPage(1)
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl text-copa-text">Tabela de Jogos</h1>

      <FiltrosJogos filtros={filtros} onChange={handleFiltroChange} />

      <div className="mt-8">
        {loading && (
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <JogoCardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && <p className="text-sm text-red-400">Não foi possível carregar os jogos.</p>}

        {!loading && !error && jogos.length === 0 && (
          <p className="text-sm text-copa-muted">Nenhum jogo encontrado para esse filtro.</p>
        )}

        {!loading &&
          !error &&
          gruposPorData.map((grupo) => (
            <section key={grupo.chave} className="mb-8">
              <h2 className="mb-3 text-lg text-copa-gold">{grupo.chave}</h2>
              <div className="flex flex-wrap gap-4">
                {grupo.jogos.map((jogo) => (
                  <JogoCard key={jogo.id} jogo={jogo} />
                ))}
              </div>
            </section>
          ))}

        {!loading && !error && total > PER_PAGE && (
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-copa-border px-4 py-2 text-sm text-copa-text disabled:opacity-40"
            >
              Anterior
            </button>
            <span className="text-sm text-copa-muted">
              Página {page} de {totalPaginas}
            </span>
            <button
              type="button"
              disabled={page >= totalPaginas}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-copa-border px-4 py-2 text-sm text-copa-text disabled:opacity-40"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
