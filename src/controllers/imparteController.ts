// Importacion de librerias y objetos
import { Request, Response } from 'express';
import { db } from '../../db';
import { Imparte } from '../models/imparteModel';
import { Profesor } from '../models/profesorModel';
import { Asignatura } from '../models/asignaturaModel';

// Función para obtener las asignaturas que imparte un profesor
export const getAsignaturasByProfesor = async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p, 10);

    if (isNaN(id_p)) {
        return res.status(400).json({ message: 'El ID del profesor no es válido' });
    }

    try {
        const query = `
            SELECT a.*
            FROM ingenieria.asignaturas a
            JOIN ingenieria.imparte i ON a.cod_a = i.cod_a
            WHERE i.id_p = $1
        `;
        const { rows } = await db.query<Asignatura>(query, [id_p]);
        res.status(200).json(rows);
    } catch (error: Error | any) {
        console.error('Error al obtener asignaturas por profesor:', error);
        res.status(500).json({ message: error.message });
    }
};

// Función para obtener los profesores que imparten una asignatura
export const getProfesoresByAsignatura = async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a, 10);

    if (isNaN(cod_a)) {
        return res.status(400).json({ message: 'El código de la asignatura no es válido' });
    }

    try {
        const query = `
            SELECT p.*
            FROM ingenieria.profesores p
            JOIN ingenieria.imparte i ON p.id_p = i.id_p
            WHERE i.cod_a = $1
        `;
        const { rows } = await db.query<Profesor>(query, [cod_a]);
        res.status(200).json(rows);
    } catch (error: Error | any) {
        console.error('Error al obtener profesores por asignatura:', error);
        res.status(500).json({ message: error.message });
    }
};

// Función para actualizar el grupo y el horario de una relación Imparte
export const updateImparte = async (req: Request, res: Response) => {
    const { id_p, cod_a } = req.params;
    const { grupo, horario } = req.body;

    if (!grupo || !horario) {
        return res.status(400).json({ message: 'Faltan datos requeridos para la actualización' });
    }

    try {
        const query = `
            UPDATE ingenieria.imparte
            SET grupo = $1, horario = $2
            WHERE id_p = $3 AND cod_a = $4
            RETURNING *
        `;
        const values = [grupo, horario, parseInt(id_p, 10), parseInt(cod_a, 10)];
        const { rows } = await db.query<Imparte>(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Relación Imparte no encontrada' });
        }

        res.status(200).json(rows[0]);
    } catch (error: Error | any) {
        console.error('Error al actualizar Imparte:', error);
        res.status(500).json({ message: error.message });
    }
};