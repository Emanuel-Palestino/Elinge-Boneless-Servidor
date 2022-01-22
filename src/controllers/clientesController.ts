import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'
import pool from '../database';

class ClientesController {

    public async listar(req: Request, res: Response): Promise<void> {
        const respuesta = await pool.query('SELECT * FROM clientes idCliente');
        res.json(respuesta);
    }

    public async listarUno(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        let consulta = 'SELECT * FROM clientes WHERE idCliente = ' + id;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Cliente no encontrado' });
    }

    public async crear(req: Request, res: Response): Promise<void> {
        let contraseña = req.body.contraseña
        let salt = bcrypt.genSaltSync(10)
        bcrypt.hash(contraseña, salt).then(async nuevaContraseña => {
            req.body.contraseña = nuevaContraseña
            const resp = await pool.query("INSERT INTO clientes set ?", [req.body]);
            res.json(resp);
        })

    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { idCliente } = req.params;
        const resp = await pool.query("UPDATE clientes set ? WHERE idCliente = ?", [req.body, idCliente]);
        res.json(resp);
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const { idCliente } = req.params;
        const resp = await pool.query(`DELETE FROM clientes WHERE idCliente= ${idCliente}`);
        res.json(resp);
    }

    public async validar(req: Request, res: Response): Promise<void> {
        const { correo, password } = req.params
        let consulta = 'SELECT idCliente, contraseña FROM clientes WHERE correo=\'' + correo + '\''
        const respuesta = await pool.query(consulta)
        if (respuesta.length > 0) {
            bcrypt.compare(password, respuesta[0].contraseña, (err, resComp) => {
                if (resComp)
                    res.json(respuesta[0].idCliente)
                else
                    res.json(-1)
                return
            })
        } else
            res.json(-1)
    }

}

export const clientesController = new ClientesController();