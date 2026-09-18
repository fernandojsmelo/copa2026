import { Link } from 'react-router-dom'
import Countdown from '../countdown/Countdown'

const ATALHOS = [
  { to: '/tabela', label: 'Tabela' },
  { to: '/grupos', label: 'Grupos' },
  { to: '/brasil', label: 'Brasil' },
  { to: '/bolao', label: 'Bolão' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-copa-border bg-gradient-to-br from-copa-blue via-copa-dark to-copa-green/40 px-6 py-16 text-center sm:py-24">
      <p className="font-display text-lg tracking-[0.3em] text-copa-gold">WE ARE 26</p>
      <h1 className="mt-2 text-5xl text-copa-yellow sm:text-7xl">Copa do Mundo 2026</h1>
      <p className="mx-auto mt-4 max-w-xl text-copa-muted">
        EUA, Canadá e México recebem a 23ª edição da Copa do Mundo FIFA. Acompanhe cada jogo,
        monte sua escalação e dispute o bolão com seus amigos.
      </p>

      <div className="mt-10">
        <Countdown />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {ATALHOS.map((atalho) => (
          <Link
            key={atalho.to}
            to={atalho.to}
            className="rounded-lg bg-copa-green px-6 py-2 font-bold text-white transition-colors hover:bg-green-700"
          >
            {atalho.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
