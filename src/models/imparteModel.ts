import { Profesor, BasicProfesor } from './profesorModel';
import { Asignatura, BasicAsignatura } from './asignaturaModel';

export interface BasicImparte {
    id_p: number,
    cod_a: number
    grupo: number
}

export interface Imparte extends BasicImparte {
    horario: string
}