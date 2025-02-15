# Projeto Frontend Vue.js

Este projeto é um frontend desenvolvido em Vue.js e containerizado com Docker. Foi usado um template admin terceiro, basseado no Vuetify, para criação das telas Nuxt.js https://github.com/eddami/nuxt-material-admin/tree/master/template

## Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Node.js (recomendado: última versão LTS)
- Docker e Docker Compose

## Como rodar o projeto

### Utilizando Docker

Para rodar o projeto localmente utilizando Docker, siga os passos abaixo:

1. Faça o build do container:

   ```bash
   docker-compose build
2. Suba o container:

   ```bash
   docker-compose up
O projeto estará disponível em http://localhost:3000 (ou na porta configurada no docker-compose.yml).

### Sem utilizar Docker

1. Instale as dependências:

   ```bash
   npm install -g @vue/cli
   npm install esm@latest
2. Inicie o servidor:

   ```bash
   npm run dev

O projeto estará disponível em http://localhost:3000 (ou na porta configurada no docker-compose.yml).

   
