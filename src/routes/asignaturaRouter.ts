// Importacion de librerias y objetos
import express, { Request, Response } from 'express';
import * as asignaturaController from '../controllers/asignaturaController';
import { Asignatura, BasicAsignatura } from '../models/asignaturaModel';

// Crear instancia del enrutador
const asignaturaRouter = express.Router();

// Definir las ruta
asignaturaRouter.post('/', asignaturaController.create); // Referencia a la función create
asignaturaRouter.get('/', asignaturaController.getAllAsignaturas); // Referencia a la función getAllAsignaturas
asignaturaRouter.get('/:id', asignaturaController.getAsignaturaById); // Referencia a la función getAsignaturaById
asignaturaRouter.put('/:id', asignaturaController.updateAsignatura); // Referencia a la función updateAsignatura

export { asignaturaRouter };