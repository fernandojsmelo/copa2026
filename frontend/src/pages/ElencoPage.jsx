import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelecoes } from '../hooks/useSelecoes'
import Loader from '../components/common/Loader'

const GRUPOS = 'ABCDEFGHIJKL'.split('')

const selectClasses =
  'rounded-lg border border-copa-border bg-copa-card px-3 py-2 text-sm text-copa-text focus:border-copa-green focus:outline-none'

export default function ElencoPage() {
  const { selecoes, loading } = useSelecoes()
  const [busca, setBusca] = useState('')
  const [grupo, setGrupo] = useState('')
  const [confederacao, setConfederacao] = useState('')

  const confederacoes = useMemo(
    () => [...new Set(selecoes.map((s) => s.confederacao))].sort(),
    [selecoes],
  )

  const filtradas = useMemo(() => {
    const buscaNormalizada = busca.trim().toLowerCase()
    return selecoes.filter((s) => {
      if (grupo && s.grupo !== grupo) return false
      if (confederacao && s.confederacao !== confederacao) return false
      if (buscaNormalizada && !s.nome_pt.toLowerCase().includes(buscaNormalizada)) return false
      return true
    })
  }, [selecoes, busca, grupo, confederacao])

  return (
    <div>
      <h1 className="mb-6 text-3xl text-copa-text">Elencos</h1>

      <div className="mb-8 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Buscar seleção..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={`${selectClasses} min-w-[200px] flex-1`}
        />
        <select className={selectClasses} value={grupo} onChange={(e) => setGrupo(e.target.value)}>
          <option value="">Todos os grupos</option>
          {GRUPOS.map((letra) => (
            <option key={letra} value={letra}>
              Grupo {letra}
            </option>
          ))}
        </select>
        <select
          className={selectClasses}
          value={confederacao}
          onChange={(e) => setConfederacao(e.target.value)}
        >
          <option value="">Todas as confederações</option>
          {confederacoes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading && <Loader label="Carregando seleções..." />}

      {!loading && filtradas.length === 0 && (
        <p className="text-sm text-copa-muted">Nenhuma seleção encontrada.</p>
      )}

      {!loading && filtradas.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtradas.map((selecao) => (
            <Link
              key={selecao.id}
              to={`/elencos/${selecao.id}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-copa-border bg-copa-card p-4 text-center transition-colors hover:border-copa-green"
            >
              <span className="text-4xl">{selecao.bandeira_emoji}</span>
              <span className="text-sm font-medium">{selecao.nome_pt}</span>
              <span className="text-xs text-copa-muted">Grupo {selecao.grupo}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
