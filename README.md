# Organizador Financeiro Pessoal

Aplicação web pessoal para acompanhar contas, vencimentos e pagamentos. O objetivo é ajudar a identificar o que precisa ser pago, o que está próximo do vencimento e o que já foi resolvido.

> Projeto em desenvolvimento.

**Versão:** 0.2.0

## Funcionalidades

- Painel com totais de contas pendentes, pagas e atrasadas.
- Cadastro de contas com nome obrigatório e empresa, valor, vencimento e observações opcionais.
- Classificação do vencimento considerando o fuso de Brasília.
- Alternância entre tema claro e escuro, com preferência guardada no navegador.
- Login com sessão autenticada.
- Cadastro de usuários por chave convite.
- Proteção das páginas privadas e opção para encerrar a sessão.
- Navegação entre a visão geral, contas e página 404.
- Testes automatizados para validação de dados, status por vencimento e alternância de tema.

As contas cadastradas ainda existem apenas na memória da aplicação e são perdidas ao recarregar a página. A integração com a API é usada para autenticação e cadastro por convite; as contas financeiras ainda não são persistidas no banco de dados.

## Tecnologias

- React
- TypeScript
- Vite
- React Router
- ESLint
- Vitest e Testing Library

## Executar localmente

Requer Node.js e npm instalados. A API deve estar rodando localmente para usar login e cadastro por convite. Consulte o README do repositório da API para configurá-la.

```bash
npm install
npm run dev
```

O frontend usa o proxy do Vite para encaminhar as chamadas `/api` à API local em `http://localhost:3000`.

## Comandos disponíveis

```bash
npm run dev       # inicia o servidor de desenvolvimento
npm run test      # inicia os testes em modo contínuo
npm run test:run  # executa os testes uma vez
npm run typecheck # verifica os tipos TypeScript
npm run lint      # verifica o código com ESLint
npm run build     # verifica os tipos e gera o build de produção
npm run preview   # serve localmente o build de produção
```

## Estrutura do frontend

```text
src/
  components/
    auth/         # componentes relacionados à autenticação
    layout/       # estrutura comum: cabeçalho, navegação e rodapé
    ui/           # componentes reutilizáveis de interface
  contexts/       # estados compartilhados da aplicação
  domain/         # tipos e regras de negócio
  hooks/          # hooks reutilizáveis
  pages/          # páginas acessadas pelas rotas
  services/       # comunicação com a API
  styles/         # estilos compartilhados
  test/           # configuração e utilitários de testes
  types/          # tipos TypeScript
```