import { NOMES_FORMACOES } from '../../utils/formacoes'

export default function FormacaoSelector({ formacao, onChange }) {
  return (
    <select
      value={formacao}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-copa-border bg-copa-card px-3 py-2 text-sm text-copa-text focus:border-copa-green focus:outline-none"
    >
      {NOMES_FORMACOES.map((nome) => (
        <option key={nome} value={nome}>
          {nome}
        </option>
      ))}
    </select>
  )
}
