# Usa una imagen base ligera de Node.js
FROM node:20-alpine

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo
WORKDIR /app

# Copia sólo los archivos necesarios para instalar las dependencias
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias de desarrollo para compilar
RUN npm i && pnpm install --frozen-lockfile

# Copia el resto de los archivos del proyecto
COPY . .

# Compila la aplicación
RUN pnpm run build

# Elimina las dependencias de desarrollo para reducir el tamaño de la imagen
RUN pnpm prune --prod

# Crea un usuario no root
RUN adduser -D smachado
USER smachado

# Exponer el puerto necesario
EXPOSE 80

# Comando de inicio
CMD ["pnpm", "start"]
