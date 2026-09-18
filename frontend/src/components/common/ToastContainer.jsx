import { useToastStore } from '../../store/useToastStore'

const CLASSES_POR_TIPO = {
  sucesso: 'border-copa-green text-copa-green',
  erro: 'border-red-500 text-red-400',
  info: 'border-copa-border text-copa-text',
}

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  const remover = useToastStore((s) => s.remover)

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => remover(toast.id)}
          className={`rounded-lg border bg-copa-card px-4 py-2 text-left text-sm shadow-lg ${CLASSES_POR_TIPO[toast.tipo]}`}
        >
          {toast.mensagem}
        </button>
      ))}
    </div>
  )
}
