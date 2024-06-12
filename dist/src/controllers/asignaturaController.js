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
exports.updateAsignatura = exports.getAsignaturaById = exports.getAllAsignaturas = exports.create = void 0;
const db_1 = require("../../db");
// Creacion de funcion para un INSERT en la BD
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_a, nom_a, int_h, creditos_a } = req.body;
    if (!cod_a || !nom_a || !int_h || !creditos_a) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    try {
        const query = 'INSERT INTO ingenieria.asignaturas (cod_a, nom_a, int_h, creditos_a) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [cod_a, nom_a, int_h, creditos_a];
        const { rows } = yield db_1.db.query(query, values);
        const nuevaAsignatura = rows[0];
        res.status(201).json(nuevaAsignatura);
    }
    catch (error) {
        console.error('Error al insertar asignatura:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.create = create;
// Creacion de funcion para un GET-All en la BD
const getAllAsignaturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM ingenieria.asignaturas';
        const { rows } = yield db_1.db.query(query);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error('Error al obtener asignaturas:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.getAllAsignaturas = getAllAsignaturas;
// Creacion de funcion para un getById en la BD
const getAsignaturaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }
    try {
        const query = 'SELECT * FROM ingenieria.asignaturas WHERE cod_a = $1';
        const { rows } = yield db_1.db.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error('Error al obtener la asignatura:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.getAsignaturaById = getAsignaturaById;
// Creacion de funcion para un UPDATE en la BD
const updateAsignatura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { rows } = yield db_1.db.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error('Error al actualizar la asignatura:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.updateAsignatura = updateAsignatura;
