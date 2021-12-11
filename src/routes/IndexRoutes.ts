import { Router } from 'express'
class IndexRoutes {
	
	public router: Router = Router()

	constructor() {
		this.config()
	}

	config() : void {
		this.router.get('/', (req, res) => res.send('Boneless El Inge'));
		this.router.get('/contenido_pedido/', (req,res) => res.send('Probando contenido pedido'));

}

const indexRoutes = new IndexRoutes()
export default indexRoutes.router