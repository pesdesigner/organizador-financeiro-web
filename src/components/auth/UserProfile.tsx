import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import './UserProfile.css'

export function UserProfile() {
  const { user, signOut } = useAuth()
  const [error, setError] = useState('')
  const [isSigningOut, setIsSigningOut] = useState(false)

  if (!user) return null

  async function handleSignOut() {
    setError('')
    setIsSigningOut(true)

    try {
      await signOut()
    } catch {
      setError('Não foi possível encerrar a sessão. Tente novamente.')
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <div className="user-profile">
      <span className="user-profile-name">{user.name}</span>

      <button
        className="button button-secondary"
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
      >
        {isSigningOut ? 'Saindo...' : 'Sair'}
      </button>

      {error && (
        <p className="user-profile-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}