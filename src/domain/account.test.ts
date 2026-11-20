import { describe, expect, it } from 'vitest'
import { getDueState } from './account'

describe('getDueState', () => {
  const today = '2026-11-20'

  it('mantém como paga uma conta confirmada, mesmo se o vencimento passou', () => {
    expect(
      getDueState(
        { dueDate: '2026-11-10', paymentStatus: 'paid' },
        today,
      ),
    ).toBe('paid')
  })

  it('identifica conta pendente com vencimento anterior a hoje como atrasada', () => {
    expect(
      getDueState(
        { dueDate: '2026-11-19', paymentStatus: 'pending' },
        today,
      ),
    ).toBe('overdue')
  })

  it('identifica vencimento de hoje', () => {
    expect(
      getDueState(
        { dueDate: today, paymentStatus: 'pending' },
        today,
      ),
    ).toBe('due-today')
  })

  it('identifica vencimento futuro', () => {
    expect(
      getDueState(
        { dueDate: '2026-11-21', paymentStatus: 'pending' },
        today,
      ),
    ).toBe('upcoming')
  })
})