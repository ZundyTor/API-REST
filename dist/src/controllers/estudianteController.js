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
exports.updateEstudiante = exports.getEstudianteById = exports.getAllEstudiantes = exports.create = void 0;
const db_1 = require("../../db");
// Creacion de funcion para un INSERT en la BD
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_e, nom_e, dir_e, tel_e, fech_nac } = req.body;
    if (!nom_e || !tel_e || !dir_e || !fech_nac) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    try {
        const query = 'INSERT INTO ingenieria.estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [cod_e, nom_e, dir_e, tel_e, fech_nac];
        const { rows } = yield db_1.db.query(query, values);
        const nuevoEstudiante = rows[0];
        res.status(201).json(nuevoEstudiante);
    }
    catch (error) {
        console.error('Error al insertar estudiante:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.create = create;
// Creacion de funcion para un GET-All en la BD
const getAllEstudiantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM ingenieria.estudiantes';
        const { rows } = yield db_1.db.query(query);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.getAllEstudiantes = getAllEstudiantes;
// Creacion de funcion para un getById en la BD
const getEstudianteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }
    try {
        const query = 'SELECT * FROM ingenieria.estudiantes WHERE cod_e = $1';
        const { rows } = yield db_1.db.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error('Error al obtener el estudiante:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.getEstudianteById = getEstudianteById;
// Creacion de funcion para un UPDATE en la BD
const updateEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { cod_e, nom_e, dir_e, tel_e, fech_nac } = req.body;
    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }
    if (!cod_e || !nom_e || !dir_e || !tel_e || !fech_nac) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    try {
        const query = `
            UPDATE ingenieria.estudiantes 
            SET cod_e = $1, nom_e = $2, dir_e = $3, tel_e = $4, fech_nac = $5
            WHERE cod_e = $6 
            RETURNING *`;
        const values = [cod_e, nom_e, dir_e, tel_e, fech_nac, id];
        const { rows } = yield db_1.db.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error('Error al actualizar estudiante:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.updateEstudiante = updateEstudiante;
