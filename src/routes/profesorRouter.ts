// Importacion de librerias y objetos
import express, { Request, Response } from 'express';
import * as profesorController from '../controllers/profesorController';
import { Profesor, BasicProfesor } from '../models/profesorModel';

// Crear instancia del enrutador
const profesorRouter = express.Router();

// Definir las ruta
profesorRouter.post('/', profesorController.create); // Referencia a la función create
profesorRouter.get('/', profesorController.getAllProfesores); // Referencia a la función getAllProfesores
profesorRouter.get('/:id', profesorController.getProfesorById); // Referencia a la función getProfesorById
profesorRouter.put('/:id', profesorController.updateProfesor); // Referencia a la función updateProfesor

export { profesorRouter };