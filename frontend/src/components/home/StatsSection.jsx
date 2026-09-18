import StatCounter from './StatCounter'

const STATS = [
  { valor: 48, label: 'Seleções' },
  { valor: 104, label: 'Jogos' },
  { valor: 16, label: 'Cidades-sede' },
  { valor: 3, label: 'Países-sede' },
]

export default function StatsSection() {
  return (
    <section className="grid grid-cols-2 gap-4 py-12 sm:grid-cols-4">
      {STATS.map((stat) => (
        <StatCounter key={stat.label} {...stat} />
      ))}
    </section>
  )
}
