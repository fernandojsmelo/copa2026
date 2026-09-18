import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary capturou um erro:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-md py-16 text-center">
          <h2 className="mb-2 text-copa-gold">Algo deu errado</h2>
          <p className="text-sm text-copa-muted">
            Não foi possível carregar esta parte da página. Tente recarregar.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
