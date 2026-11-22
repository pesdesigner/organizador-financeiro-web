import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { register } from '../services/authService'
import './RegisterPage.css'

export function RegisterPage() {
  const [searchParams] = useSearchParams()
  const [token, setToken] = useState(searchParams.get('token') ?? '')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setIsSubmitting(true)

    try {
      await register({ token: token.trim(), name: name.trim(), password })
      setIsRegistered(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível criar a conta. Confira a chave convite e tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isRegistered) {
    return (
      <main className="register-page">
        <section className="content-card register-card">
          <p className="eyebrow">Cadastro concluído</p>
          <h1>Conta criada</h1>
          <p className="page-description">
            Seu acesso foi criado. Entre com sua conta para continuar.
          </p>
          <Link className="button button-primary" to="/login">
            Ir para o login
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="register-page">
      <section className="content-card register-card">
        <p className="eyebrow">Acesso por convite</p>
        <h1>Criar conta</h1>
        <p className="page-description">
          Informe a chave convite recebida para criar seu acesso.
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="invite-token">Chave convite</label>
          <input
            id="invite-token"
            name="token"
            type="text"
            autoComplete="off"
            required
            value={token}
            onChange={(event) => setToken(event.target.value)}
          />

          <label htmlFor="register-name">Nome</label>
          <input
            id="register-name"
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="register-password">Senha</label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={12}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <small>A senha deve ter pelo menos 12 caracteres.</small>

          <label htmlFor="confirm-password">Confirme a senha</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={12}
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          {error && (
            <p className="register-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="button button-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="register-login-link">
          Já tem acesso? <Link to="/login">Entrar</Link>
        </p>
      </section>
    </main>
  )
}