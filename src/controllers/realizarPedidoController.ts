import { Request, Response } from "express";
import pool from "../database";

class RealizarPedidoController{

	public async realizar(req: Request, res:Response): Promise<void>{
        //insertar en contenido_pedido: idOrden	idPedido	subtotal	cantidadBoneless	cantidadPapas	mangoHabanero	bbq	bufalo	piñaHabanero	papasEspeciales	

		const resp = await pool.query('INSERT INTO contenido_pedido set ?', [req.body]);
		res.json(resp);
	}
}

export const realizarPedidoController = new RealizarPedidoController();