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
exports.administracionController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../database"));
class AdministracionController {
    validar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.params;
            let consulta = 'SELECT idUsuario, contraseña FROM administracion WHERE correo=\'' + correo + '\'';
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                bcryptjs_1.default.compare(password, respuesta[0].contraseña, (err, resComp) => {
                    if (resComp)
                        res.json(true);
                    else
                        res.json(false);
                    return;
                });
            }
            else
                res.json(false);
        });
    }
}
exports.administracionController = new AdministracionController();
