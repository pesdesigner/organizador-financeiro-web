export type AccountPaymentStatus = 'pending' | 'paid'

export type DueState = 'paid' | 'overdue' | 'due-today' | 'upcoming'

export type AccountDueInfo = {
  dueDate: string
  paymentStatus: AccountPaymentStatus
}

/**
 * As datas são comparadas como YYYY-MM-DD, sem horário.
 * O chamador fornece "today" para permitir testes previsíveis.
 */
export function getDueState(
  account: AccountDueInfo,
  today: string,
): DueState {
  if (account.paymentStatus === 'paid') {
    return 'paid'
  }

  if (account.dueDate < today) {
    return 'overdue'
  }

  if (account.dueDate === today) {
    return 'due-today'
  }

  return 'upcoming'
}