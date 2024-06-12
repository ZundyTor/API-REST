// Importacion de librerias y objetos
import { Request, Response } from 'express';
import { db } from '../../db';
import { Inscribe } from '../models/inscribeModel';
 
// Consultar estudiantes y sus notas por asignatura y grupo
export const getEstudiantesByAsignaturaGrupo = async (req: Request, res: Response) => {
    const cod_a = req.query.cod_a as string;
    const grupo = req.query.grupo as string;
 
    if (!cod_a || !grupo) {
        return res.status(400).json({ message: 'Faltan parámetros requeridos: cod_a y grupo' });
    }

    try {
        const query = `
            SELECT e.cod_e, e.nom_e, i.n1, i.n2, i.n3
            FROM ingenieria.inscribe i
            JOIN ingenieria.estudiantes e ON i.cod_e = e.cod_e
            WHERE i.cod_a = $1 AND i.grupo = $2
        `;
        const { rows } = await db.query(query, [cod_a, grupo]);
        res.status(200).json(rows);
    } catch (error: Error | any) {
        console.error('Error al obtener estudiantes por asignatura y grupo:', error);
        res.status(500).json({ message: error.message });
    }
};
 
// Listar las asignaturas que ve un estudiante en particular y sus notas
export const getAsignaturasByEstudiante = async (req: Request, res: Response) => {
    const { cod_e } = req.params;
 
    try {
        const query = `
            SELECT a.cod_a, a.nom_a, i.n1, i.n2, i.n3
            FROM ingenieria.inscribe i
            JOIN ingenieria.asignaturas a ON i.cod_a = a.cod_a
            WHERE i.cod_e = $1
        `;
        const { rows } = await db.query(query, [cod_e]);
        res.status(200).json(rows);
    } catch (error: Error | any) {
        console.error('Error al obtener asignaturas por estudiante:', error);
        res.status(500).json({ message: error.message });
    }
};
 
// Editar las notas de un estudiante para una asignatura en particular
export const updateNotas = async (req: Request, res: Response) => {
    const cod_e = req.query.cod_e as string;
    const cod_a = req.query.cod_a as string;
    const id_p = req.query.id_p as string;
    const grupo = req.query.grupo as string;
    const { n1, n2, n3 } = req.body;

    try {
        const query = `
            UPDATE ingenieria.inscribe
            SET n1 = $1, n2 = $2, n3 = $3
            WHERE cod_e = $4 AND cod_a = $5 AND id_p = $6 AND grupo = $7
            RETURNING *
        `;
        const { rows } = await db.query(query, [n1, n2, n3, cod_e, cod_a, id_p, grupo]);
        res.status(200).json(rows[0]);
    } catch (error: Error | any) {
        console.error('Error al actualizar las notas:', error);
        res.status(500).json({ message: error.message });
    }
};