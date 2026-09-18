export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

const TENTATIVAS_RETRY = 2
const ATRASO_RETRY_MS = 500

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Só GET é reexecutado automaticamente — reexecutar POST/PUT/DELETE por conta
// própria poderia duplicar efeitos colaterais (ex: criar o mesmo recurso duas vezes).
// Só falha de rede (fetch rejeita) é reexecutada; uma resposta HTTP de erro
// (400/404/500) chega normalmente e não é reexecutada, pois tentar de novo não ajudaria.
async function buscarComRetry(url, opcoes, tentativasRestantes = TENTATIVAS_RETRY) {
  try {
    return await fetch(url, opcoes)
  } catch (err) {
    if (tentativasRestantes <= 0 || opcoes.method !== 'GET') throw err
    await esperar(ATRASO_RETRY_MS)
    return buscarComRetry(url, opcoes, tentativasRestantes - 1)
  }
}

async function apiRequest(path, { method = 'GET', body, headers } = {}) {
  const response = await buscarComRetry(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const dados = await response.json().catch(() => null)

  if (!response.ok) {
    const mensagem = dados?.error ? `${dados.error}${dados.detail ? `: ${dados.detail}` : ''}` : `Erro ${response.status}`
    throw new Error(mensagem)
  }
  return dados
}

export function apiGet(path, headers) {
  return apiRequest(path, { headers })
}

export function apiPost(path, body, headers) {
  return apiRequest(path, { method: 'POST', body, headers })
}

export function apiPut(path, body, headers) {
  return apiRequest(path, { method: 'PUT', body, headers })
}

export function apiPatch(path, body, headers) {
  return apiRequest(path, { method: 'PATCH', body, headers })
}

export function apiDelete(path, headers) {
  return apiRequest(path, { method: 'DELETE', headers })
}
