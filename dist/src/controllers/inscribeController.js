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
exports.updateNotas = exports.getAsignaturasByEstudiante = exports.getEstudiantesByAsignaturaGrupo = void 0;
const db_1 = require("../../db");
// Consultar estudiantes y sus notas por asignatura y grupo
const getEstudiantesByAsignaturaGrupo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_a = req.query.cod_a;
    const grupo = req.query.grupo;
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
        const { rows } = yield db_1.db.query(query, [cod_a, grupo]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error('Error al obtener estudiantes por asignatura y grupo:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.getEstudiantesByAsignaturaGrupo = getEstudiantesByAsignaturaGrupo;
// Listar las asignaturas que ve un estudiante en particular y sus notas
const getAsignaturasByEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_e } = req.params;
    try {
        const query = `
            SELECT a.cod_a, a.nom_a, i.n1, i.n2, i.n3
            FROM ingenieria.inscribe i
            JOIN ingenieria.asignaturas a ON i.cod_a = a.cod_a
            WHERE i.cod_e = $1
        `;
        const { rows } = yield db_1.db.query(query, [cod_e]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error('Error al obtener asignaturas por estudiante:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.getAsignaturasByEstudiante = getAsignaturasByEstudiante;
// Editar las notas de un estudiante para una asignatura en particular
const updateNotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_e = req.query.cod_e;
    const cod_a = req.query.cod_a;
    const id_p = req.query.id_p;
    const grupo = req.query.grupo;
    const { n1, n2, n3 } = req.body;
    try {
        const query = `
            UPDATE ingenieria.inscribe
            SET n1 = $1, n2 = $2, n3 = $3
            WHERE cod_e = $4 AND cod_a = $5 AND id_p = $6 AND grupo = $7
            RETURNING *
        `;
        const { rows } = yield db_1.db.query(query, [n1, n2, n3, cod_e, cod_a, id_p, grupo]);
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error('Error al actualizar las notas:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.updateNotas = updateNotas;
