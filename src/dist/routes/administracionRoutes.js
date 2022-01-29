"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administracionController_1 = require("../controllers/administracionController");
class AdministracionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/validar/:correo/:password', administracionController_1.administracionController.validar);
    }
}
const administracionRoutes = new AdministracionRoutes();
exports.default = administracionRoutes.router;
