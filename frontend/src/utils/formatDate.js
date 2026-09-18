export function toHorarioBrasilia(utcString) {
  const date = new Date(utcString.endsWith('Z') ? utcString : `${utcString}Z`)
  return date.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function toDataLongaBrasilia(utcString) {
  const date = new Date(utcString.endsWith('Z') ? utcString : `${utcString}Z`)
  return date.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
}
