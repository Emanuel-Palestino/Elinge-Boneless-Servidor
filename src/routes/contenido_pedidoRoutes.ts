import { Router } from "express";
import { contenido_pedidoController } from "../controllers/contenido_pedidoController";

class ContenidoPedidoRoutes{
	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		this.router.get('/', contenido_pedidoController.listar);
		this.router.get('/:id', contenido_pedidoController.listarUno);
		this.router.post('/crear', contenido_pedidoController.crear);
		this.router.delete('/eliminar/:idOrden',contenido_pedidoController.eliminar);
		this.router.put('/actualizar/:idOrden',contenido_pedidoController.actualizar);
	}
}

const contenido_pedidoRoutes = new ContenidoPedidoRoutes();
export default contenido_pedidoRoutes.router;