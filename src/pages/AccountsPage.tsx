export function AccountsPage() {
  return (
    <section aria-labelledby="accounts-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACOMPANHAMENTO</p>
          <h1 id="accounts-title">Contas</h1>
          <p className="page-description">
            Consulte e organize suas obrigações financeiras.
          </p>
        </div>
      </div>

      <section className="content-card">
        <div className="empty-state">
          <span className="empty-state-icon" aria-hidden="true">
            +
          </span>
          <h2>Nenhuma conta cadastrada</h2>
          <p>
            O formulário de cadastro será a próxima funcionalidade desta página.
          </p>
        </div>
      </section>
    </section>
  )
}