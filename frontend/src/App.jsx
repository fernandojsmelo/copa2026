import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/common/ErrorBoundary'
import HomePage from './pages/HomePage'
import TabelaPage from './pages/TabelaPage'
import JogoDetalhePage from './pages/JogoDetalhePage'
import GruposPage from './pages/GruposPage'
import ElencoPage from './pages/ElencoPage'
import SelecaoDetalhePage from './pages/SelecaoDetalhePage'
import EscalacaoPage from './pages/EscalacaoPage'
import BolaoPage from './pages/BolaoPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tabela" element={<TabelaPage />} />
            <Route path="jogos/:id" element={<JogoDetalhePage />} />
            <Route path="grupos" element={<GruposPage />} />
            <Route path="elencos" element={<ElencoPage />} />
            <Route path="elencos/:id" element={<SelecaoDetalhePage />} />
            <Route path="brasil" element={<EscalacaoPage />} />
            <Route path="bolao" element={<BolaoPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
