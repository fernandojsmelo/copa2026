import { useEffect, useRef, useState } from 'react'

const DURACAO_MS = 1200

export default function StatCounter({ valor, label }) {
  const [contagem, setContagem] = useState(0)
  const ref = useRef(null)
  const jaAnimou = useRef(false)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || jaAnimou.current) return
        jaAnimou.current = true

        const inicio = performance.now()
        function passo(agora) {
          const progresso = Math.min((agora - inicio) / DURACAO_MS, 1)
          setContagem(Math.round(progresso * valor))
          if (progresso < 1) requestAnimationFrame(passo)
        }
        requestAnimationFrame(passo)
      },
      { threshold: 0.4 },
    )

    observer.observe(elemento)
    return () => observer.disconnect()
  }, [valor])

  return (
    <div ref={ref} className="rounded-xl border border-copa-border bg-copa-card px-4 py-6 text-center">
      <p className="font-mono-score text-4xl font-bold text-copa-green">{contagem}</p>
      <p className="mt-1 text-sm text-copa-muted">{label}</p>
    </div>
  )
}
