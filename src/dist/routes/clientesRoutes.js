"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesController_1 = require("../controllers/clientesController");
class ClientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', clientesController_1.clientesController.listar);
        this.router.get('/:id', clientesController_1.clientesController.listarUno);
        this.router.post('/crear', clientesController_1.clientesController.crear);
        this.router.put('/actualizar/:idCliente', clientesController_1.clientesController.actualizar);
        this.router.delete('/eliminar/:idCliente', clientesController_1.clientesController.eliminar);
        this.router.get('/:correo/:password', clientesController_1.clientesController.validar);
    }
}
const clientesRoutes = new ClientesRoutes();
exports.default = clientesRoutes.router;
