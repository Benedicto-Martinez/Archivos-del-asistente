# Usa la imagen base oficial de Node.js
FROM node:20-slim

# Configura el directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install --production

# Copia el resto de archivos
COPY . .

# Puerto expuesto (debe coincidir con el de Cloud Run)
EXPOSE 8080

# Comando de inicio
CMD ["node", "server.js"]