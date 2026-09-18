import { useState } from 'react'
import { apiPost } from '../../utils/api'
import { useAdminStore } from '../../store/useAdminStore'
import { useToastStore } from '../../store/useToastStore'

export default function AdminLogin() {
  const [chave, setChave] = useState('')
  const [erro, setErro] = useState(null)
  const [entrando, setEntrando] = useState(false)
  const autenticar = useAdminStore((s) => s.autenticar)
  const notificar = useToastStore((s) => s.notificar)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setEntrando(true)
    try {
      await apiPost('/admin/login', { chave })
      autenticar(chave)
      notificar('Login efetuado.', 'sucesso')
    } catch {
      setErro('Senha incorreta.')
    } finally {
      setEntrando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-sm space-y-3 rounded-xl border border-copa-border bg-copa-card p-6">
      <h1 className="text-center text-xl text-copa-text">Painel Administrativo</h1>
      <input
        type="password"
        autoFocus
        value={chave}
        onChange={(e) => setChave(e.target.value)}
        placeholder="Senha de administrador"
        className="w-full rounded-lg border border-copa-border bg-copa-dark px-3 py-2 text-sm text-copa-text focus:border-copa-green focus:outline-none"
      />
      {erro && <p className="text-sm text-red-400">{erro}</p>}
      <button
        type="submit"
        disabled={entrando || !chave}
        className="w-full rounded-lg bg-copa-green px-4 py-2 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-40"
      >
        {entrando ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
