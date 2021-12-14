import { Request, Response } from "express";
import pool from "../database";

class RealizarPedidoController{

	

	public async realizar(req: Request, res:Response): Promise<void>{

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

		req.body.pedido['fecha']=actualdate;

		const resp = await pool.query('INSERT INTO pedidos set ?', [req.body.pedido]);
		res.json(resp);
		//buscar el idDelpedido que se agregó
		//const {idPedido} = resp.idPedido['idPedido'];
		const idPedidoAux=resp.body.pedido['idPedido'];
		
		req.body.contenido_Pedido['idPedido']=idPedidoAux;

		//req.body.contenido_Pedido['idPedido']=idPedido;
		//agregar el idPedido en el body de contenido_pedido  anexar hora a pedido
        await pool.query('INSERT INTO contenido_pedido set ?', [req.body.contenido_Pedido]);
		res.json(resp);
	}
}

export const realizarPedidoController = new RealizarPedidoController();