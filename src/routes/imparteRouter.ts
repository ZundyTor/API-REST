// Importacion de librerias y objetos
import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparteController';
 
// Crear instancia del enrutador
const imparteRouter = express.Router();
 
// Definir las ruta
imparteRouter.get('/profesores/:id_p', imparteController.getAsignaturasByProfesor);
imparteRouter.get('/asignaturas/:cod_a', imparteController.getProfesoresByAsignatura);
imparteRouter.put('/:id_p/:cod_a', imparteController.updateImparte);
 
export { imparteRouter };