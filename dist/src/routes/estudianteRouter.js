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
exports.estudianteRouter = void 0;
// Importacion de librerias y objetos
const express_1 = __importDefault(require("express"));
const estudianteController = __importStar(require("../controllers/estudianteController"));
// Crear instancia del enrutador
const estudianteRouter = express_1.default.Router();
exports.estudianteRouter = estudianteRouter;
// Definir las ruta
estudianteRouter.post('/', estudianteController.create); // Referencia a la función create
estudianteRouter.get('/', estudianteController.getAllEstudiantes); // Referencia a la función getAllEstudiantes
estudianteRouter.get('/:id', estudianteController.getEstudianteById); // Referencia a la función getEstudianteById
estudianteRouter.put('/:id', estudianteController.updateEstudiante); // Referencia a la función updateEstudiante
