export default function TabelaGrupoSkeleton() {
  return (
    <div className="rounded-xl border border-copa-border bg-copa-card p-4">
      <div className="mb-3 h-5 w-24 animate-pulse rounded bg-copa-border" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 w-full animate-pulse rounded bg-copa-border" />
        ))}
      </div>
    </div>
  )
}
