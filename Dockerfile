# Usa a imagem oficial do Node.js com a última versão estável
FROM node:latest

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install
RUN npm install -g @vue/cli
RUN npm install -g esm@latest
RUN npm intall axios


# Copia o restante do código do projeto para o diretório de trabalho
COPY . .

ENV HOST 0.0.0.0
ENV PORT 3000

EXPOSE 3000

# Comando para rodar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]