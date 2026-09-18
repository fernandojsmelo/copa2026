import { useState } from 'react'
import { useSelecoes } from '../../hooks/useSelecoes'
import { useJogadores } from '../../hooks/useJogadores'
import { apiDelete, apiPost, apiPut } from '../../utils/api'
import { useAdminStore } from '../../store/useAdminStore'
import { useToastStore } from '../../store/useToastStore'
import Loader from '../common/Loader'

const POSICOES = ['GK', 'DEF', 'MID', 'FWD']

const inputClasses = 'rounded border border-copa-border bg-copa-dark px-2 py-1 text-xs'

function NovoJogadorForm({ selecaoId, onCriado }) {
  const adminKey = useAdminStore((s) => s.adminKey)
  const notificar = useToastStore((s) => s.notificar)
  const [form, setForm] = useState({ numero: '', nome: '', posicao: 'MID', clube: '', idade: '' })
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nome.trim()) return
    setEnviando(true)
    try {
      const novo = await apiPost(
        '/admin/jogadores',
        {
          selecao_id: selecaoId,
          numero: form.numero ? Number(form.numero) : null,
          nome: form.nome,
          posicao: form.posicao,
          clube: form.clube || null,
          idade: form.idade ? Number(form.idade) : null,
        },
        { 'X-Admin-Key': adminKey },
      )
      onCriado(novo)
      setForm({ numero: '', nome: '', posicao: 'MID', clube: '', idade: '' })
      notificar('Jogador adicionado.', 'sucesso')
    } catch (err) {
      notificar(err.message, 'erro')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-wrap items-end gap-2 rounded-lg border border-dashed border-copa-border p-3">
      <input
        type="number"
        placeholder="#"
        value={form.numero}
        onChange={(e) => setForm((f) => ({ ...f, numero: e.target.value }))}
        className={`${inputClasses} w-14`}
      />
      <input
        type="text"
        placeholder="Nome"
        value={form.nome}
        onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
        className={`${inputClasses} min-w-[140px] flex-1`}
      />
      <select value={form.posicao} onChange={(e) => setForm((f) => ({ ...f, posicao: e.target.value }))} className={inputClasses}>
        {POSICOES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Clube"
        value={form.clube}
        onChange={(e) => setForm((f) => ({ ...f, clube: e.target.value }))}
        className={`${inputClasses} w-32`}
      />
      <input
        type="number"
        placeholder="Idade"
        value={form.idade}
        onChange={(e) => setForm((f) => ({ ...f, idade: e.target.value }))}
        className={`${inputClasses} w-16`}
      />
      <button type="submit" disabled={enviando} className="rounded bg-copa-green px-3 py-1 text-xs font-bold text-white disabled:opacity-40">
        Adicionar
      </button>
    </form>
  )
}

