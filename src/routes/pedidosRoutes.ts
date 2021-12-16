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
		this.router.delete('/eliminar/:idPedido',pedidosController.eliminar);
		this.router.put('/actualizar/:idPedido',pedidosController.actualizar);
		this.router.get('/finalizados/lista', pedidosController.listarPedidosFinalizados);
		this.router.get('/noFinalizados/lista', pedidosController.listarPedidosNoFinalizados);
		this.router.get('/finalizados/cliente/:idCliente', pedidosController.listarPedidosFinalizadosCliente);
		this.router.get('/noFinalizados/cliente/:idCliente', pedidosController.listarPedidosNoFinalizadosCliente);

	}
}

const pedidosRoutes = new PedidosRoutes();
export default pedidosRoutes.router;