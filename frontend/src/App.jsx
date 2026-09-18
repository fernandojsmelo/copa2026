import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/common/ErrorBoundary'
import HomePage from './pages/HomePage'
import TabelaPage from './pages/TabelaPage'
import JogoDetalhePage from './pages/JogoDetalhePage'
import EmConstrucaoPage from './pages/EmConstrucaoPage'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tabela" element={<TabelaPage />} />
            <Route path="jogos/:id" element={<JogoDetalhePage />} />
            <Route path="grupos" element={<EmConstrucaoPage titulo="Grupos" />} />
            <Route path="elencos" element={<EmConstrucaoPage titulo="Elencos" />} />
            <Route path="brasil" element={<EmConstrucaoPage titulo="Seleção Brasileira" />} />
            <Route path="bolao" element={<EmConstrucaoPage titulo="Bolão" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
