# Etapa de build
FROM node:20 AS build
WORKDIR /app

# Si tienes package-lock.json, mejor COPY ambos y usa npm ci
COPY frontend/package*.json ./
RUN npm ci

# Copiamos el resto del frontend y compilamos
COPY frontend/ ./
# Si tu package.json tiene "build": "ng build", esto vale:
RUN npm run build
# Si no, descomenta esta alternativa:
# RUN npx ng build --configuration production

# Etapa de runtime con Nginx
FROM nginx:1.27-alpine
# Nginx con SPA fallback y proxy /api → backend
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
# Archivos estáticos compilados
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
