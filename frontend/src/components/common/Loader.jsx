export default function Loader({ label = 'Carregando...' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-copa-muted" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-copa-border border-t-copa-green" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
