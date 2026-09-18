import { useJogos } from '../../hooks/useJogos'
import JogoCard from '../jogos/JogoCard'
import Loader from '../common/Loader'

export default function ProximosJogos() {
  const { jogos, loading, error } = useJogos({ status: 'agendado', limit: 5 })

  return (
    <section className="py-8">
      <h2 className="mb-4 text-2xl text-copa-text">Próximos Jogos</h2>
      {loading && <Loader label="Carregando próximos jogos..." />}
      {error && <p className="text-sm text-red-400">Não foi possível carregar os próximos jogos.</p>}
      {!loading && !error && jogos.length === 0 && (
        <p className="text-sm text-copa-muted">Nenhum jogo agendado no momento.</p>
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
