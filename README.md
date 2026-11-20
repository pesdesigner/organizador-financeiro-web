# Organizador Financeiro Pessoal

Aplicação web pessoal para acompanhar contas, vencimentos e pagamentos. O objetivo é ajudar a identificar o que precisa ser pago, o que está próximo do vencimento e o que já foi resolvido.

> Projeto em desenvolvimento. O frontend inicial está sendo construído; cadastro de dados, autenticação e integração com API ainda serão implementados.

## Funcionalidades atuais

- Painel inicial com estados vazios para contas e vencimentos.
- Navegação entre a visão geral e a página de contas.
- Rota de página não encontrada.
- Regra isolada para classificar contas por data e status de pagamento.
- Testes automatizados para essa regra.

O projeto ainda não salva contas e não se conecta a uma API ou banco de dados. Nenhum dado financeiro real vem preenchido.

## Tecnologias

- React
- TypeScript
- Vite
- React Router
- ESLint
- Vitest e Testing Library

## Executar localmente

Requer Node.js e npm instalados.

```bash
npm install
npm run dev
```

Comandos disponíveis

```bash
npm run dev       # inicia o servidor de desenvolvimento
npm run test      # inicia os testes em modo contínuo
npm run test:run  # executa os testes uma vez
npm run lint      # verifica o código com ESLint
npm run build     # verifica os tipos e gera o build de produção
npm run preview   # serve localmente o build de produção
```

## Estrutura do frontend

```bash
src/
  components/
    layout/       # estrutura comum: cabeçalho, navegação e rodapé
    ui/           # componentes reutilizáveis de interface
  domain/         # tipos e regras de negócio
  pages/          # páginas acessadas pelas rotas
  styles/         # estilos compartilhados
  test/           # configuração dos testes