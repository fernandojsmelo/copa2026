export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao buscar ${path}`)
  }
  return response.json()
}
