import { useLayoutEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './ThemeContext'

function getInitialTheme(): Theme {
  try {
    return localStorage.getItem('organizador-theme') === 'dark'
      ? 'dark'
      : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      localStorage.setItem('organizador-theme', theme)
    } catch {
      // O tema continua funcionando nesta sessão se o navegador bloquear storage.
    }
  }, [theme])

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}