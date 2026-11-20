import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export function NotFoundPage() {
  return (
    <main className="not-found">
      <p className="eyebrow">ERRO 404</p>
      <h1>Página não encontrada</h1>
      <p className="page-description">
        O endereço pode estar incorreto ou a página não existe.
      </p>
      <Link className="button button-primary" to="/">
        Voltar ao início
      </Link>
    </main>
  )
}