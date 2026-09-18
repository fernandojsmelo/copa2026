import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import ProximosJogos from '../components/home/ProximosJogos'
import UltimosResultados from '../components/home/UltimosResultados'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle(
    null,
    'Acompanhe a Copa do Mundo FIFA 2026: tabela de jogos, grupos, elencos, escalação da Seleção Brasileira e bolão.',
  )

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProximosJogos />
      <UltimosResultados />
    </>
  )
}
