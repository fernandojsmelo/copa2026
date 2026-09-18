import { create } from 'zustand'

const CHAVE_STORAGE = 'copa2026_admin_key'

export const useAdminStore = create((set) => ({
  adminKey: sessionStorage.getItem(CHAVE_STORAGE),
  autenticar: (chave) => {
    sessionStorage.setItem(CHAVE_STORAGE, chave)
    set({ adminKey: chave })
  },
  sair: () => {
    sessionStorage.removeItem(CHAVE_STORAGE)
    set({ adminKey: null })
  },
}))
