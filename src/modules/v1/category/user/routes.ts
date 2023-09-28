import { Router} from 'express';
import controller from './controller'
import middlewares from './middlewares';
const router: Router = Router();

router.get('/getSome',
middlewares.getSomeValidation.bind(middlewares)
        ,controller.getSome.bind(controller))
                    
export default router;





