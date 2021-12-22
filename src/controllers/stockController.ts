import { Request, Response } from "express";
import pool from "../database";

class StockController{

	public async obtener(req: Request,res: Response): Promise<void>{
		const respuesta = await pool.query('SELECT * FROM stock WHERE idStock=1');
		res.json(respuesta);
	}

	public async actualizar(req: Request, res: Response): Promise<void>{
		const resp = await pool.query('UPDATE stock set ? WHERE idStock=?', [req.body, 1]);
		res.json(resp);
	}
}

export const stockController = new StockController();