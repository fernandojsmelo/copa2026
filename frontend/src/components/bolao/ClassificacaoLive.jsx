const STATUS_CLASSES = {
  classificado: 'border-l-2 border-copa-green',
  em_disputa: 'border-l-2 border-yellow-500',
  eliminado: 'border-l-2 border-red-500',
  indefinido: 'border-l-2 border-transparent',
}

export default function ClassificacaoLive({ grupo, linhas }) {
  return (
    <div className="rounded-lg border border-copa-border bg-copa-card p-3">
      <h4 className="mb-2 text-sm font-medium text-copa-gold">Grupo {grupo}</h4>
      <table className="w-full text-xs">
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.selecao.id} className={STATUS_CLASSES[linha.status]}>
              <td className="py-1 pl-1.5 text-copa-muted">{linha.posicao}</td>
              <td className="py-1">
                <span className="mr-1">{linha.selecao.bandeira_emoji}</span>
                {linha.selecao.nome_pt}
              </td>
              <td className="py-1 pr-1.5 text-right font-semibold">{linha.pontos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
