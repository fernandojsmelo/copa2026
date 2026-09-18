export default function JogoCardSkeleton() {
  return (
    <div className="flex min-w-[260px] flex-col gap-3 rounded-xl border border-copa-border bg-copa-card p-4">
      <div className="h-3 w-24 animate-pulse rounded bg-copa-border" />
      <div className="flex items-center gap-3">
        <div className="h-4 flex-1 animate-pulse rounded bg-copa-border" />
        <div className="h-4 w-8 animate-pulse rounded bg-copa-border" />
        <div className="h-4 flex-1 animate-pulse rounded bg-copa-border" />
      </div>
      <div className="h-3 w-32 animate-pulse rounded bg-copa-border" />
    </div>
  )
}
