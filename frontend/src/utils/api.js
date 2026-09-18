export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

async function apiRequest(path, { method = 'GET', body, headers } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
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

export function apiDelete(path, headers) {
  return apiRequest(path, { method: 'DELETE', headers })
}
