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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.direccionesController = void 0;
const database_1 = __importDefault(require("../database"));
class DireccionesController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM direcciones ORDER BY idDireccion');
            res.json(respuesta);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let consulta = `SELECT * FROM direcciones WHERE idDireccion = ${id}`;
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Dirección no encontrada' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query('INSERT INTO direcciones set ?', [req.body]);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idDireccion } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query('UPDATE direcciones set ? WHERE idDireccion = ?', [req.body, idDireccion]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idDireccion } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM direcciones WHERE idDireccion = ${idDireccion}`);
            res.json(resp);
        });
    }
    direccionesPorCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            const respuesta = yield database_1.default.query(`SELECT * FROM direcciones WHERE idCliente=${idCliente}`);
            res.json(respuesta);
        });
    }
}
exports.direccionesController = new DireccionesController();
