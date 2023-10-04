import { Router} from 'express';
import controller from './controller'
import middleware from './middlewares'
const router: Router = Router();

router.post('/signUp',middleware.signUpValidation.bind(middleware)
        ,controller.signUp.bind(controller))                     
export default router;