import {DbService} from '../../../../services/v1/databaseService/db'
import { Router, Request, Response , NextFunction} from 'express';
import { ICat ,IFormSection,IForm} from '../../../../services/v1/helper/interfaceManagement';
import {Utils} from '../../../../services/v1/helper/utils'
const utils = Utils.getInstance()
import transform  from './transform';

export default new class service extends DbService {
     async addSection(req:Request, res:Response, next: NextFunction) {
        try {
            let newSection = await this.create<IFormSection>(this.schemaHandler('formSection'),req.body,true)
               return utils.responseHandler(res,201,utils.responseMsgHandler("POST","سکشن"),transform.getOneSection(newSection))
        } catch (error) {
              next(error)
        }
     }
     async editSection(req:Request, res:Response, next: NextFunction) {
        try {
            const updatedSection = await this.update<IFormSection>(await this.schemaHandler('formSection'),{_id:req.params.id},req.body,true)
            return utils.responseHandler(res,201,utils.responseMsgHandler(req.method,"سکشن"),transform.getOneSection(updatedSection))
        } catch (error) {
            next(error)
        }
     }
     async getOneSection(req:Request, res:Response, next: NextFunction) {
        try {
            return utils.responseHandler(res,201,utils.responseMsgHandler(req.method,"سکشن"),transform.getOneSection(
                await this.findOne(this.schemaHandler('formSection'),{_id:req.params.id})
            ))
        } catch (error) {
            next(error)   
        }
     }
     async getSectionList(req:Request, res:Response, next: NextFunction) {
        try {
            return utils.responseHandler(res,201,utils.responseMsgHandler(req.method,"سکشن"),transform.getSectionList(
                await this.find<IFormSection>(await this.schemaHandler('formSection') , {})
            ))
        } catch (error) {
            console.log(error)
            next(error)   
        }
     }
     async removeSections(req:Request, res:Response, next: NextFunction) {
        try {
           await this.delete(await this.schemaHandler('formSection'),{_id:{$in:req.body.ids}})
           return utils.responseHandler(res,201,utils.responseMsgHandler(req.method,"سکشن"),null)
        } catch (error) {
            console.log(error)
            next(error)   
        }
     }
     async addFrom(req:Request, res:Response, next: NextFunction) {
        try {
            let newForm = await this.create<IForm>(this.schemaHandler('form'),req.body,true)
               return utils.responseHandler(res,201,utils.responseMsgHandler("POST","فرم"),transform.getOneForm(newForm))
        } catch (error) {
              next(error)
        }
     }
     async editForm(req:Request, res:Response, next: NextFunction) {
        try {
            const updatedSection = await this.update<IForm>(await this.schemaHandler('form'),{_id:req.params.id},req.body,true)
            return utils.responseHandler(res,201,utils.responseMsgHandler(req.method,"فرم"),transform.getOneForm(updatedSection))
        } catch (error) {
            next(error)
        }
     }
}
