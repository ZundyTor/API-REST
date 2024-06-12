// Importacion de librerias y objetos
import express, { Request, Response } from 'express';
import * as estudianteController from '../controllers/estudianteController';
import { Estudiante, BasicEstudiante } from '../models/estudianteModel';

// Crear instancia del enrutador
const estudianteRouter = express.Router();

// Definir las ruta
estudianteRouter.post('/', estudianteController.create); // Referencia a la función create
estudianteRouter.get('/', estudianteController.getAllEstudiantes); // Referencia a la función getAllEstudiantes
estudianteRouter.get('/:id', estudianteController.getEstudianteById); // Referencia a la función getEstudianteById
estudianteRouter.put('/:id', estudianteController.updateEstudiante); // Referencia a la función updateEstudiante

export { estudianteRouter };