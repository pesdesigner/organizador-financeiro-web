import { useState, type ReactNode } from 'react'
import type { Account } from '../domain/account'
import { AccountsContext } from './AccountsContext'

export function AccountsProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([])

  function addAccount(account: Account) {
    setAccounts((currentAccounts) => [account, ...currentAccounts])
  }

  return (
    <AccountsContext.Provider value={{ accounts, addAccount }}>
      {children}
    </AccountsContext.Provider>
  )
}