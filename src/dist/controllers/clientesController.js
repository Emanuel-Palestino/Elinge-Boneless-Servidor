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
exports.clientesController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../database"));
class ClientesController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM clientes idCliente');
            res.json(respuesta);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let consulta = 'SELECT * FROM clientes WHERE idCliente = ' + id;
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Cliente no encontrado' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let contraseña = req.body.contraseña;
            let salt = bcryptjs_1.default.genSaltSync(10);
            bcryptjs_1.default.hash(contraseña, salt).then((nuevaContraseña) => __awaiter(this, void 0, void 0, function* () {
                req.body.contraseña = nuevaContraseña;
                const resp = yield database_1.default.query("INSERT INTO clientes set ?", [req.body]);
                res.json(resp);
            }));
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            const resp = yield database_1.default.query("UPDATE clientes set ? WHERE idCliente = ?", [req.body, idCliente]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM clientes WHERE idCliente= ${idCliente}`);
            res.json(resp);
        });
    }
    validar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.params;
            let consulta = 'SELECT idCliente, contraseña FROM clientes WHERE correo=\'' + correo + '\'';
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                bcryptjs_1.default.compare(password, respuesta[0].contraseña, (err, resComp) => {
                    if (resComp)
                        res.json(respuesta[0].idCliente);
                    else
                        res.json(-1);
                    return;
                });
            }
            else
                res.json(-1);
        });
    }
    encriptar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { palabra } = req.params;
            let salt = bcryptjs_1.default.genSaltSync(10);
            bcryptjs_1.default.hash(palabra, salt).then((nuevaContraseña) => __awaiter(this, void 0, void 0, function* () {
                res.json(nuevaContraseña);
            }));
        });
    }
}
exports.clientesController = new ClientesController();
