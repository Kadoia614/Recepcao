# Etapa 1: build do front-end
FROM node:lts-alpine AS builder
WORKDIR /app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Etapa 2: servir com Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copiar os arquivos necessários do builder
COPY --from=builder /app/dist .
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
