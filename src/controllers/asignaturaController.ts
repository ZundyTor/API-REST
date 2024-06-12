 // Importacion de librerias y objetos
import { Request, Response } from 'express';
import { db } from '../../db';
import { Asignatura, BasicAsignatura } from '../models/asignaturaModel';

// Creacion de funcion para un INSERT en la BD
export const create = async (req: Request, res: Response) => {
    const { cod_a, nom_a, int_h, creditos_a } = req.body as Asignatura;

    if (!cod_a || !nom_a || !int_h || !creditos_a) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const query = 'INSERT INTO ingenieria.asignaturas (cod_a, nom_a, int_h, creditos_a) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [cod_a, nom_a, int_h, creditos_a];
        const { rows } = await db.query<Asignatura>(query, values);
        const nuevaAsignatura = rows[0];
        res.status(201).json(nuevaAsignatura);
    } catch (error: Error | any) {
        console.error('Error al insertar asignatura:', error);
        res.status(500).json({ message: error.message });
    }
};

// Creacion de funcion para un GET-All en la BD
export const getAllAsignaturas = async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM ingenieria.asignaturas';
        const { rows } = await db.query<Asignatura>(query);
        res.status(200).json(rows);
    } catch (error: Error | any) {
        console.error('Error al obtener asignaturas:', error);
        res.status(500).json({ message: error.message });
    }
};

// Creacion de funcion para un getById en la BD
export const getAsignaturaById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }

    try {
        const query = 'SELECT * FROM ingenieria.asignaturas WHERE cod_a = $1';
        const { rows } = await db.query<Asignatura>(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }

        res.status(200).json(rows[0]);
    } catch (error: Error | any) {
        console.error('Error al obtener la asignatura:', error);
        res.status(500).json({ message: error.message });
    }
};

// Creacion de funcion para un UPDATE en la BD
export const updateAsignatura = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { cod_a, nom_a, int_h, creditos_a } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }

    if (!cod_a || !nom_a || !int_h || !creditos_a) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const query = `
            UPDATE ingenieria.asignaturas 
            SET cod_a = $1, nom_a = $2, int_h = $3, creditos_a = $4
            WHERE cod_a = $5 
            RETURNING *`;
        const values = [cod_a, nom_a, int_h, creditos_a, id];
        const { rows } = await db.query<Asignatura>(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }

        res.status(200).json(rows[0]);
    } catch (error: Error | any) {
        console.error('Error al actualizar la asignatura:', error);
        res.status(500).json({ message: error.message });
    }
};