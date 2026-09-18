import { FORMACOES } from '../../utils/formacoes'
import JogadorSlot from './JogadorSlot'

export default function CampoFutebol({
  formacao,
  titulares,
  jogadoresPorId,
  slotSelecionado,
  onSlotClick,
  onSlotDrop,
}) {
  const slots = FORMACOES[formacao]

  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-xl border border-copa-border bg-copa-green/20">
      <svg viewBox="0 0 100 150" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <rect x="0" y="0" width="100" height="150" fill="none" />
        <g stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" fill="none">
          <rect x="2" y="2" width="96" height="146" />
          <line x1="2" y1="75" x2="98" y2="75" />
          <circle cx="50" cy="75" r="12" />
          <circle cx="50" cy="75" r="0.8" fill="rgba(255,255,255,0.35)" />
          <rect x="20" y="2" width="60" height="18" />
          <rect x="35" y="2" width="30" height="7" />
          <rect x="20" y="130" width="60" height="18" />
          <rect x="35" y="141" width="30" height="7" />
        </g>
      </svg>

      {slots.map((slot) => {
        const jogadorId = titulares[slot.id]
        return (
          <JogadorSlot
            key={slot.id}
            slot={slot}
            jogador={jogadorId ? jogadoresPorId[jogadorId] : null}
            selecionado={slotSelecionado === slot.id}
            onClick={() => onSlotClick(slot.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const jogadorArrastado = e.dataTransfer.getData('text/plain')
              if (jogadorArrastado) onSlotDrop(slot.id, Number(jogadorArrastado))
            }}
          />
        )
      })}
    </div>
  )
}
