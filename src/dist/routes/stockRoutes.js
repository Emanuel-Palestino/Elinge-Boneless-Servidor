"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockController_1 = require("../controllers/stockController");
class StockRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', stockController_1.stockController.obtener);
        this.router.put('/actualizar', stockController_1.stockController.actualizar);
    }
}
const stockRoutes = new StockRoutes();
exports.default = stockRoutes.router;
