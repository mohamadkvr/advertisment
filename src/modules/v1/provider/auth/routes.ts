import { Router} from 'express';
import controller from './controller'
import middleware from './middlewares'
const router: Router = Router();

router.post('/signUp',middleware.signUpValidation.bind(middleware)
        ,controller.signUp.bind(controller))
router.post('/sendVerificationCode',middleware.sendVerificationCode.bind(middleware)
        ,controller.sendVerificationCode.bind(controller))
router.post('/signIn',middleware.signIn.bind(middleware)
        ,controller.signIn.bind(controller))                                           
export default router;