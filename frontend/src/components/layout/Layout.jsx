import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import ToastContainer from '../common/ToastContainer'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-copa-dark text-copa-text">
      <ScrollToTop />
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <div key={pathname} className="pagina-transicao">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}
