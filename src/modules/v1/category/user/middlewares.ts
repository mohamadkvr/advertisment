import {DbService} from '../../../../services/v1/databaseService/db'
import { Request, Response ,NextFunction} from 'express';
import {CustomError} from '../../../../services/v1/helper/error'

export default new class middleware extends DbService{
    getSomeValidation(req:Request,res:Response,next:NextFunction){
        if(req.query.slug && req.query.isBase) next(new CustomError(404,"شما نمیتوانید همزمان از Query  isbase , slug استفاده کنید"))
        next()
    }

}
