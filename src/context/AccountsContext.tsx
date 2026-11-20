import { createContext } from 'react'
import type { Account } from '../domain/account'

export type AccountsContextValue = {
  accounts: Account[]
  addAccount: (account: Account) => void
}

export const AccountsContext = createContext<AccountsContextValue | null>(null)