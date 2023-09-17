import { Router} from 'express';
import categoryController from './controller'
import middlewares from './middlewares';
const router: Router = Router();

router.get('/getSome',
middlewares.getSomeValidation.bind(middlewares)
        ,categoryController.getSome.bind(categoryController))
                    
export default router;





