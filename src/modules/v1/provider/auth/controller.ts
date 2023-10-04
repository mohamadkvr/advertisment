import {DbService} from '../../../../services/v1/mongoDbService/db'
import { Router, Request, Response , NextFunction} from 'express';
import {Utils} from '../../../../services/v1/helper/utils'
import { IProvider } from '../model';
const utils = Utils.getInstance()
import transform  from './transform';

export default new class service extends DbService {
     async signUp(req:Request, res:Response, next: NextFunction) {
      try { 
            await this.create<IProvider>(this.schemaHandler("provider"),{
                  firstName:req.body.firstName,
                  lastName:req.body.lastName,
                  phoneNumber:req.body.phoneNumber,
                  nationalNumber:req.body.nationalNumber,
                  businessDescription:req.body.businessDescription,
                  ban:false,
                  ...(req.body.email && {email:req.body.email})
            },false)
            return utils.responseHandler(res,201,utils.responseMsgHandler("POST","کاربر"),null)
     } catch (error) {
           next(error)
     }
     }
}
