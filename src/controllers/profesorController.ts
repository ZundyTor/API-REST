// Importacion de librerias y objetos
import { Request, Response } from 'express';
import { db } from '../../db';
import { Profesor, BasicProfesor } from '../models/profesorModel';

// Creacion de funcion para un INSERT en la BD
export const create = async (req: Request, res: Response) => {
    const { id_p, nom_p, tel_p, profesion, dir_p } = req.body as Profesor;

    if (!nom_p || !tel_p || !profesion || !dir_p) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const query = 'INSERT INTO ingenieria.profesores (id_p, nom_p, tel_p, profesion, dir_p) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [id_p, nom_p, tel_p, profesion, dir_p];
        const { rows } = await db.query<Profesor>(query, values);
        const nuevoProfesor = rows[0];
        res.status(201).json(nuevoProfesor);
    } catch (error: Error | any) {
        console.error('Error al insertar profesor:', error);
        res.status(500).json({ message: error.message });
    }
};

// Creacion de funcion para un GET-All en la BD
export const getAllProfesores = async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM ingenieria.profesores';
        const { rows } = await db.query<Profesor>(query);
        res.status(200).json(rows);
    } catch (error: Error | any) {
        console.error('Error al obtener profesores:', error);
        res.status(500).json({ message: error.message });
    }
};

// Creacion de funcion para un getById en la BD
export const getProfesorById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }

    try {
        const query = 'SELECT * FROM ingenieria.profesores WHERE id_p = $1';
        const { rows } = await db.query<Profesor>(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        res.status(200).json(rows[0]);
    } catch (error: Error | any) {
        console.error('Error al obtener el profesor:', error);
        res.status(500).json({ message: error.message });
    }
};

// Creacion de funcion para un UPDATE en la BD
export const updateProfesor = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { id_p, nom_p, tel_p, profesion, dir_p } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }

    if (!id_p || !nom_p || !tel_p || !profesion || !dir_p) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const query = `
            UPDATE ingenieria.profesores 
            SET id_p = $1, nom_p = $2, tel_p = $3, profesion = $4, dir_p = $5
            WHERE id_p = $6 
            RETURNING *`;
        const values = [id_p, nom_p, tel_p, profesion, dir_p, id];
        const { rows } = await db.query<Profesor>(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        res.status(200).json(rows[0]);
    } catch (error: Error | any) {
        console.error('Error al actualizar profesor:', error);
        res.status(500).json({ message: error.message });
    }
};