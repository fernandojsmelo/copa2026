import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Início' },
  { to: '/tabela', label: 'Tabela' },
  { to: '/grupos', label: 'Grupos' },
  { to: '/elencos', label: 'Elencos' },
  { to: '/brasil', label: 'Brasil' },
  { to: '/bolao', label: 'Bolão' },
]

function linkClasses({ isActive }) {
  return `text-sm font-medium transition-colors hover:text-copa-green ${
    isActive ? 'text-copa-green' : 'text-copa-muted'
  }`
}

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-copa-border bg-copa-dark/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="font-display text-2xl text-copa-yellow" onClick={() => setMenuAberto(false)}>
          Copa 2026
        </NavLink>

        <nav className="hidden gap-6 md:flex">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <span
            className={`h-0.5 w-6 bg-copa-text transition-transform ${menuAberto ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-6 bg-copa-text transition-opacity ${menuAberto ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-copa-text transition-transform ${menuAberto ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {menuAberto && (
        <nav className="flex flex-col gap-1 border-t border-copa-border px-4 py-3 md:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={(state) => `rounded-lg px-3 py-2 ${linkClasses(state)}`}
              onClick={() => setMenuAberto(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
