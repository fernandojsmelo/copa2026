import { useState } from 'react'
import { useGrupos } from '../hooks/useGrupos'
import { useJogos } from '../hooks/useJogos'
import TabelaGrupo from '../components/grupos/TabelaGrupo'
import PotesSection from '../components/grupos/PotesSection'
import Loader from '../components/common/Loader'

const GRUPOS_LETRAS = 'ABCDEFGHIJKL'.split('')

export default function GruposPage() {
  const { grupos, loading, error } = useGrupos()
  const { jogos: jogosDaFase } = useJogos({ fase: 'grupo', perPage: 100 })
  const [grupoSelecionado, setGrupoSelecionado] = useState('')

  const gruposExibidos = grupoSelecionado ? grupos.filter((g) => g.grupo === grupoSelecionado) : grupos

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl text-copa-text">Grupos</h1>
        <select
          className="rounded-lg border border-copa-border bg-copa-card px-3 py-2 text-sm text-copa-text focus:border-copa-green focus:outline-none"
          value={grupoSelecionado}
          onChange={(e) => setGrupoSelecionado(e.target.value)}
        >
          <option value="">Todos os grupos</option>
          {GRUPOS_LETRAS.map((letra) => (
            <option key={letra} value={letra}>
              Grupo {letra}
            </option>
          ))}
        </select>
      </div>

      {loading && <Loader label="Carregando grupos..." />}
      {error && <p className="text-sm text-red-400">Não foi possível carregar os grupos.</p>}

      {!loading && !error && (
        <div className={grupoSelecionado ? 'grid grid-cols-1' : 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'}>
          {gruposExibidos.map((grupo) => (
            <TabelaGrupo
              key={grupo.grupo}
              grupo={grupo.grupo}
              selecoes={grupo.selecoes}
              jogos={jogosDaFase.filter((jogo) => jogo.grupo === grupo.grupo)}
            />
          ))}
        </div>
      )}

      <div className="mt-12">
        <PotesSection />
      </div>
    </div>
  )
}
