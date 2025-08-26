# Etapa 1: build do front-end
FROM node:lts-alpine AS builder
WORKDIR /app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
RUN npm run build

# Etapa 2: servir com Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copiar os arquivos necessários do builder
COPY --from=builder /app/dist .
COPY --from=builder /app/node_modules ./node_modules
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Adicionar o .env para o container
COPY .env .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
