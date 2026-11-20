import { Link } from 'react-router-dom'
import { MetricCard } from '../components/ui/MetricCard'
import './DashboardPage.css'

export function DashboardPage() {
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
          value="—"
          description="Contas aguardando cadastro"
        />
        <MetricCard
          label="Pagas"
          value="—"
          description="Pagamentos confirmados"
        />
        <MetricCard
          label="Atrasadas"
          value="—"
          description="Contas vencidas e não pagas"
        />
      </div>

      <section className="content-card" aria-labelledby="upcoming-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ACOMPANHAMENTO</p>
            <h2 id="upcoming-title">Próximos vencimentos</h2>
          </div>
        </div>

        <div className="empty-state">
          <span className="empty-state-icon" aria-hidden="true">
            ◷
          </span>
          <h3>Nenhuma conta cadastrada</h3>
          <p>
            Quando você cadastrar contas, os próximos vencimentos aparecerão
            aqui.
          </p>
          <Link className="button button-secondary" to="/contas">
            Acessar contas
          </Link>
        </div>
      </section>
    </section>
  )
}