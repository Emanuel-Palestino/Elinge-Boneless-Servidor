import { Request, Response } from "express";
import pool from "../database";

class PedidosController{
	public async listar(req: Request,res: Response): Promise<void>{
		const respuesta = await pool.query('SELECT * FROM pedidos ORDER BY idPedido');
		// console.log(respuesta);
		res.json(respuesta);
	}

	public async listarUno(req: Request, res: Response): Promise<void>{
		const {id} = req.params;
		let consulta = `SELECT * FROM pedidos WHERE idPedido = ${id}`;
		const respuesta = await pool.query(consulta);
		// console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje':'Pedido no encontrada'});
	}

	public async crear(req: Request, res:Response): Promise<void>{
		const resp = await pool.query('INSERT INTO pedidos set ?', [req.body]);
		res.json(resp);
	}

	public async eliminar(req: Request, res:Response){
		const {idPedido} = req.params;
		const resp = await pool.query(`DELETE FROM pedidos WHERE idPedido = ${idPedido}`);
		res.json(resp);
	}

	public async actualizar(req: Request, res: Response): Promise<void>{
		const {idPedido} = req.params;
		const resp = await pool.query('UPDATE pedidos set ? WHERE IdPedido = ?', [req.body, idPedido]);
		res.json(resp);
	}
}

export const pedidosController = new PedidosController();