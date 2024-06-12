// Importacion de librerias y objetos
import express from 'express';
import * as inscribeController from '../controllers/inscribeController';

// Crear instancia del enrutador
const inscribeRouter = express.Router();
 
// Definir las ruta
inscribeRouter.get('/asignaturas', inscribeController.getEstudiantesByAsignaturaGrupo);
inscribeRouter.get('/estudiantes/:cod_e', inscribeController.getAsignaturasByEstudiante);
inscribeRouter.put('/estudiantes/notas', inscribeController.updateNotas);
 
export { inscribeRouter };