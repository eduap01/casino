### 1️⃣ BUILD ANGULAR ###
FROM node:20 AS build
WORKDIR /app

# Copiamos los archivos para instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiamos todo el proyecto Angular
COPY . .

# Si tienes en package.json "build": "ng build", esto funciona:
RUN npm run build --prod

# Si tu Angular es > v15 y usa "ng build", esto:
# RUN npx ng build --configuration production


### 2️⃣ NGINX PARA SERVIR EL FRONT ###
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el dist generado en la etapa anterior
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
