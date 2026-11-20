import { describe, expect, it } from 'vitest'
import {
  createAccountFromDraft,
  emptyAccountDraft,
  getDueState,
  parseAmountToCents,
  validateAccountDraft,
} from './account'

describe('validateAccountDraft', () => {
  it('exige o nome da conta', () => {
    expect(validateAccountDraft(emptyAccountDraft).name).toBe(
      'Informe o nome da conta.',
    )
  })

  it('aceita campos opcionais vazios', () => {
    expect(
      validateAccountDraft({ ...emptyAccountDraft, name: 'Internet' }),
    ).toEqual({})
  })

  it('rejeita valor inválido ou zero', () => {
    expect(parseAmountToCents('abc')).toBeUndefined()
    expect(parseAmountToCents('0')).toBeUndefined()
    expect(
      validateAccountDraft({
        ...emptyAccountDraft,
        name: 'Internet',
        amount: 'abc',
      }).amount,
    ).toBeDefined()
  })

  it('converte valor em reais para centavos', () => {
    expect(parseAmountToCents('120,50')).toBe(12050)
    expect(parseAmountToCents('1.234,56')).toBe(123456)
  })

  it('rejeita uma data de calendário inválida', () => {
    expect(
      validateAccountDraft({
        ...emptyAccountDraft,
        name: 'Internet',
        dueDate: '2026-02-30',
      }).dueDate,
    ).toBeDefined()
  })

  it('cria a conta como pendente e preserva opcionais vazios', () => {
    const account = createAccountFromDraft(
      { ...emptyAccountDraft, name: 'Internet' },
      'test-id',
    )

    expect(account).toEqual({
      id: 'test-id',
      name: 'Internet',
      company: undefined,
      amountInCents: undefined,
      dueDate: undefined,
      notes: undefined,
      paymentStatus: 'pending',
    })
  })
})

describe('getDueState', () => {
  const today = '2026-11-20'

  it('identifica conta paga', () => {
    expect(
      getDueState(
        { dueDate: '2026-11-10', paymentStatus: 'paid' },
        today,
      ),
    ).toBe('paid')
  })

  it('identifica conta vencida', () => {
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

  it('não inventa vencimento quando a data não foi informada', () => {
    expect(getDueState({ paymentStatus: 'pending' }, today)).toBe(
      'no-due-date',
    )
  })
})