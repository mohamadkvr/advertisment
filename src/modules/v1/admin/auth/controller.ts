import {DbService} from '../../../../services/v1/mongoDbService/db'
import { Router, Request, Response , NextFunction} from 'express';
import {Utils} from '../../../../services/v1/helper/utils'
const util = Utils.getInstance()
import transform  from './transform';

export default new class service extends DbService {
     async login(req:Request, res:Response, next: NextFunction) {
        try {
            let admin = await this.findOne(this.schemaHandler('admin'),{email:req.body.email})
            const expirationTimeInSeconds = 60 * 60 * 24 * 7 * 2;
            return util.responseHandler(res,200,util.responseMsgHandler(req.method,"token"),{token:util.generateToken({_id:admin._id},process.env.SECRET_KEY || "" ,{expiresIn:expirationTimeInSeconds})})
        } catch (error) {
              next(error)
        }
     }
     async edit(req:Request, res:Response, next: NextFunction) {
        try {
        } catch (error) {
              next(error)
        }
     }
     async getOne(req:Request, res:Response, next: NextFunction) {
        try {
        } catch (error) {
              next(error)
        }
     }
     async getSome(req:Request, res:Response, next: NextFunction) {
        try {
        } catch (error) {
              next(error)
        }
     }
     async remove(req:Request, res:Response, next: NextFunction) {
        try {
        } catch (error) {
              next(error)
        }
     }
}
