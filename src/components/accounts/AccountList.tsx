import {
  getDueState,
  getTodayInBrasilia,
  type Account,
  type DueState,
} from '../../domain/account'
import './AccountList.css'

type AccountListProps = {
  accounts: Account[]
}

const statusLabels: Record<DueState, string> = {
  paid: 'Paga',
  overdue: 'Atrasada',
  'due-today': 'Vence hoje',
  upcoming: 'Pendente',
  'no-due-date': 'Sem vencimento informado',
}

function formatAmount(amountInCents?: number): string {
  if (amountInCents === undefined) return 'Valor não informado'

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amountInCents / 100)
}

function formatDate(date?: string): string {
  if (!date) return 'Vencimento não informado'

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`))
}

export function AccountList({ accounts }: AccountListProps) {
  const today = getTodayInBrasilia()

  if (accounts.length === 0) {
    return (
      <div className="empty-state account-list-empty">
        <h3>Nenhuma conta cadastrada</h3>
        <p>As contas adicionadas aparecerão aqui.</p>
      </div>
    )
  }

  return (
    <ul className="account-list">
      {accounts.map((account) => {
        const dueState = getDueState(account, today)

        return (
          <li className="account-list-item" key={account.id}>
            <div className="account-list-main">
              <h3>{account.name}</h3>
              {account.company && <p>{account.company}</p>}
              <p>{formatDate(account.dueDate)}</p>
            </div>

            <div className="account-list-details">
              <strong>{formatAmount(account.amountInCents)}</strong>
              <span className={`status-badge status-${dueState}`}>
                {statusLabels[dueState]}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}