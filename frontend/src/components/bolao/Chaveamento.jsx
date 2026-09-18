import ConfrontoChave from './ConfrontoChave'

const RODADAS = [
  { chave: 'oitavas', label: 'Oitavas de Final' },
  { chave: 'quartas', label: 'Quartas de Final' },
  { chave: 'semi1', label: 'Quartas → Semi' },
  { chave: 'semi2', label: 'Semifinal' },
]

export default function Chaveamento({ mataMata, campeao, onAlterarConfronto }) {
  return (
    <div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {RODADAS.map(({ chave, label }) => (
          <div key={chave} className="w-64 shrink-0 space-y-3">
            <h3 className="text-center text-sm font-medium text-copa-gold">{label}</h3>
            {mataMata[chave].map((confronto, i) => (
              <ConfrontoChave
                key={i}
                slot={`${chave}-${i + 1}`}
                confronto={confronto}
                onAlterar={onAlterarConfronto}
              />
            ))}
          </div>
        ))}

        <div className="w-64 shrink-0 space-y-6">
          <div>
            <h3 className="mb-3 text-center text-sm font-medium text-copa-gold">Final</h3>
            <ConfrontoChave slot="final" confronto={mataMata.final} onAlterar={onAlterarConfronto} />
          </div>
          <div>
            <h3 className="mb-3 text-center text-sm font-medium text-copa-gold">Disputa de 3º Lugar</h3>
            <ConfrontoChave slot="terceiro" confronto={mataMata.terceiro} onAlterar={onAlterarConfronto} />
          </div>
        </div>
      </div>

      {campeao && (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-2xl border border-copa-gold bg-copa-gold/10 py-8">
          <span className="text-3xl">🏆</span>
          <span className="text-5xl">{campeao.bandeira_emoji}</span>
          <p className="font-display text-2xl text-copa-gold">{campeao.nome_pt} campeão!</p>
        </div>
      )}
    </div>
  )
}
