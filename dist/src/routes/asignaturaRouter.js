"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignaturaRouter = void 0;
// Importacion de librerias y objetos
const express_1 = __importDefault(require("express"));
const asignaturaController = __importStar(require("../controllers/asignaturaController"));
// Crear instancia del enrutador
const asignaturaRouter = express_1.default.Router();
exports.asignaturaRouter = asignaturaRouter;
// Definir las ruta
asignaturaRouter.post('/', asignaturaController.create); // Referencia a la función create
asignaturaRouter.get('/', asignaturaController.getAllAsignaturas); // Referencia a la función getAllAsignaturas
asignaturaRouter.get('/:id', asignaturaController.getAsignaturaById); // Referencia a la función getAsignaturaById
asignaturaRouter.put('/:id', asignaturaController.updateAsignatura); // Referencia a la función updateAsignatura
