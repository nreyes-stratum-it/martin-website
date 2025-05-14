FROM node:18-alpine

# Instalar dependencias necesarias para compilación
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git

# Establecer variable de entorno
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Configurar directorio de trabajo
WORKDIR /opt/app

# Copiar dependencias y realizar la instalación
COPY package.json  ./
RUN npm install -g node-gyp && \
    npm config set fetch-retry-maxtimeout 600000 -g && \
    npm install

# Configurar el PATH global
ENV PATH /opt/node_modules/.bin:$PATH

# Copiar el resto de los archivos del proyecto
COPY . .

# Crear el directorio de uploads con permisos adecuados
RUN mkdir -p /opt/app/public/uploads /opt/app/.strapi && \
    chown -R node:node /opt/app && \
    chmod -R 755 /opt/app

# Cambiar al usuario node para mayor seguridad
USER node

# Construir la aplicación (opcional para producción)
RUN ["npm", "run", "build"]

# Exponer el puerto utilizado por Strapi
EXPOSE 1337

# Comando para iniciar el servidor Strapi
CMD ["npm", "run", "develop"]
