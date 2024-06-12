// Importacion de librerias y objetos
import { Request, Response } from 'express';
import { db } from '../../db';
import { Estudiante, BasicEstudiante } from '../models/estudianteModel';

// Creacion de funcion para un INSERT en la BD
export const create = async (req: Request, res: Response) => {
    const { cod_e, nom_e, dir_e, tel_e, fech_nac } = req.body as Estudiante;

    if (!nom_e || !tel_e || !dir_e || !fech_nac) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const query = 'INSERT INTO ingenieria.estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [cod_e, nom_e, dir_e, tel_e, fech_nac];
        const { rows } = await db.query<Estudiante>(query, values);
        const nuevoEstudiante = rows[0];
        res.status(201).json(nuevoEstudiante);
    } catch (error: Error | any) {
        console.error('Error al insertar estudiante:', error);
        res.status(500).json({ message: error.message });
    }
};

// Creacion de funcion para un GET-All en la BD
export const getAllEstudiantes = async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM ingenieria.estudiantes';
        const { rows } = await db.query<Estudiante>(query);
        res.status(200).json(rows);
    } catch (error: Error | any) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ message: error.message });
    }
};

// Creacion de funcion para un getById en la BD
export const getEstudianteById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }

    try {
        const query = 'SELECT * FROM ingenieria.estudiantes WHERE cod_e = $1';
        const { rows } = await db.query<Estudiante>(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        res.status(200).json(rows[0]);
    } catch (error: Error | any) {
        console.error('Error al obtener el estudiante:', error);
        res.status(500).json({ message: error.message });
    }
};

// Creacion de funcion para un UPDATE en la BD
export const updateEstudiante = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { cod_e, nom_e, dir_e, tel_e, fech_nac } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }

    if (!cod_e ||!nom_e || !dir_e || !tel_e || !fech_nac) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const query = `
            UPDATE ingenieria.estudiantes 
            SET cod_e = $1, nom_e = $2, dir_e = $3, tel_e = $4, fech_nac = $5
            WHERE cod_e = $6 
            RETURNING *`;
        const values = [cod_e, nom_e, dir_e, tel_e, fech_nac, id];
        const { rows } = await db.query<Estudiante>(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        res.status(200).json(rows[0]);
    } catch (error: Error | any) {
        console.error('Error al actualizar estudiante:', error);
        res.status(500).json({ message: error.message });
    }
};
