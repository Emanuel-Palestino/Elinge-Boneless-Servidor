import { Router } from "express";
import { contenidoPedidoController } from "../controllers/contenidoPedidoController";

class ContenidoPedidoRoutes{
	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		this.router.get('/', contenidoPedidoController.listar);
		this.router.get('/:id', contenidoPedidoController.listarUno);
		this.router.post('/crear', contenidoPedidoController.crear);
		this.router.delete('/eliminar/:idOrden',contenidoPedidoController.eliminar);
		this.router.put('/actualizar/:idOrden',contenidoPedidoController.actualizar);
	}
}

const contenidoPedidoRoutes = new ContenidoPedidoRoutes();
export default contenidoPedidoRoutes.router;