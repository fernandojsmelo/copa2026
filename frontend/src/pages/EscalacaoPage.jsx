import { useMemo, useRef, useState } from 'react'
import { useSelecoes } from '../hooks/useSelecoes'
import { useJogadores } from '../hooks/useJogadores'
import { useEscalacoes } from '../hooks/useEscalacoes'
import { FORMACOES, migrarTitulares } from '../utils/formacoes'
import CampoFutebol from '../components/escalacao/CampoFutebol'
import FormacaoSelector from '../components/escalacao/FormacaoSelector'
import ListaConvocados from '../components/escalacao/ListaConvocados'
import EscalacoesSalvas from '../components/escalacao/EscalacoesSalvas'
import Loader from '../components/common/Loader'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function EscalacaoPage() {
  useDocumentTitle('Escalação da Seleção Brasileira', 'Monte a escalação da Seleção Brasileira com drag & drop e salve suas formações.')

  const { selecoes, loading: loadingSelecoes } = useSelecoes()
  const brasilId = selecoes.find((s) => s.nome_pt === 'Brasil')?.id
  const { jogadores, loading: loadingJogadores } = useJogadores(brasilId)
  const { escalacoes, loading: loadingEscalacoes, salvar, atualizar, remover } = useEscalacoes()

  const [formacao, setFormacao] = useState('4-3-3')
  const [titulares, setTitulares] = useState({})
  const [jogadorSelecionado, setJogadorSelecionado] = useState(null)
  const [nomeEscalacao, setNomeEscalacao] = useState('Minha Escalação')
  const [editandoId, setEditandoId] = useState(null)
  const [mensagem, setMensagem] = useState(null)
  const [exportando, setExportando] = useState(false)
  const campoRef = useRef(null)

  const jogadoresPorId = useMemo(() => Object.fromEntries(jogadores.map((j) => [j.id, j])), [jogadores])
  const titularesIds = useMemo(() => new Set(Object.values(titulares)), [titulares])
  const slotDoJogadorSelecionado = useMemo(() => {
    if (jogadorSelecionado == null) return null
    const entrada = Object.entries(titulares).find(([, id]) => id === jogadorSelecionado)
    return entrada?.[0] ?? null
  }, [jogadorSelecionado, titulares])
  const totalSlots = FORMACOES[formacao].length
  const totalPreenchidos = Object.keys(titulares).length
  const completo = totalPreenchidos === totalSlots

  function atribuirJogador(slotId, jogadorId) {
    setTitulares((atuais) => {
      const novo = {}
      for (const [slot, id] of Object.entries(atuais)) {
        if (id !== jogadorId) novo[slot] = id
      }
      novo[slotId] = jogadorId
      return novo
    })
    setJogadorSelecionado(null)
  }

  function handleSlotClick(slotId) {
    if (jogadorSelecionado != null) {
      atribuirJogador(slotId, jogadorSelecionado)
      return
    }
    const ocupante = titulares[slotId]
    if (ocupante) setJogadorSelecionado(ocupante)
  }

  function handleSelecionarConvocado(jogadorId) {
    setJogadorSelecionado((atual) => (atual === jogadorId ? null : jogadorId))
  }

  function handleFormacaoChange(novaFormacao) {
    setTitulares((atuais) => migrarTitulares(atuais, novaFormacao))
    setFormacao(novaFormacao)
  }

  function handleNovaEscalacao() {
    setFormacao('4-3-3')
    setTitulares({})
    setJogadorSelecionado(null)
    setEditandoId(null)
    setNomeEscalacao('Minha Escalação')
    setMensagem(null)
  }

  function handleCarregar(escalacao) {
    setFormacao(escalacao.formacao)
    setTitulares(Object.fromEntries(escalacao.titulares.map((t) => [t.slot, t.jogador_id])))
    setEditandoId(escalacao.id)
    setNomeEscalacao(escalacao.nome)
    setJogadorSelecionado(null)
    setMensagem(null)
  }

  async function handleRemover(id) {
    await remover(id)
    if (editandoId === id) handleNovaEscalacao()
  }

  async function handleSalvar(e) {
    e.preventDefault()
    setMensagem(null)
    const payload = {
      nome: nomeEscalacao || 'Minha Escalação',
      formacao,
      titulares: Object.entries(titulares).map(([slot, jogador_id]) => ({ slot, jogador_id })),
      reservas: jogadores.filter((j) => !titularesIds.has(j.id)).map((j) => j.id),
    }
    try {
      if (editandoId) {
        await atualizar(editandoId, payload)
      } else {
        const nova = await salvar(payload)
        setEditandoId(nova.id)
      }
      setMensagem({ tipo: 'ok', texto: 'Escalação salva!' })
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: err.message })
    }
  }

  async function handleExportarImagem() {
    setExportando(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(campoRef.current, { backgroundColor: '#0A0A0A' })
      const link = document.createElement('a')
      link.download = `escalacao-${formacao}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setExportando(false)
    }
  }

  if (loadingSelecoes || loadingJogadores) return <Loader label="Carregando elenco da Seleção..." />

  return (
    <div>
      <h1 className="mb-6 text-3xl text-copa-text">Escalação da Seleção Brasileira</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_280px]">
        <div className="order-2 lg:order-1">
          <ListaConvocados
            jogadores={jogadores}
            titularesIds={titularesIds}
            jogadorSelecionadoId={jogadorSelecionado}
            onSelecionarJogador={handleSelecionarConvocado}
          />
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <FormacaoSelector formacao={formacao} onChange={handleFormacaoChange} />
            <p className="text-sm text-copa-muted">{totalPreenchidos}/{totalSlots} titulares definidos</p>
          </div>

          <p className="mb-3 text-center text-xs text-copa-muted">
            Toque em um convocado e depois em uma posição do campo para escalar — ou arraste, no desktop.
          </p>

          <div ref={campoRef} className="bg-copa-dark p-2">
            <CampoFutebol
              formacao={formacao}
              titulares={titulares}
              jogadoresPorId={jogadoresPorId}
              slotSelecionado={slotDoJogadorSelecionado}
              onSlotClick={handleSlotClick}
              onSlotDrop={atribuirJogador}
            />
          </div>

          <form onSubmit={handleSalvar} className="mt-5 flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={nomeEscalacao}
              onChange={(e) => setNomeEscalacao(e.target.value)}
              placeholder="Nome da escalação"
              className="flex-1 rounded-lg border border-copa-border bg-copa-card px-3 py-2 text-sm text-copa-text focus:border-copa-green focus:outline-none"
            />
            <button
              type="submit"
              disabled={!completo}
              className="rounded-lg bg-copa-green px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {editandoId ? 'Atualizar Escalação' : 'Salvar Escalação'}
            </button>
            <button
              type="button"
              onClick={handleExportarImagem}
              disabled={exportando}
              className="rounded-lg border border-copa-border px-4 py-2 text-sm text-copa-text hover:border-copa-green disabled:opacity-40"
            >
              {exportando ? 'Exportando...' : 'Exportar como imagem'}
            </button>
            {editandoId && (
              <button type="button" onClick={handleNovaEscalacao} className="text-sm text-copa-muted underline">
                Nova escalação
              </button>
            )}
          </form>

          {mensagem && (
            <p className={`mt-2 text-sm ${mensagem.tipo === 'ok' ? 'text-copa-green' : 'text-red-400'}`}>
              {mensagem.texto}
            </p>
          )}
        </div>

        <div className="order-3">
          <h3 className="mb-3 text-lg text-copa-text">Escalações Salvas</h3>
          {loadingEscalacoes ? (
            <Loader label="Carregando..." />
          ) : (
            <EscalacoesSalvas escalacoes={escalacoes} onCarregar={handleCarregar} onRemover={handleRemover} />
          )}
        </div>
      </div>
    </div>
  )
}
