import { Request, Response } from "express";
import pool from "../database";

class RealizarPedidoController {

	public async realizar(req: Request, res: Response): Promise<void> {

		let fecha_ob = new Date();

		// adjust 0 before single digit date
		let fecha = ("0" + fecha_ob.getDate()).slice(-2);

		// current month
		let mes = ("0" + (fecha_ob.getMonth() + 1)).slice(-2);

		// current year
		let anyo = fecha_ob.getFullYear();

		// current hours
		let hora = fecha_ob.getHours();

		// current minutes
		let minutos = fecha_ob.getMinutes();

		// current seconds
		let segundos = fecha_ob.getSeconds();

		const fechaActual = anyo + "-" + mes + "-" + fecha + " " + hora + ":" + minutos + ":" + segundos;

		//fuente: https://gist.github.com/MythRen/c4921735812dd2c0217a

		req.body.pedido['fecha'] = fechaActual;

		const resultado = await pool.query('INSERT INTO pedidos set ?', [req.body.pedido]);
		const idPedidoAux = resultado['insertId'];

		req.body.contenido_pedido['idPedido'] = idPedidoAux;
		await pool.query('INSERT INTO contenido_pedido set ?', [req.body.contenido_pedido]);
		res.json(resultado);
	}
}

export const realizarPedidoController = new RealizarPedidoController();