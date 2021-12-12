"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contenidoPedidoController_1 = require("../controllers/contenidoPedidoController");
class ContenidoPedidoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', contenidoPedidoController_1.contenidoPedidoController.listar);
        this.router.get('/:id', contenidoPedidoController_1.contenidoPedidoController.listarUno);
        this.router.post('/crear', contenidoPedidoController_1.contenidoPedidoController.crear);
        this.router.delete('/eliminar/:idOrden', contenidoPedidoController_1.contenidoPedidoController.eliminar);
        this.router.put('/actualizar/:idOrden', contenidoPedidoController_1.contenidoPedidoController.actualizar);
    }
}
const contenidoPedidoRoutes = new ContenidoPedidoRoutes();
exports.default = contenidoPedidoRoutes.router;
