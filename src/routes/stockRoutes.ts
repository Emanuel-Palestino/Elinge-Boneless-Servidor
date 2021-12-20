import { Router } from "express";
import { stockController } from '../controllers/stockController'

class StockRoutes{
	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void{
		this.router.get('/', stockController.obtener);
		this.router.put('/actualizar',stockController.actualizar);
	}
}

const stockRoutes = new StockRoutes();
export default stockRoutes.router;