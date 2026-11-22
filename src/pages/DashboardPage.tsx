import { Link } from 'react-router-dom'
import { AccountList } from '../components/accounts/AccountList'
import { MetricCard } from '../components/ui/MetricCard'
import { useAccounts } from '../contexts/useAccounts'
import { getDueState, getTodayInBrasilia } from '../domain/account'
import './DashboardPage.css'

export function DashboardPage() {
  const { accounts } = useAccounts()
  const today = getTodayInBrasilia()

  const pendingAccounts = accounts.filter(
    (account) => account.paymentStatus === 'pending',
  )
  const paidCount = accounts.filter(
    (account) => account.paymentStatus === 'paid',
  ).length
  const overdueCount = pendingAccounts.filter(
    (account) => getDueState(account, today) === 'overdue',
  ).length

  const upcomingAccounts = accounts
    .filter((account) => {
      const state = getDueState(account, today)
      return state === 'upcoming' || state === 'due-today'
    })
    .sort((first, second) =>
      (first.dueDate ?? '').localeCompare(second.dueDate ?? ''),
    )
    .slice(0, 5)

  return (
    <section aria-labelledby="dashboard-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PAINEL</p>
          <h1 id="dashboard-title">Visão geral</h1>
          <p className="page-description">
            Acompanhe suas contas e os próximos vencimentos.
          </p>
        </div>

        <Link className="button button-primary" to="/contas">
          Ver contas
        </Link>
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="Pendentes"
          value={String(pendingAccounts.length)}
          description="Aguardando pagamento"
        />
        <MetricCard
          label="Pagas"
          value={String(paidCount)}
          description="Pagamentos confirmados"
        />
        <MetricCard
          label="Atrasadas"
          value={String(overdueCount)}
          description="Vencidas e não pagas"
        />
      </div>

      <section className="content-card" aria-labelledby="upcoming-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ACOMPANHAMENTO</p>
            <h2 id="upcoming-title">Próximos vencimentos</h2>
          </div>
        </div>

        {upcomingAccounts.length > 0 ? (
          <AccountList accounts={upcomingAccounts} />
        ) : (
          <div className="empty-state">
            <span className="empty-state-icon" aria-hidden="true">
              ◷
            </span>
            <h3>Nenhum próximo vencimento</h3>
            <p>
              Cadastre uma conta com vencimento para acompanhar os próximos
              prazos.
            </p>
            <Link className="button button-secondary" to="/contas">
              Acessar contas
            </Link>
          </div>
        )}
      </section>
    </section>
  )
}