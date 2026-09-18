import { Link, useParams } from 'react-router-dom'
import { useSelecao } from '../hooks/useSelecao'
import { useSelecoes } from '../hooks/useSelecoes'
import { useJogos } from '../hooks/useJogos'
import { useGrupos } from '../hooks/useGrupos'
import PerfilSelecao from '../components/selecoes/PerfilSelecao'
import TabelaElenco from '../components/selecoes/TabelaElenco'
import Loader from '../components/common/Loader'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function SelecaoDetalhePage() {
  const { id } = useParams()
  const selecaoId = Number(id)

  const { selecao, loading, error } = useSelecao(selecaoId)
  useDocumentTitle(
    selecao?.nome_pt ?? 'Seleção',
    selecao ? `Elenco e informações da seleção ${selecao.nome_pt} na Copa do Mundo 2026.` : undefined,
  )
  const { selecoes } = useSelecoes()
  const { jogos } = useJogos({ selecaoId, perPage: 10 })
  const { grupos } = useGrupos()

  if (loading) return <Loader label="Carregando seleção..." />
  if (error || !selecao) {
    return (
      <div className="py-16 text-center">
        <p className="text-copa-muted">Seleção não encontrada.</p>
        <Link to="/elencos" className="mt-4 inline-block text-copa-green underline">
          Voltar para elencos
        </Link>
      </div>
    )
  }

  const indiceAtual = selecoes.findIndex((s) => s.id === selecaoId)
  const anterior = indiceAtual > 0 ? selecoes[indiceAtual - 1] : null
  const proxima = indiceAtual >= 0 && indiceAtual < selecoes.length - 1 ? selecoes[indiceAtual + 1] : null

  const classificacaoGrupo = grupos
    .find((g) => g.grupo === selecao.grupo)
    ?.selecoes.find((linha) => linha.selecao.id === selecaoId)

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link to="/elencos" className="text-copa-muted hover:text-copa-text">
          ← Todas as seleções
        </Link>
        <div className="flex gap-4">
          {anterior && (
            <Link to={`/elencos/${anterior.id}`} className="text-copa-muted hover:text-copa-text">
              ← {anterior.nome_pt}
            </Link>
          )}
          {proxima && (
            <Link to={`/elencos/${proxima.id}`} className="text-copa-muted hover:text-copa-text">
              {proxima.nome_pt} →
            </Link>
          )}
        </div>
      </div>

      <PerfilSelecao selecao={selecao} jogos={jogos} classificacaoGrupo={classificacaoGrupo} />

      <div className="mt-10">
        <h2 className="mb-4 text-xl text-copa-text">Elenco</h2>
        <TabelaElenco selecaoId={selecaoId} />
      </div>
    </div>
  )
}
