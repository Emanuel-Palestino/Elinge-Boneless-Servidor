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
exports.pedidosController = void 0;
const database_1 = __importDefault(require("../database"));
class PedidosController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM pedidos ORDER BY idPedido');
            res.json(respuesta);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let consulta = `SELECT * FROM pedidos WHERE idPedido = ${id}`;
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Pedido no encontrado' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('INSERT INTO pedidos set ?', [req.body]);
            res.json(respuesta);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPedido } = req.params;
            const respuesta = yield database_1.default.query(`DELETE FROM pedidos WHERE idPedido= ${idPedido}`);
            res.json(respuesta);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPedido } = req.params;
            const respuesta = yield database_1.default.query('UPDATE pedidos set ? WHERE idPedido = ?', [req.body, idPedido]);
            res.json(respuesta);
        });
    }
    listarPedidosFinalizados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM pedidos WHERE finalizado = 1');
            res.json(respuesta);
        });
    }
    listarPedidosNoFinalizados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM pedidos WHERE finalizado = 0');
            res.json(respuesta);
        });
    }
    listarPedidosFinalizadosCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM pedidos WHERE finalizado = 1 AND idCliente = ?', [idCliente]);
            res.json(respuesta);
        });
    }
    listarPedidosNoFinalizadosCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM pedidos WHERE finalizado = 0 AND idCliente = ?', [idCliente]);
            res.json(respuesta);
        });
    }
    listarPedidosCompletosPorCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM pedidos as P INNER JOIN direcciones D on P.idDireccion = D.idDireccion INNER JOIN contenido_pedido CP ON CP.idPedido = P.idPedido WHERE P.idCliente = ? ORDER BY fecha DESC', [idCliente]);
            res.json(respuesta);
        });
    }
    listarPedidosCompletos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM pedidos as P INNER JOIN direcciones D on P.idDireccion = D.idDireccion INNER JOIN contenido_pedido CP ON CP.idPedido = P.idPedido ORDER BY fecha DESC');
            res.json(respuesta);
        });
    }
    listarPedidosCompletosFinalizados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT P.*, D.*, CP.*, C.nombre, C.apellidos, C.telefono FROM pedidos as P INNER JOIN direcciones D on P.idDireccion = D.idDireccion INNER JOIN contenido_pedido CP ON CP.idPedido = P.idPedido INNER JOIN clientes C ON P.idCliente = C.idCliente WHERE P.finalizado = 1 ORDER BY fecha DESC');
            res.json(respuesta);
        });
    }
    listarPedidosCompletosNoFinalizados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT P.*, D.*, CP.*, C.nombre, C.apellidos, C.telefono FROM pedidos as P INNER JOIN direcciones D on P.idDireccion = D.idDireccion INNER JOIN contenido_pedido CP ON CP.idPedido = P.idPedido INNER JOIN clientes C ON P.idCliente = C.idCliente WHERE P.finalizado = 0 ORDER BY fecha DESC');
            res.json(respuesta);
        });
    }
    finalizarPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPedido } = req.params;
            const respuesta = yield database_1.default.query('UPDATE pedidos SET ? WHERE pedidos.idPedido = ?', [req.body, idPedido]);
            res.json(respuesta);
        });
    }
}
exports.pedidosController = new PedidosController();
