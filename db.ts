// Importacion librerias para postgresql
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

// Conexión objeto pool
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

export { pool as db };
