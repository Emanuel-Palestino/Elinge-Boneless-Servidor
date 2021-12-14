import { Router } from "express";
import { realizarPedidoController } from "../controllers/realizarPedidoController";

class RealizarPedidoRoutes{
	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		this.router.post('/', realizarPedidoController.realizar);
	}
}

const realizarPedidoRoutes = new RealizarPedidoRoutes();
export default realizarPedidoRoutes.router;