// Importacion de librerias y objetos
import * as dotenv from 'dotenv';
import express from 'express';
import { db } from './db';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { estudianteRouter } from './src/routes/estudianteRouter';
import { profesorRouter } from './src/routes/profesorRouter';
import { asignaturaRouter } from './src/routes/asignaturaRouter';
import { imparteRouter } from './src/routes/imparteRouter';
import { inscribeRouter } from './src/routes/inscribeRouter';
import path from 'path';

// Procesar variables de entorno .env
dotenv.config();

// Utilizar los modulos y los middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Definir los endpoints de la API
app.use('/estudiantes', estudianteRouter);
app.use('/profesores', profesorRouter);
app.use('/asignaturas', asignaturaRouter);
app.use('/imparte', imparteRouter);
app.use('/inscribe', inscribeRouter);

// Metodo GET
app.get('/', (req, res) => {
    res.type('text/plain');
    res.status(200).send('Welcome! WIIIIIIIIIIIII');
});

// Conexion a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connected successfully');
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log('Node server started running');
            console.log(`Go to http://${process.env.HOST}:${port}`);
        });
    }
});
