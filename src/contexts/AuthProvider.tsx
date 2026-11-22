import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { login, getCurrentUser, logout } from '../services/authService'
import type { AuthUser } from '../types/auth'
import { AuthContext } from './auth-context'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  async function signIn(email: string, password: string) {
    const authenticatedUser = await login(email, password)
    setUser(authenticatedUser)
  }

  async function signOut() {
    await logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}