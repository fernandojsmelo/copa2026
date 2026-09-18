import { useEffect, useState } from 'react'

const TARGET = new Date('2026-06-11T20:00:00Z') // 17h de Brasília (UTC-3)

function calcularRestante() {
  const diffMs = TARGET.getTime() - Date.now()
  if (diffMs <= 0) return null

  const segundosTotais = Math.floor(diffMs / 1000)
  return {
    dias: Math.floor(segundosTotais / 86400),
    horas: Math.floor((segundosTotais % 86400) / 3600),
    minutos: Math.floor((segundosTotais % 3600) / 60),
    segundos: segundosTotais % 60,
  }
}

const UNIDADES = [
  { chave: 'dias', label: 'Dias' },
  { chave: 'horas', label: 'Horas' },
  { chave: 'minutos', label: 'Min' },
  { chave: 'segundos', label: 'Seg' },
]

export default function Countdown() {
  const [restante, setRestante] = useState(calcularRestante)

  useEffect(() => {
    const intervalo = setInterval(() => setRestante(calcularRestante()), 1000)
    return () => clearInterval(intervalo)
  }, [])

  if (!restante) {
    return <p className="font-display text-3xl text-copa-green">A Copa começou!</p>
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-6" role="timer" aria-live="polite">
      {UNIDADES.map(({ chave, label }) => (
        <div
          key={chave}
          className="flex w-16 flex-col items-center rounded-lg border border-copa-border bg-copa-card py-3 sm:w-24"
        >
          <span className="font-mono-score text-2xl font-bold text-copa-gold sm:text-4xl">
            {String(restante[chave]).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-copa-muted sm:text-xs">{label}</span>
        </div>
      ))}
    </div>
  )
}
