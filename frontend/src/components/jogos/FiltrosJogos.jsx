import { FASE_LABEL } from '../../utils/jogos'
import { useSelecoes } from '../../hooks/useSelecoes'

const GRUPOS = 'ABCDEFGHIJKL'.split('')

const selectClasses =
  'rounded-lg border border-copa-border bg-copa-card px-3 py-2 text-sm text-copa-text focus:border-copa-green focus:outline-none'

export default function FiltrosJogos({ filtros, onChange }) {
  const { selecoes } = useSelecoes()

  function atualizar(campo, valor) {
    onChange({ ...filtros, [campo]: valor || undefined })
  }

  return (
    <div className="flex flex-wrap gap-3">
      <select
        className={selectClasses}
        value={filtros.fase ?? ''}
        onChange={(e) => atualizar('fase', e.target.value)}
      >
        <option value="">Todas as fases</option>
        {Object.entries(FASE_LABEL).map(([valor, label]) => (
          <option key={valor} value={valor}>
            {label}
          </option>
        ))}
      </select>

      <select
        className={selectClasses}
        value={filtros.grupo ?? ''}
        onChange={(e) => atualizar('grupo', e.target.value)}
      >
        <option value="">Todos os grupos</option>
        {GRUPOS.map((letra) => (
          <option key={letra} value={letra}>
            Grupo {letra}
          </option>
        ))}
      </select>

      <select
        className={selectClasses}
        value={filtros.selecaoId ?? ''}
        onChange={(e) => atualizar('selecaoId', e.target.value)}
      >
        <option value="">Todas as seleções</option>
        {selecoes.map((selecao) => (
          <option key={selecao.id} value={selecao.id}>
            {selecao.bandeira_emoji} {selecao.nome_pt}
          </option>
        ))}
      </select>

      <input
        type="date"
        className={selectClasses}
        value={filtros.data ?? ''}
        onChange={(e) => atualizar('data', e.target.value)}
      />

      {(filtros.fase || filtros.grupo || filtros.selecaoId || filtros.data) && (
        <button
          type="button"
          onClick={() => onChange({})}
          className="rounded-lg px-3 py-2 text-sm text-copa-muted underline hover:text-copa-text"
        >
          Limpar filtros
        </button>
      )}
    </div>
  )
}
