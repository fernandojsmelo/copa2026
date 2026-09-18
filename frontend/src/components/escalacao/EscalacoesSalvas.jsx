export default function EscalacoesSalvas({ escalacoes, onCarregar, onRemover }) {
  if (escalacoes.length === 0) {
    return <p className="text-sm text-copa-muted">Nenhuma escalação salva ainda.</p>
  }

  return (
    <div>
      <p className="mb-2 text-xs text-copa-muted">{escalacoes.length}/10 escalações salvas</p>
      <ul className="space-y-2">
        {escalacoes.map((esc) => (
          <li
            key={esc.id}
            className="flex items-center justify-between gap-2 rounded-lg border border-copa-border bg-copa-card px-3 py-2 text-sm"
          >
            <button type="button" onClick={() => onCarregar(esc)} className="min-w-0 flex-1 text-left">
              <span className="block truncate font-medium">{esc.nome}</span>
              <span className="text-xs text-copa-muted">{esc.formacao}</span>
            </button>
            <button
              type="button"
              onClick={() => onRemover(esc.id)}
              className="shrink-0 text-xs text-red-400 hover:text-red-300"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
