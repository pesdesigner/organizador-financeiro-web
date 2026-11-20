export type AccountPaymentStatus = 'pending' | 'paid'

export type DueState =
  | 'paid'
  | 'overdue'
  | 'due-today'
  | 'upcoming'
  | 'no-due-date'

export type Account = {
  id: string
  name: string
  company?: string
  amountInCents?: number
  dueDate?: string
  notes?: string
  paymentStatus: AccountPaymentStatus
}

export type AccountDraft = {
  name: string
  company: string
  amount: string
  dueDate: string
  notes: string
}

export type AccountField = keyof AccountDraft
export type AccountErrors = Partial<Record<AccountField, string>>

export type AccountDueInfo = {
  dueDate?: string
  paymentStatus: AccountPaymentStatus
}

export const emptyAccountDraft: AccountDraft = {
  name: '',
  company: '',
  amount: '',
  dueDate: '',
  notes: '',
}

export function parseAmountToCents(input: string): number | undefined {
  let normalized = input.trim().replace(/\s/g, '').replace(/^R\$/i, '')

  if (!normalized) return undefined

  if (normalized.includes(',') && normalized.includes('.')) {
    normalized = normalized.replace(/\./g, '').replace(',', '.')
  } else {
    normalized = normalized.replace(',', '.')
  }

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return undefined
  }

  const amount = Number(normalized)
  const cents = Math.round(amount * 100)

  return Number.isSafeInteger(cents) && cents > 0 ? cents : undefined
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function validateAccountDraft(draft: AccountDraft): AccountErrors {
  const errors: AccountErrors = {}

  if (!draft.name.trim()) {
    errors.name = 'Informe o nome da conta.'
  }

  if (draft.amount.trim() && parseAmountToCents(draft.amount) === undefined) {
    errors.amount = 'Informe um valor positivo, com até duas casas decimais.'
  }

  if (draft.dueDate && !isValidDate(draft.dueDate)) {
    errors.dueDate = 'Informe uma data válida.'
  }

  return errors
}

export function createAccountFromDraft(
  draft: AccountDraft,
  id: string,
): Account {
  const errors = validateAccountDraft(draft)

  if (Object.keys(errors).length > 0) {
    throw new Error('Não é possível criar a conta com dados inválidos.')
  }

  const amountInCents = parseAmountToCents(draft.amount)

  return {
    id,
    name: draft.name.trim(),
    company: draft.company.trim() || undefined,
    amountInCents,
    dueDate: draft.dueDate || undefined,
    notes: draft.notes.trim() || undefined,
    paymentStatus: 'pending',
  }
}

export function getDueState(
  account: AccountDueInfo,
  today: string,
): DueState {
  if (account.paymentStatus === 'paid') return 'paid'
  if (!account.dueDate) return 'no-due-date'
  if (account.dueDate < today) return 'overdue'
  if (account.dueDate === today) return 'due-today'

  return 'upcoming'
}

export function getTodayInBrasilia(now = new Date()): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .formatToParts(now)
      .map(({ type, value }) => [type, value]),
  )

  return `${parts.year}-${parts.month}-${parts.day}`
}