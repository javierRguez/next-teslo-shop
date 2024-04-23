# Descripción

## Correr en dev

1. Clonar el repositorio
2. Crear una copia de `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno
3. Instalar dependencias `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Correr el proyecto `npm run dev`
8. Limpiar el localStorage del navegador

# Prisma TUTO

1. `npm install prisma --save-dev`
2. `npx prisma init --datasource-provider [PROVIDER]` PROVIDER = `PostgreSQL o MongoDB`
3. `npx prisma migrate dev --name [INIT]` INIT = `Nombre de la migración`

## Crear tsconfig para la carpeta de seeds

`npx tsc --init`

## Activar PROD DB

1. Añadir url de DB en .env
2. Crear tablas `npx prisma migrate deploy`
3. Añadir datos `npm run seed`
