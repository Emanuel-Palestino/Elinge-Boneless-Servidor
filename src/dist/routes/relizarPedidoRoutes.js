"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const realizarPedidoController_1 = require("../controllers/realizarPedidoController");
class RealizarPedidoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', realizarPedidoController_1.realizarPedidoController.realizar);
    }
}
const realizarPedidoRoutes = new RealizarPedidoRoutes();
exports.default = realizarPedidoRoutes.router;
