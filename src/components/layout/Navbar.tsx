import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <nav className="main-nav" aria-label="Navegação principal">
      <NavLink to="/" end>
        Visão geral
      </NavLink>
      <NavLink to="/contas">
        Contas
      </NavLink>
    </nav>
  )
}