import { Router } from "express";
import { pedidosController } from "../controllers/pedidosController";

class PedidosRoutes{
	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		this.router.get('/', pedidosController.listar);
		this.router.get('/:id', pedidosController.listarUno);
		this.router.post('/crear', pedidosController.crear);
		this.router.delete('/eliminar/:idOrden',pedidosController.eliminar);
		this.router.put('/actualizar/:idOrden',pedidosController.actualizar);
	}
}

const pedidosRoutes = new PedidosRoutes();
export default pedidosRoutes.router;