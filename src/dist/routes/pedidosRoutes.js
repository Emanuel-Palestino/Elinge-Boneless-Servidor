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
        this.router.delete('/eliminar/:idOrden', pedidosController_1.pedidosController.eliminar);
        this.router.put('/actualizar/:idOrden', pedidosController_1.pedidosController.actualizar);
    }
}
const pedidosRoutes = new PedidosRoutes();
exports.default = pedidosRoutes.router;
