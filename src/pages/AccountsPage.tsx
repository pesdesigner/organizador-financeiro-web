import { useState } from 'react'
import { AccountForm } from '../components/accounts/AccountForm'
import { AccountList } from '../components/accounts/AccountList'
import { useAccounts } from '../context/useAccounts'
import type { Account } from '../domain/account'
import './AccountsPage.css'

export function AccountsPage() {
  const { accounts, addAccount } = useAccounts()
  const [feedback, setFeedback] = useState('')

  function handleAddAccount(account: Account) {
    addAccount(account)
    setFeedback('Conta cadastrada como pendente.')
  }

  return (
    <section aria-labelledby="accounts-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACOMPANHAMENTO</p>
          <h1 id="accounts-title">Contas</h1>
          <p className="page-description">
            Cadastre e acompanhe suas obrigações financeiras.
          </p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {feedback}
      </p>

      <div className="accounts-page-grid">
        <section className="content-card">
          <AccountForm onSubmit={handleAddAccount} />
        </section>

        <section className="content-card" aria-labelledby="account-list-title">
          <div className="section-heading account-list-heading">
            <div>
              <p className="eyebrow">REGISTROS</p>
              <h2 id="account-list-title">Contas cadastradas</h2>
            </div>
            <span className="account-count">{accounts.length}</span>
          </div>

          <AccountList accounts={accounts} />
        </section>
      </div>
    </section>
  )
}