"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfesor = exports.getProfesorById = exports.getAllProfesores = exports.create = void 0;
const db_1 = require("../../db");
// Creacion de funcion para un INSERT en la BD
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_p, nom_p, tel_p, profesion, dir_p } = req.body;
    if (!nom_p || !tel_p || !profesion || !dir_p) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    try {
        const query = 'INSERT INTO ingenieria.profesores (id_p, nom_p, tel_p, profesion, dir_p) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [id_p, nom_p, tel_p, profesion, dir_p];
        const { rows } = yield db_1.db.query(query, values);
        const nuevoProfesor = rows[0];
        res.status(201).json(nuevoProfesor);
    }
    catch (error) {
        console.error('Error al insertar profesor:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.create = create;
// Creacion de funcion para un GET-All en la BD
const getAllProfesores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM ingenieria.profesores';
        const { rows } = yield db_1.db.query(query);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.getAllProfesores = getAllProfesores;
// Creacion de funcion para un getById en la BD
const getProfesorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }
    try {
        const query = 'SELECT * FROM ingenieria.profesores WHERE id_p = $1';
        const { rows } = yield db_1.db.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error('Error al obtener el profesor:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.getProfesorById = getProfesorById;
// Creacion de funcion para un UPDATE en la BD
const updateProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { rows } = yield db_1.db.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error('Error al actualizar profesor:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.updateProfesor = updateProfesor;
