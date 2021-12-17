import { Request, Response } from 'express';

import pool from '../database';
class ClientesController {
    public async listar(req: Request, res: Response): Promise<void> {
        const respuesta = await pool.query('SELECT * FROM clientes idCliente');
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listarUno(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        let consulta = 'SELECT * FROM clientes WHERE idCliente = ' + id;
        const respuesta = await pool.query(consulta);
        console.log(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Cliente no encontrado' });
    }
    public async crear(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO clientes set ?",
            [req.body]);
        res.json(resp);
    }
    public async actualizar(req: Request, res: Response): Promise<void> {
        const { idCliente } = req.params;
        console.log(idCliente);
        const resp = await pool.query("UPDATE clientes set ? WHERE idCliente = ?", [req.body, idCliente]);
        res.json(resp);
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const { idCliente } = req.params;
        const resp = await pool.query(`DELETE FROM clientes WHERE idCliente= ${idCliente}`);
        res.json(resp);
    }
}
export const clientesController = new ClientesController();