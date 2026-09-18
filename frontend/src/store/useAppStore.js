import { create } from 'zustand'

function getOrCreateSessionId() {
  const existing = sessionStorage.getItem('copa2026_session_id')
  if (existing) return existing
  const id = crypto.randomUUID()
  sessionStorage.setItem('copa2026_session_id', id)
  return id
}

export const useAppStore = create((set) => ({
  sessionId: getOrCreateSessionId(),
  theme: 'dark',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}))
