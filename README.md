# Organizador Financeiro Pessoal

Aplicação web pessoal para acompanhar contas, vencimentos e pagamentos. O objetivo é ajudar a identificar o que precisa ser pago, o que está próximo do vencimento e o que já foi resolvido.

> Projeto em desenvolvimento. O frontend inicial está sendo construído; cadastro de dados, autenticação e integração com API ainda serão implementados.

## Funcionalidades atuais

- Painel com totais de contas pendentes, pagas e atrasadas.
- Cadastro de contas com nome obrigatório e empresa, valor, vencimento e observações opcionais.
- Classificação do vencimento considerando o fuso de Brasília.
- Alternância entre tema claro e tema escuro, com preferência guardada no navegador.
- Navegação entre a visão geral, contas e página 404.
- Testes automatizados para validação de dados, status por vencimento e alternância de tema.

As contas cadastradas existem apenas na memória da aplicação e são perdidas ao recarregar a página. Ainda não há integração com API ou banco de dados.

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