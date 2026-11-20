import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { Navbar } from './Navbar'
import './layout.css'

export function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}