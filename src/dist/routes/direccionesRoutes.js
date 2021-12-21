"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const direccionesController_1 = require("../controllers/direccionesController");
class DireccionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', direccionesController_1.direccionesController.listar);
        this.router.get('/:id', direccionesController_1.direccionesController.listarUno);
        this.router.post('/crear', direccionesController_1.direccionesController.crear);
        this.router.put('/actualizar/:idDireccion', direccionesController_1.direccionesController.actualizar);
        this.router.delete('/eliminar/:idDireccion', direccionesController_1.direccionesController.eliminar);
    }
}
const direccionesRoutes = new DireccionesRoutes();
exports.default = direccionesRoutes.router;
