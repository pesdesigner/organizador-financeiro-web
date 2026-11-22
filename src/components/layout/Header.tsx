import { ThemeToggle } from '../ui/ThemeToggle'
import { UserProfile } from '../auth/UserProfile'

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Organizador financeiro, início">
        <span className="brand-mark" aria-hidden="true">
          $
        </span>
        <span>Organizador financeiro</span>
      </a>

      <div className="header-actions">
        <span className="header-caption">Seu espaço financeiro pessoal</span>
        <UserProfile />
        <ThemeToggle />
      </div>
    </header>
  )
}