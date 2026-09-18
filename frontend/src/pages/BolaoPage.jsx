import { useMemo, useState } from 'react'
import { useBoloes } from '../hooks/useBoloes'
import { usePalpites } from '../hooks/usePalpites'
import { useChaveamento } from '../hooks/useChaveamento'
import { useJogos } from '../hooks/useJogos'
import SeletorBoloes from '../components/bolao/SeletorBoloes'
import ProgressoBolao from '../components/bolao/ProgressoBolao'
import SimuladorGrupos from '../components/bolao/SimuladorGrupos'
import Chaveamento from '../components/bolao/Chaveamento'
import Loader from '../components/common/Loader'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const ABAS = [
  { chave: 'grupos', label: 'Fase de Grupos' },
  { chave: 'mata-mata', label: 'Mata-Mata' },
]

export default function BolaoPage() {
  useDocumentTitle('Bolão', 'Monte seu bolão da Copa do Mundo 2026: palpite os jogos e simule o chaveamento até o campeão.')

  const { boloes, loading: loadingBoloes, bolaoAtivoId, setBolaoAtivoId, criar, duplicar, remover } = useBoloes()
  const { jogos: jogosGrupo, loading: loadingJogos } = useJogos({ fase: 'grupo', perPage: 100 })
  const palpitesApi = usePalpites(bolaoAtivoId)
  const chaveamentoApi = useChaveamento(bolaoAtivoId)
  const [aba, setAba] = useState('grupos')

  const jogosPorGrupo = useMemo(() => {
    const mapa = {}
    for (const jogo of jogosGrupo) {
      ;(mapa[jogo.grupo] ??= []).push(jogo)
    }
    return mapa
  }, [jogosGrupo])

  function alterarPlacarGrupo(jogoId, golsA, golsB) {
    palpitesApi.definirPlacarJogo(jogoId, golsA, golsB, () => chaveamentoApi.recarregar())
  }

  function alterarConfrontoChave(slot, dados) {
    palpitesApi.definirPalpiteChave(slot, dados, () => chaveamentoApi.recarregar())
  }

  if (loadingBoloes) return <Loader label="Carregando bolões..." />

  return (
    <div>
      <h1 className="mb-6 text-3xl text-copa-text">Bolão — Simulador da Copa</h1>

      <SeletorBoloes
        boloes={boloes}
        bolaoAtivoId={bolaoAtivoId}
        onSelecionar={setBolaoAtivoId}
        onCriar={criar}
        onDuplicar={duplicar}
        onRemover={remover}
      />

      {!bolaoAtivoId && (
        <p className="mt-8 text-sm text-copa-muted">
          Crie um bolão acima para começar a palpitar os jogos da Copa.
        </p>
      )}

      {bolaoAtivoId && (
        <>
          <div className="mt-4">
            <ProgressoBolao progresso={chaveamentoApi.chaveamento?.progresso} status={palpitesApi.status} />
          </div>

          <div className="mt-6 flex gap-2 border-b border-copa-border">
            {ABAS.map((a) => (
              <button
                key={a.chave}
                type="button"
                onClick={() => setAba(a.chave)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  aba === a.chave ? 'border-b-2 border-copa-green text-copa-text' : 'text-copa-muted hover:text-copa-text'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {(loadingJogos || palpitesApi.loading || chaveamentoApi.loading) && !chaveamentoApi.chaveamento ? (
              <Loader label="Carregando simulação..." />
            ) : (
              <>
                {aba === 'grupos' && (
                  <SimuladorGrupos
                    jogosPorGrupo={jogosPorGrupo}
                    palpiteJogo={palpitesApi.palpiteJogo}
                    definirPlacarJogo={alterarPlacarGrupo}
                    classificacoes={chaveamentoApi.chaveamento?.grupos}
                  />
                )}
                {aba === 'mata-mata' && chaveamentoApi.chaveamento && (
                  <Chaveamento
                    mataMata={chaveamentoApi.chaveamento.mata_mata}
                    campeao={chaveamentoApi.chaveamento.campeao}
                    onAlterarConfronto={alterarConfrontoChave}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
