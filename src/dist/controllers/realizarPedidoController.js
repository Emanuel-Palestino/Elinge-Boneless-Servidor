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
exports.realizarPedidoController = void 0;
const database_1 = __importDefault(require("../database"));
class RealizarPedidoController {
    realizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let fecha_ob = new Date();
            // adjust 0 before single digit date
            let fecha = ("0" + fecha_ob.getDate()).slice(-2);
            // current month
            let mes = ("0" + (fecha_ob.getMonth() + 1)).slice(-2);
            // current year
            let anyo = fecha_ob.getFullYear();
            // current hours
            let hora = fecha_ob.getHours();
            // current minutes
            let minutos = fecha_ob.getMinutes();
            // current seconds
            let segundos = fecha_ob.getSeconds();
            const fechaActual = anyo + "-" + mes + "-" + fecha + " " + hora + ":" + minutos + ":" + segundos;
            //fuente: https://gist.github.com/MythRen/c4921735812dd2c0217a
            req.body.pedido['fecha'] = fechaActual;
            const resultado = yield database_1.default.query('INSERT INTO pedidos set ?', [req.body.pedido]);
            const idPedidoAux = resultado['insertId'];
            req.body.contenido_pedido['idPedido'] = idPedidoAux;
            yield database_1.default.query('INSERT INTO contenido_pedido set ?', [req.body.contenido_pedido]);
            res.json(resultado);
        });
    }
}
exports.realizarPedidoController = new RealizarPedidoController();
