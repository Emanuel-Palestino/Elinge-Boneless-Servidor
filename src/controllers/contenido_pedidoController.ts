import { Request, Response } from "express";
import pool from "../database";

class ContenidoPedidoController{
	public async listar(req: Request,res: Response): Promise<void>{
		const respuesta = await pool.query('SELECT * FROM contenido_pedido ORDER BY idOrden');
		console.log(respuesta);
		res.json(respuesta);
	}

	public async listarUno(req: Request, res: Response): Promise<void>{
		const {id} = req.params;
		let consulta = `SELECT * FROM contenido_pedido WHERE idOrden = ${id}`;
		const respuesta = await pool.query(consulta);
		console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje':'Orden no encontrado'});
	}

	public async crear(req: Request, res:Response): Promise<void>{
		const resp = await pool.query('INSERT INTO contenido_pedido set ?', [req.body]);
		res.json(resp);
	}

	public async eliminar(req: Request, res:Response){
		const {idOrden} = req.params;
		const resp = await pool.query(`DELETE FROM contenido_pedido WHERE idOrden = ${idOrden}`);
		res.json(resp);
	}

	public async actualizar(req: Request, res: Response): Promise<void>{
		const {idOrden} = req.params;
		const resp = await pool.query('UPDATE contenido_pedido set ? WHERE IdOrden = ?', [req.body, idOrden]);
		res.json(resp);
	}
}

export const contenido_pedidoController = new ContenidoPedidoController();