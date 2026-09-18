import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Início' },
  { to: '/tabela', label: 'Tabela' },
  { to: '/grupos', label: 'Grupos' },
  { to: '/elencos', label: 'Elencos' },
  { to: '/brasil', label: 'Brasil' },
  { to: '/bolao', label: 'Bolão' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-copa-border bg-copa-dark/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="font-display text-2xl text-copa-yellow">
          Copa 2026
        </NavLink>
        <nav className="hidden gap-6 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-copa-green ${
                  isActive ? 'text-copa-green' : 'text-copa-muted'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
