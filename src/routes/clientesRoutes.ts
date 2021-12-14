import { Router } from 'express';
import { clientesController } from '../controllers/clientesController';
class ClientesRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/', clientesController.listar);
        this.router.get('/:id', clientesController.listaruno );
        this.router.post('/crear', clientesController.crear );
        this.router.put('/actualizar/:idCliente', clientesController.actualizar);
        this.router.delete('/eliminar/:idCliente', clientesController.eliminar );
    }
}
const clientesRoutes= new ClientesRoutes();
export default clientesRoutes.router;