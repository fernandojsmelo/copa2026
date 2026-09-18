import JogoPalpiteCard from './JogoPalpiteCard'
import ClassificacaoLive from './ClassificacaoLive'

const GRUPOS = 'ABCDEFGHIJKL'.split('')

export default function SimuladorGrupos({ jogosPorGrupo, palpiteJogo, definirPlacarJogo, classificacoes }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {GRUPOS.map((grupo) => (
        <div key={grupo} className="space-y-3">
          {classificacoes?.[grupo] && <ClassificacaoLive grupo={grupo} linhas={classificacoes[grupo]} />}
          <div className="space-y-2">
            {(jogosPorGrupo[grupo] ?? []).map((jogo) => (
              <JogoPalpiteCard
                key={jogo.id}
                jogo={jogo}
                palpite={palpiteJogo(jogo.id)}
                onAlterar={(golsA, golsB) => definirPlacarJogo(jogo.id, golsA, golsB)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
