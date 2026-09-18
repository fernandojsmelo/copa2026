export default function JogadorSlot({ slot, jogador, selecionado, onClick, onDragOver, onDrop }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
    >
      {jogador ? (
        <>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold text-white shadow-lg sm:h-11 sm:w-11 sm:text-sm ${
              selecionado ? 'border-copa-gold bg-copa-green ring-2 ring-copa-gold' : 'border-white/70 bg-copa-green'
            }`}
          >
            {jogador.numero ?? '—'}
          </span>
          <span className="max-w-[64px] truncate rounded bg-black/70 px-1 text-[10px] text-white sm:max-w-[80px] sm:text-xs">
            {jogador.nome_curto || jogador.nome}
          </span>
        </>
      ) : (
        <span
          className={`h-9 w-9 animate-pulse rounded-full border-2 border-dashed sm:h-11 sm:w-11 ${
            selecionado ? 'border-copa-gold bg-copa-gold/20' : 'border-white/40 bg-white/5'
          }`}
        />
      )}
    </button>
  )
}
