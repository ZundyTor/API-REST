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
exports.updateImparte = exports.getProfesoresByAsignatura = exports.getAsignaturasByProfesor = void 0;
const db_1 = require("../../db");
// Función para obtener las asignaturas que imparte un profesor
const getAsignaturasByProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { rows } = yield db_1.db.query(query, [id_p]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error('Error al obtener asignaturas por profesor:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.getAsignaturasByProfesor = getAsignaturasByProfesor;
// Función para obtener los profesores que imparten una asignatura
const getProfesoresByAsignatura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { rows } = yield db_1.db.query(query, [cod_a]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error('Error al obtener profesores por asignatura:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.getProfesoresByAsignatura = getProfesoresByAsignatura;
// Función para actualizar el grupo y el horario de una relación Imparte
const updateImparte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { rows } = yield db_1.db.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Relación Imparte no encontrada' });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error('Error al actualizar Imparte:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.updateImparte = updateImparte;
