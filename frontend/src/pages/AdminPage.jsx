import { useState } from 'react'
import { useAdminStore } from '../store/useAdminStore'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import AdminLogin from '../components/admin/AdminLogin'
import AdminJogosTab from '../components/admin/AdminJogosTab'
import AdminElencoTab from '../components/admin/AdminElencoTab'

const ABAS = [
  { chave: 'jogos', label: 'Jogos' },
  { chave: 'elencos', label: 'Elencos' },
]

export default function AdminPage() {
  useDocumentTitle('Admin', undefined)

  const adminKey = useAdminStore((s) => s.adminKey)
  const sair = useAdminStore((s) => s.sair)
  const [aba, setAba] = useState('jogos')

  if (!adminKey) return <AdminLogin />

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl text-copa-text">Painel Administrativo</h1>
        <button type="button" onClick={sair} className="text-sm text-copa-muted underline hover:text-copa-text">
          Sair
        </button>
      </div>

      <div className="mb-6 flex gap-2 border-b border-copa-border">
        {ABAS.map((a) => (
          <button
            key={a.chave}
            type="button"
            onClick={() => setAba(a.chave)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              aba === a.chave ? 'border-b-2 border-copa-green text-copa-text' : 'text-copa-muted hover:text-copa-text'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {aba === 'jogos' && <AdminJogosTab />}
      {aba === 'elencos' && <AdminElencoTab />}
    </div>
  )
}
