import { Request, Response } from 'express';
import pool from '../database';

class DireccionesController{
    public async listar(req: Request,res: Response): Promise<void>{
		const respuesta = await pool.query('SELECT * FROM direcciones ORDER BY idDireccion');
		res.json(respuesta);
	}

	public async listarUno(req: Request, res: Response): Promise<void>{
		const {id} = req.params;
		let consulta = `SELECT * FROM direcciones WHERE idDireccion = ${id}`;
		const respuesta = await pool.query(consulta);
		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}
		res.status(404).json({'mensaje':'Dirección no encontrada'});
	}

    public async crear(req: Request, res: Response): Promise<void> {
        const resp = await pool.query('INSERT INTO direcciones set ?',[req.body]);
        res.json(resp);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { idDireccion } = req.params;
        console.log(req.params);
        const resp = await pool.query('UPDATE direcciones set ? WHERE idDireccion = ?', [req.body, idDireccion]);
        res.json(resp);
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const { idDireccion } = req.params;
        const resp = await pool.query(`DELETE FROM direcciones WHERE idDireccion = ${idDireccion}`);
        res.json(resp);
    }
}   
export const direccionesController = new DireccionesController();