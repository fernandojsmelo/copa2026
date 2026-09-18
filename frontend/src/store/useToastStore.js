import { create } from 'zustand'

let proximoId = 1

export const useToastStore = create((set) => ({
  toasts: [],
  notificar: (mensagem, tipo = 'sucesso') => {
    const id = proximoId++
    set((state) => ({ toasts: [...state.toasts, { id, mensagem, tipo }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 3500)
  },
  remover: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
