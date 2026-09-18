const STATUS_LABEL = {
  idle: null,
  salvando: 'Salvando...',
  salvo: 'Salvo',
}

export default function ProgressoBolao({ progresso, status }) {
  if (!progresso) return null

  const total = progresso.total_grupo + progresso.total_mata_mata
  const preenchidos = progresso.palpites_grupo + progresso.palpites_mata_mata
  const percentual = Math.round((preenchidos / total) * 100)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="h-2 w-40 overflow-hidden rounded-full bg-copa-border">
        <div className="h-full bg-copa-green transition-all" style={{ width: `${percentual}%` }} />
      </div>
      <span className="text-xs text-copa-muted">
        {preenchidos} de {total} palpites preenchidos
      </span>
      {STATUS_LABEL[status] && <span className="text-xs text-copa-green">{STATUS_LABEL[status]}</span>}
    </div>
  )
}
