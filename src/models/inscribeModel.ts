import { Profesor, BasicProfesor } from './profesorModel';
import { Asignatura, BasicAsignatura } from './asignaturaModel';
import { Estudiante, BasicEstudiante } from './estudianteModel';

export interface BasicInscribe {
    cod_e: number,
    cod_a: number,
    id_p: number,
    grupo: number
}

export interface Inscribe extends BasicInscribe {
    n1: number,
    n2: number,
    n3: number
}