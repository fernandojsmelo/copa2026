import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import ProximosJogos from '../components/home/ProximosJogos'
import UltimosResultados from '../components/home/UltimosResultados'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProximosJogos />
      <UltimosResultados />
    </>
  )
}
