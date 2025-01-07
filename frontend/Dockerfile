# Usar una imagen base con Node.js
FROM node:18-alpine AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Fase de producción: usar una imagen de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiar los archivos de construcción de la fase anterior al contenedor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]