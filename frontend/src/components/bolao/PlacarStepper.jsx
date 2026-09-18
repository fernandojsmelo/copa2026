export default function PlacarStepper({ valor, onChange, tamanho = 'normal' }) {
  const classesBotao =
    tamanho === 'pequeno'
      ? 'h-6 w-6 text-xs'
      : 'h-8 w-8 text-sm'

  function alterar(delta) {
    const novo = Math.min(20, Math.max(0, valor + delta))
    if (novo !== valor) onChange(novo)
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => alterar(-1)}
        disabled={valor <= 0}
        className={`${classesBotao} rounded-full border border-copa-border text-copa-text hover:border-copa-green disabled:opacity-30`}
      >
        −
      </button>
      <span className="font-mono-score w-5 text-center text-lg text-copa-text">{valor}</span>
      <button
        type="button"
        onClick={() => alterar(1)}
        disabled={valor >= 20}
        className={`${classesBotao} rounded-full border border-copa-border text-copa-text hover:border-copa-green disabled:opacity-30`}
      >
        +
      </button>
    </div>
  )
}
