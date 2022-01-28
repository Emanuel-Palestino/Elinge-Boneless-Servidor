import { Router } from "express";
import { direccionesController } from "../controllers/direccionesController";

class DireccionesRoutes{
	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		this.router.get('/', direccionesController.listar);
		this.router.get('/:id', direccionesController.listarUno);
		this.router.post('/crear', direccionesController.crear);
		this.router.get('/cliente/:idCliente', direccionesController.direccionesPorCliente);
        this.router.put('/actualizar/:idDireccion',direccionesController.actualizar);
		this.router.delete('/eliminar/:idDireccion',direccionesController.eliminar);
	}
}

const direccionesRoutes = new DireccionesRoutes();
export default direccionesRoutes.router;