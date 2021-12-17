import morgan from 'morgan'
import cors from 'cors'
import express, {Application} from 'express'
import swagger_ui_express from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

import indexRoutes from './routes/IndexRoutes'
import contenidoPedidoRoutes from './routes/contenidoPedidoRoutes'
import relizarPedidoRoutes from './routes/relizarPedidoRoutes'

class Server {

	public app: Application

	constructor() {
		this.app = express()
		this.config()
		this.routes()
		this.app.use('/api/documentacion', swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument))
	}

	config(): void {
		this.app.set('port', process.env.PORT || 3000)
		this.app.use(morgan('dev'))
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use(express.urlencoded({extended: false}))
	}

	routes(): void {
		this.app.use(indexRoutes);
		this.app.use('/api/contenidoPedido',contenidoPedidoRoutes);
		this.app.use('/api/realizarPedido',relizarPedidoRoutes);
	}

	start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server on port', this.app.get('port'))
			console.log('Visit', 'http://localhost:' + this.app.get('port'), 'to check')
		})
	}

}

const server = new Server()
server.start()
