# Projeto de Automação com Cypress

Este projeto utiliza o [Cypress](https://www.cypress.io/) para automação de testes end-to-end (E2E).

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Executando os testes

### Modo interativo (abre a interface do Cypress)
```bash
npx cypress open
```

### Modo headless (sem interface)
```bash
npx cypress run
```

## Estrutura do projeto

```
cypress/
  ├─ e2e/        # Arquivos de testes
  ├─ fixtures/   # Massa de dados (JSON)
  ├─ support/    # Comandos customizados e hooks
  └─ videos/     # Gravações dos testes (gerado automaticamente)
cypress.config.js  # Configuração do Cypress
```

## Configuração de ambiente

As variáveis de ambiente ficam no arquivo `.env`.  
Um arquivo `.env.example` é fornecido como modelo.
