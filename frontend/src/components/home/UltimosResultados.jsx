import { useJogos } from '../../hooks/useJogos'
import JogoCard from '../jogos/JogoCard'
import Loader from '../common/Loader'

export default function UltimosResultados() {
  const { jogos, loading, error } = useJogos({ status: 'encerrado', limit: 5 })

  return (
    <section className="py-8">
      <h2 className="mb-4 text-2xl text-copa-text">Últimos Resultados</h2>
      {loading && <Loader label="Carregando últimos resultados..." />}
      {error && <p className="text-sm text-red-400">Não foi possível carregar os últimos resultados.</p>}
      {!loading && !error && jogos.length === 0 && (
        <p className="text-sm text-copa-muted">Ainda não há jogos encerrados.</p>
      )}
      {!loading && !error && jogos.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {jogos.map((jogo) => (
            <JogoCard key={jogo.id} jogo={jogo} />
          ))}
        </div>
      )}
    </section>
  )
}
