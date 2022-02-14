import { Request, Response } from "express";
import pool from "../database";
class PedidosController {
	public async listar(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM pedidos ORDER BY idPedido');
		res.json(respuesta);
	}

	public async listarUno(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		let consulta = `SELECT * FROM pedidos WHERE idPedido = ${id}`;
		const respuesta = await pool.query(consulta);
		if (respuesta.length > 0) {
			res.json(respuesta[0]);
			return;
		}
		res.status(404).json({ 'mensaje': 'Pedido no encontrado' });
	}

	public async crear(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('INSERT INTO pedidos set ?', [req.body]);
		res.json(respuesta);
	}

	public async eliminar(req: Request, res: Response) {
		const { idPedido } = req.params;
		const respuesta = await pool.query(`DELETE FROM pedidos WHERE idPedido= ${idPedido}`);
		res.json(respuesta);
	}

	public async actualizar(req: Request, res: Response): Promise<void> {
		const { idPedido } = req.params;
		const respuesta = await pool.query('UPDATE pedidos set ? WHERE idPedido = ?', [req.body, idPedido]);
		res.json(respuesta);
	}

	public async listarPedidosFinalizados(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM pedidos WHERE finalizado = 1');
		res.json(respuesta);
	}

	public async listarPedidosNoFinalizados(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM pedidos WHERE finalizado = 0');
		res.json(respuesta);
	}

	public async listarPedidosFinalizadosCliente(req: Request, res: Response): Promise<void> {
		const { idCliente } = req.params;
		const respuesta = await pool.query('SELECT * FROM pedidos WHERE finalizado = 1 AND idCliente = ?', [idCliente]);
		res.json(respuesta);
	}

	public async listarPedidosNoFinalizadosCliente(req: Request, res: Response): Promise<void> {
		const { idCliente } = req.params;
		const respuesta = await pool.query('SELECT * FROM pedidos WHERE finalizado = 0 AND idCliente = ?', [idCliente]);
		res.json(respuesta);
	}

	public async listarPedidosCompletosPorCliente(req: Request, res: Response): Promise<void> {
		const { idCliente } = req.params
		const respuesta  = await pool.query('SELECT * FROM pedidos as P INNER JOIN direcciones D on P.idDireccion = D.idDireccion INNER JOIN contenido_pedido CP ON CP.idPedido = P.idPedido WHERE P.idCliente = ?', [idCliente])
		res.json(respuesta)
	}

	public async listarPedidosCompletos(req: Request, res: Response): Promise<void> {
		const respuesta  = await pool.query('SELECT * FROM pedidos as P INNER JOIN direcciones D on P.idDireccion = D.idDireccion INNER JOIN contenido_pedido CP ON CP.idPedido = P.idPedido')
		res.json(respuesta)
	}

	public async listarPedidosCompletosFinalizados(req: Request, res: Response): Promise<void> {
		const respuesta  = await pool.query('SELECT * FROM pedidos as P INNER JOIN direcciones D on P.idDireccion = D.idDireccion INNER JOIN contenido_pedido CP ON CP.idPedido = P.idPedido WHERE P.finalizado = 1')
		res.json(respuesta)
	}

	public async listarPedidosCompletosNoFinalizados(req: Request, res: Response): Promise<void> {
		const respuesta  = await pool.query('SELECT * FROM pedidos as P INNER JOIN direcciones D on P.idDireccion = D.idDireccion INNER JOIN contenido_pedido CP ON CP.idPedido = P.idPedido WHERE P.finalizado = 0')
		res.json(respuesta)
	}

}

export const pedidosController = new PedidosController();