import { useState } from 'react'
import { useJogos } from '../../hooks/useJogos'
import { apiPatch } from '../../utils/api'
import { useAdminStore } from '../../store/useAdminStore'
import { useToastStore } from '../../store/useToastStore'
import { STATUS_LABEL } from '../../utils/jogos'
import Loader from '../common/Loader'

const STATUS_ORDEM = ['agendado', 'em_andamento', 'encerrado']

export default function AdminJogosTab() {
  const { jogos, loading, error } = useJogos({ fase: 'grupo', perPage: 100 })
  const adminKey = useAdminStore((s) => s.adminKey)
  const notificar = useToastStore((s) => s.notificar)
  const [valores, setValores] = useState({})
  const [salvandoId, setSalvandoId] = useState(null)

  function valorDe(jogo, campo) {
    return valores[jogo.id]?.[campo] ?? jogo[campo] ?? (campo.startsWith('gols') ? 0 : jogo.status)
  }

  function alterar(jogoId, campo, valor) {
    setValores((atuais) => ({ ...atuais, [jogoId]: { ...atuais[jogoId], [campo]: valor } }))
  }

  async function salvar(jogo) {
    setSalvandoId(jogo.id)
    try {
      await apiPatch(
        `/admin/jogos/${jogo.id}`,
        {
          gols_a: Number(valorDe(jogo, 'gols_a')),
          gols_b: Number(valorDe(jogo, 'gols_b')),
          status: valorDe(jogo, 'status'),
        },
        { 'X-Admin-Key': adminKey },
      )
      notificar(`Placar de ${jogo.selecao_a.nome_pt} x ${jogo.selecao_b.nome_pt} atualizado.`, 'sucesso')
    } catch (err) {
      notificar(err.message, 'erro')
    } finally {
      setSalvandoId(null)
    }
  }

  if (loading) return <Loader label="Carregando jogos..." />
  if (error) return <p className="text-sm text-red-400">Não foi possível carregar os jogos.</p>

  return (
    <div className="overflow-x-auto rounded-xl border border-copa-border bg-copa-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-copa-border text-left text-xs text-copa-muted">
            <th className="px-3 py-2">Jogo</th>
            <th className="px-3 py-2">Placar</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {jogos.map((jogo) => (
            <tr key={jogo.id} className="border-b border-copa-border/50 last:border-0">
              <td className="px-3 py-2">
                {jogo.selecao_a.bandeira_emoji} {jogo.selecao_a.nome_pt} x {jogo.selecao_b.nome_pt}{' '}
                {jogo.selecao_b.bandeira_emoji}
              </td>
              <td className="px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0}
                    value={valorDe(jogo, 'gols_a')}
                    onChange={(e) => alterar(jogo.id, 'gols_a', e.target.value)}
                    className="w-12 rounded border border-copa-border bg-copa-dark px-1.5 py-1 text-center"
                  />
                  <span>x</span>
                  <input
                    type="number"
                    min={0}
                    value={valorDe(jogo, 'gols_b')}
                    onChange={(e) => alterar(jogo.id, 'gols_b', e.target.value)}
                    className="w-12 rounded border border-copa-border bg-copa-dark px-1.5 py-1 text-center"
                  />
                </div>
              </td>
              <td className="px-3 py-2">
                <select
                  value={valorDe(jogo, 'status')}
                  onChange={(e) => alterar(jogo.id, 'status', e.target.value)}
                  className="rounded border border-copa-border bg-copa-dark px-2 py-1 text-xs"
                >
                  {STATUS_ORDEM.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2">
                <button
                  type="button"
                  onClick={() => salvar(jogo)}
                  disabled={salvandoId === jogo.id}
                  className="rounded bg-copa-green px-3 py-1 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-40"
                >
                  Salvar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
