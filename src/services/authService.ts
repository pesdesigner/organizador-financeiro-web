import type { AuthUser, RegisterInput } from '../types/auth'
import { apiRequest } from './api'

interface AuthUserResponse {
  user: AuthUser
}

export async function login(
  email: string,
  password: string,
): Promise<AuthUser> {
  const response = await apiRequest<AuthUserResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  return response.user
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await apiRequest<AuthUserResponse>('/auth/me')
  return response.user
}

export async function logout(): Promise<void> {
  await apiRequest<void>('/auth/logout', { method: 'POST' })
}

export async function register(input: RegisterInput): Promise<AuthUser> {
  const response = await apiRequest<AuthUserResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return response.user
}