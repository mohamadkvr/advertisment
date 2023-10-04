import {DbService} from '../../../../services/v1/mongoDbService/db'
import { Router, Request, Response , NextFunction} from 'express';
import {Utils} from '../../../../services/v1/helper/utils'
import { IProvider } from '../model';
const util = Utils.getInstance()
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
            return util.responseHandler(res,201,util.responseMsgHandler("POST","کاربر"),null)
     } catch (error) {
           next(error)
     }
     }
     async sendVerificationCode(req:Request, res:Response, next: NextFunction) {
      try { 
            return util.responseHandler(res,201,util.responseMsgHandler("GET","اس ام اس با موفقیت ارسال شد."),null)
     } catch (error) {
           next(error)
     }
     }
     async signIn(req:Request, res:Response, next: NextFunction) {
      try { 
            const provider = await this.findOne(this.schemaHandler('provider'),{phoneNumber:req.body.phoneNumber})
            const expirationTimeInSeconds = 60 * 60 * 24 * 7 * 2;
            return util.responseHandler(res,200,util.responseMsgHandler("login"," با موفقیت "),{token:util.generateToken({_id:provider._id},process.env.SECRET_KEY || "" ,{expiresIn:expirationTimeInSeconds})})
     } catch (error) {
           next(error)
     }
     }
}
