import { Router} from 'express';
import controller from './controller'
import middleware from './middlewares'
const router: Router = Router();

router.post('/login',middleware.loginValidation.bind(middleware)
        ,controller.login.bind(controller))
// router.patch('/update/:id',middleware.updateValidation.bind(middleware)
//         ,controller.edit.bind(controller))
// router.get('/getOne/:id',middleware.getOneValidation.bind(middleware),
// controller.getOne.bind(controller))
// router.get('/getSome',controller.getSome.bind(controller))
// router.delete('/delete',middleware.removeValidation.bind(middleware),
// controller.remove.bind(controller))                        
export default router;