"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidosController_1 = require("../controllers/pedidosController");
class PedidosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', pedidosController_1.pedidosController.listar);
        this.router.get('/:id', pedidosController_1.pedidosController.listarUno);
        this.router.post('/crear', pedidosController_1.pedidosController.crear);
        this.router.delete('/eliminar/:idPedido', pedidosController_1.pedidosController.eliminar);
        this.router.put('/actualizar/:idPedido', pedidosController_1.pedidosController.actualizar);
        this.router.get('/finalizados/lista', pedidosController_1.pedidosController.listarPedidosFinalizados);
        this.router.get('/noFinalizados/lista', pedidosController_1.pedidosController.listarPedidosNoFinalizados);
        this.router.get('/finalizados/cliente/:idCliente', pedidosController_1.pedidosController.listarPedidosFinalizadosCliente);
        this.router.get('/noFinalizados/cliente/:idCliente', pedidosController_1.pedidosController.listarPedidosNoFinalizadosCliente);
    }
}
const pedidosRoutes = new PedidosRoutes();
exports.default = pedidosRoutes.router;