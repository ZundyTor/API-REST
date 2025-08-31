# API-REST

Este repositorio contiene una API Restful básica, utilizando **TypeScript**, **NodeJS** y **Express.js**.

## Descripción

Esta API provee una estructura sencilla para la creación de servicios REST. El proyecto está diseñado para ser un punto de partida en el desarrollo de aplicaciones backend utilizando tecnologías modernas y buenas prácticas.

## Tecnologías y dependencias principales

- **TypeScript** (mayoría del código)
- **NodeJS**
- **Express.js**
- **body-parser**
- **cors**
- **dotenv**
- **mysql2**
- **pg** (PostgreSQL)
- Otras dependencias (ver `package.json`)

## Estructura del proyecto

```
├── .gitignore
├── app.ts
├── db.ts
├── dist/
├── package.json
├── package-lock.json
├── public/
├── src/
├── tsconfig.json
```

- `app.ts`: Archivo principal de la aplicación.
- `db.ts`: Configuración y conexión a la base de datos.
- `src/`: Código fuente de la API.
- `public/`: Archivos públicos/estáticos.
- `dist/`: Archivos compilados (TypeScript → JavaScript).
- `package.json`: Dependencias y scripts.
- `tsconfig.json`: Configuración de TypeScript.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ZundyTor/API-REST.git
   cd API-REST
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno (crea un archivo `.env` si es necesario).

## Uso

- Para iniciar el servidor en modo desarrollo:
  ```bash
  npm run dev
  ```
- Para compilar y ejecutar la versión de producción:
  ```bash
  npm run start
  ```

## Scripts disponibles

- `npm run dev`: Inicia el servidor usando TypeScript.
- `npm run start`: Ejecuta el archivo compilado en `dist/app.js`.

## Contribución

¡Las contribuciones son bienvenidas! Por favor, abre un issue o pull request para sugerencias, errores o mejoras.

## Autor

Daniel Lerzundy

## Licencia

Este proyecto está bajo la licencia ISC.

---
