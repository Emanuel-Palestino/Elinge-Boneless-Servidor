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
            let date_ob = new Date();
            // adjust 0 before single digit date
            let date = ("0" + date_ob.getDate()).slice(-2);
            // current month
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            // current year
            let year = date_ob.getFullYear();
            // current hours
            let hours = date_ob.getHours();
            // current minutes
            let minutes = date_ob.getMinutes();
            // current seconds
            let seconds = date_ob.getSeconds();
            const actualdate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
            //fuente: https://gist.github.com/MythRen/c4921735812dd2c0217a
            req.body.pedido['fecha'] = actualdate;
            const resp = yield database_1.default.query('INSERT INTO pedidos set ?', [req.body.pedido]);
            res.json(resp);
            //buscar el idDelpedido que se agregó
            //const {idPedido} = resp.idPedido['idPedido'];
            const idPedidoAux = resp.body.pedido['idPedido'];
            req.body.contenido_Pedido['idPedido'] = idPedidoAux;
            //req.body.contenido_Pedido['idPedido']=idPedido;
            //agregar el idPedido en el body de contenido_pedido  anexar hora a pedido
            yield database_1.default.query('INSERT INTO contenido_pedido set ?', [req.body.contenido_Pedido]);
            res.json(resp);
        });
    }
}
exports.realizarPedidoController = new RealizarPedidoController();
