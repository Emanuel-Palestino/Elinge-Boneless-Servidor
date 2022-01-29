import { Router } from 'express';
import { administracionController } from '../controllers/administracionController';

class AdministracionRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/validar/:correo/:password', administracionController.validar);
    }
}
const administracionRoutes= new AdministracionRoutes();
export default administracionRoutes.router;