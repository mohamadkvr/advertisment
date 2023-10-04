import { Router, Request, Response, NextFunction} from 'express';
import controller from './controller'
import middleware from './middlewares'
const router: Router = Router();

router.post('/create',middleware.auth.bind(middleware),middleware.createValidation.bind(middleware)
        ,controller.add.bind(controller))

router.patch('/update/:id',middleware.auth.bind(middleware),middleware.updateValidation.bind(middleware)
        ,controller.edit.bind(controller))

router.get('/getOne/:id',middleware.auth.bind(middleware),middleware.getOneValidation.bind(middleware),
controller.getOne.bind(controller))

router.get('/getSome',middleware.auth.bind(middleware),controller.getSome.bind(controller))

router.delete('/delete',middleware.auth.bind(middleware),middleware.removeValidation.bind(middleware),
controller.remove.bind(controller))                        
export default router;





