import { StrictMode } from 'react'
import { ThemeProvider } from './context/ThemeProvider'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AccountsProvider } from './context/AccountsProvider'
import './index.css'
import './styles/shared.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AccountsProvider>
          <App />
        </AccountsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
