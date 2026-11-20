import packageJson from '../../../package.json'

const githubUrl = 'https://github.com/pesdesigner'

export function Footer() {
  return (
    <footer className="site-footer">
      <span>Organizador financeiro</span>
       <div className="footer-meta">
        <span>Versão {packageJson.version}</span>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          GitHub . @pesdesigner
        </a>
      </div>
      <span>Controle pessoal das suas obrigações</span>
    </footer>
  )
}