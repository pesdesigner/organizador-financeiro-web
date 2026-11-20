import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export function NotFoundPage() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="not-found-card">
        <span className="not-found-code">404</span>
        <p className="eyebrow">PÁGINA NÃO ENCONTRADA</p>
        <h1 id="not-found-title">Não encontramos esse endereço</h1>
        <p className="page-description">
          Confira o endereço ou volte para a visão geral.
        </p>
        <Link className="button button-primary" to="/">
          Voltar ao início
        </Link>
      </div>
    </section>
  )
}