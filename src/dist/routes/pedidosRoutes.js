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
        this.router.get('/finalizados', pedidosController_1.pedidosController.listarPedidosFinalizados);
        this.router.get('/noFinalizados', pedidosController_1.pedidosController.listarPedidosNoFinalizados);
        this.router.get('/pedidosCompletos', pedidosController_1.pedidosController.listarPedidosCompletos);
        this.router.get('/:id', pedidosController_1.pedidosController.listarUno);
        this.router.post('/crear', pedidosController_1.pedidosController.crear);
        this.router.delete('/eliminar/:idPedido', pedidosController_1.pedidosController.eliminar);
        this.router.put('/actualizar/:idPedido', pedidosController_1.pedidosController.actualizar);
        this.router.get('/cliente/finalizados/:idCliente', pedidosController_1.pedidosController.listarPedidosFinalizadosCliente);
        this.router.get('/cliente/noFinalizados/:idCliente', pedidosController_1.pedidosController.listarPedidosNoFinalizadosCliente);
        this.router.get('/cliente/pedidosCompletos/:idCliente', pedidosController_1.pedidosController.listarPedidosCompletosPorCliente);
    }
}
const pedidosRoutes = new PedidosRoutes();
exports.default = pedidosRoutes.router;
