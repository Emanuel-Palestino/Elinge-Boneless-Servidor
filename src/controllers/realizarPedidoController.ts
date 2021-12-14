import { Request, Response } from "express";
import pool from "../database";

class RealizarPedidoController{

	

	public async realizar(req: Request, res:Response): Promise<void>{
		const resp = await pool.query('INSERT INTO pedidos set ?', [req.body.pedido]);
		res.json(resp);
		//buscar el idDelpedido que se agregó
		const {idPedido} = resp.idPedido['idPedido'];

		req.body.contenido_Pedido['idPedido']=idPedido;
		//agregar el idPedido en el body de contenido_pedido  anexar hora a pedido
        await pool.query('INSERT INTO contenido_pedido set ?', [req.body.contenido_Pedido]);
		res.json(resp);
	}
}

export const realizarPedidoController = new RealizarPedidoController();