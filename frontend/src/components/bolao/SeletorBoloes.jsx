import { useState } from 'react'

export default function SeletorBoloes({ boloes, bolaoAtivoId, onSelecionar, onCriar, onDuplicar, onRemover }) {
  const [criandoNome, setCriandoNome] = useState(null)

  function confirmarCriacao(e) {
    e.preventDefault()
    onCriar(criandoNome?.trim() || 'Meu Bolão')
    setCriandoNome(null)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={bolaoAtivoId ?? ''}
        onChange={(e) => onSelecionar(Number(e.target.value))}
        className="rounded-lg border border-copa-border bg-copa-card px-3 py-2 text-sm text-copa-text focus:border-copa-green focus:outline-none"
      >
        {boloes.length === 0 && <option value="">Nenhum bolão ainda</option>}
        {boloes.map((b) => (
          <option key={b.id} value={b.id}>
            {b.nome}
          </option>
        ))}
      </select>

      {bolaoAtivoId && (
        <>
          <button
            type="button"
            onClick={() => onDuplicar(bolaoAtivoId)}
            className="rounded-lg border border-copa-border px-3 py-2 text-sm text-copa-text hover:border-copa-green"
          >
            Duplicar
          </button>
          <button
            type="button"
            onClick={() => onRemover(bolaoAtivoId)}
            className="rounded-lg border border-copa-border px-3 py-2 text-sm text-red-400 hover:border-red-400"
          >
            Remover
          </button>
        </>
      )}

      {criandoNome === null ? (
        <button
          type="button"
          onClick={() => setCriandoNome('')}
          className="rounded-lg bg-copa-green px-3 py-2 text-sm font-bold text-white hover:bg-green-700"
        >
          + Novo bolão
        </button>
      ) : (
        <form onSubmit={confirmarCriacao} className="flex items-center gap-2">
          <input
            autoFocus
            type="text"
            value={criandoNome}
            onChange={(e) => setCriandoNome(e.target.value)}
            placeholder="Nome do bolão"
            className="rounded-lg border border-copa-border bg-copa-card px-3 py-2 text-sm text-copa-text focus:border-copa-green focus:outline-none"
          />
          <button type="submit" className="rounded-lg bg-copa-green px-3 py-2 text-sm font-bold text-white">
            Criar
          </button>
          <button type="button" onClick={() => setCriandoNome(null)} className="text-sm text-copa-muted underline">
            Cancelar
          </button>
        </form>
      )}
    </div>
  )
}
