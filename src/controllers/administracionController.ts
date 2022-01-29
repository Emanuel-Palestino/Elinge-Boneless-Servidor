import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'
import pool from '../database';

class AdministracionController {

    public async validar(req: Request, res: Response): Promise<void> {
        const { correo, password } = req.params
        let consulta = 'SELECT idUsuario, contraseña FROM administracion WHERE correo=\'' + correo + '\''
        const respuesta = await pool.query(consulta)
        if (respuesta.length > 0) {
            bcrypt.compare(password, respuesta[0].contraseña, (err, resComp) => {
                if (resComp)
                    res.json(true)
                else
                    res.json(false)
                return
            })
        } else
            res.json(false)
    }
}

export const administracionController = new AdministracionController();