function LinhaJogador({ jogador, onAtualizado, onRemovido }) {
  const adminKey = useAdminStore((s) => s.adminKey)
  const notificar = useToastStore((s) => s.notificar)
  const [campo, setCampo] = useState(jogador)
  const [salvando, setSalvando] = useState(false)

  async function salvar() {
    setSalvando(true)
    try {
      const atualizado = await apiPut(
        `/admin/jogadores/${jogador.id}`,
        {
          numero: campo.numero ? Number(campo.numero) : null,
          nome: campo.nome,
          posicao: campo.posicao,
          clube: campo.clube || null,
          idade: campo.idade ? Number(campo.idade) : null,
          eh_capitao: campo.eh_capitao,
        },
        { 'X-Admin-Key': adminKey },
      )
      onAtualizado(atualizado)
      notificar('Jogador atualizado.', 'sucesso')
    } catch (err) {
      notificar(err.message, 'erro')
    } finally {
      setSalvando(false)
    }
  }

  async function remover() {
    try {
      await apiDelete(`/admin/jogadores/${jogador.id}`, { 'X-Admin-Key': adminKey })
      onRemovido(jogador.id)
      notificar('Jogador removido.', 'sucesso')
    } catch (err) {
      notificar(err.message, 'erro')
    }
  }

  return (
    <tr className="border-b border-copa-border/50 last:border-0">
      <td className="px-2 py-1.5">
        <input
          type="number"
          value={campo.numero ?? ''}
          onChange={(e) => setCampo((c) => ({ ...c, numero: e.target.value }))}
          className={`${inputClasses} w-12`}
        />
      </td>
      <td className="px-2 py-1.5">
        <input
          type="text"
          value={campo.nome}
          onChange={(e) => setCampo((c) => ({ ...c, nome: e.target.value }))}
          className={`${inputClasses} w-36`}
        />
      </td>
      <td className="px-2 py-1.5">
        <select value={campo.posicao} onChange={(e) => setCampo((c) => ({ ...c, posicao: e.target.value }))} className={inputClasses}>
          {POSICOES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </td>
      <td className="px-2 py-1.5">
        <input
          type="text"
          value={campo.clube ?? ''}
          onChange={(e) => setCampo((c) => ({ ...c, clube: e.target.value }))}
          className={`${inputClasses} w-28`}
        />
      </td>
      <td className="px-2 py-1.5">
        <input
          type="number"
          value={campo.idade ?? ''}
          onChange={(e) => setCampo((c) => ({ ...c, idade: e.target.value }))}
          className={`${inputClasses} w-14`}
        />
      </td>
      <td className="px-2 py-1.5 text-center">
        <input
          type="checkbox"
          checked={campo.eh_capitao}
          onChange={(e) => setCampo((c) => ({ ...c, eh_capitao: e.target.checked }))}
        />
      </td>
      <td className="px-2 py-1.5">
        <div className="flex gap-1.5">
          <button type="button" onClick={salvar} disabled={salvando} className="rounded bg-copa-green px-2 py-1 text-xs font-bold text-white disabled:opacity-40">
            Salvar
          </button>
          <button type="button" onClick={remover} className="rounded border border-red-400 px-2 py-1 text-xs text-red-400">
            Remover
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function AdminElencoTab() {
  const { selecoes, loading: loadingSelecoes } = useSelecoes()
  const [selecaoId, setSelecaoId] = useState('')
  const { jogadores, loading: loadingJogadores } = useJogadores(selecaoId || undefined)
  const [listaLocal, setListaLocal] = useState(null)

  const lista = listaLocal ?? jogadores

  function aoTrocarSelecao(id) {
    setSelecaoId(id)
    setListaLocal(null)
  }

  if (loadingSelecoes) return <Loader label="Carregando seleções..." />

  return (
    <div>
      <select
        value={selecaoId}
        onChange={(e) => aoTrocarSelecao(e.target.value)}
        className="mb-4 rounded-lg border border-copa-border bg-copa-card px-3 py-2 text-sm text-copa-text focus:border-copa-green focus:outline-none"
      >
        <option value="">Selecione uma seleção...</option>
        {selecoes.map((s) => (
          <option key={s.id} value={s.id}>
            {s.bandeira_emoji} {s.nome_pt}
          </option>
        ))}
      </select>

      {selecaoId && loadingJogadores && <Loader label="Carregando elenco..." />}

      {selecaoId && !loadingJogadores && (
        <>
          <div className="overflow-x-auto rounded-xl border border-copa-border bg-copa-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-copa-border text-left text-xs text-copa-muted">
                  <th className="px-2 py-2">#</th>
                  <th className="px-2 py-2">Nome</th>
                  <th className="px-2 py-2">Pos.</th>
                  <th className="px-2 py-2">Clube</th>
                  <th className="px-2 py-2">Idade</th>
                  <th className="px-2 py-2">Cap.</th>
                  <th className="px-2 py-2" />
                </tr>
              </thead>
              <tbody>
                {lista.map((j) => (
                  <LinhaJogador
                    key={j.id}
                    jogador={j}
                    onAtualizado={(atualizado) =>
                      setListaLocal((atuais) => (atuais ?? jogadores).map((x) => (x.id === atualizado.id ? atualizado : x)))
                    }
                    onRemovido={(id) => setListaLocal((atuais) => (atuais ?? jogadores).filter((x) => x.id !== id))}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <NovoJogadorForm
            selecaoId={Number(selecaoId)}
            onCriado={(novo) => setListaLocal((atuais) => [...(atuais ?? jogadores), novo])}
          />
        </>
      )}
    </div>
  )
}
