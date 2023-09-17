import { Router} from 'express';
import formController from './controller'
import middleware from './middlewares'
const router: Router = Router();

router.post('/createSection',
middleware.createSectionValidation.bind(middleware)
        ,formController.addSection.bind(formController))
router.patch('/updateSection/:id',
middleware.updateSectionValidation.bind(middleware)
        ,formController.editSection.bind(formController))
router.get('/getOneSection/:id',
middleware.getOneValidation.bind(middleware),
        formController.getOneSection.bind(formController))
router.get('/getSectionList',
        formController.getSectionList.bind(formController))
router.delete('/deleteSections',
middleware.removeSectionValidation.bind(middleware),
        formController.removeSections.bind(formController))
router.post('/createForm',
middleware.createFormValidation.bind(middleware)
        ,formController.addFrom.bind(formController))   
router.patch('/updateFrom/:id',
middleware.updateFormValidation.bind(middleware)
                ,formController.editForm.bind(formController))                             
export default router;





