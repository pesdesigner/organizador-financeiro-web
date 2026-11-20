import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AccountsProvider } from './context/AccountsProvider'
import './index.css'
import './styles/shared.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AccountsProvider>
        <App />
      </AccountsProvider>
    </BrowserRouter>
  </StrictMode>,
)
