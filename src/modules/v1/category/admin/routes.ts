import { Router} from 'express';
import categoryController from './controller'
import middleware from './middlewares'
const router: Router = Router();

router.post('/create',
middleware.createValidation.bind(middleware)
        ,categoryController.add.bind(categoryController))
router.patch('/update/:id',
middleware.updateValidation.bind(middleware)
        ,categoryController.edit.bind(categoryController))
router.get('/getOne/:id',
middleware.getOneValidation.bind(middleware),
        categoryController.getOne.bind(categoryController))
router.get('/getSome',
        categoryController.getSome.bind(categoryController))
router.delete('/delete',
middleware.removeValidation.bind(middleware),
        categoryController.remove.bind(categoryController))                        
export default router;





