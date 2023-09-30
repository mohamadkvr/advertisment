import {DbService} from '../../../../services/v1/mongoDbService/db'
import { Request, Response ,NextFunction} from 'express';
import {CustomError} from '../../../../services/v1/helper/error'
import { schema } from './validation';
import { Utils } from '../../../../services/v1/helper/utils';
const util = Utils.getInstance()

export default new class middleware extends DbService{
    async loginValidation(req:Request,res:Response,next:NextFunction){
        const { error } = schema.validate(req.body);
        if(error) {
            return next(new CustomError(400,error ? error.message : ""))
        }
        let admin = await this.findOne(this.schemaHandler('admin'),{email:req.body.email})
        if(!admin) {
            return next(new CustomError(400,'User not found with the entered email'))
        }
        if(!await util.compare(req.body.password,admin.password)) {
            return next( new CustomError(400,'email or password incorrect'))
        }
        return next()
    }
    async updateValidation(req:Request,res:Response,next:NextFunction){
    }
    async getOneValidation(req:Request,res:Response,next:NextFunction){
    }
    async removeValidation(req:Request,res:Response,next:NextFunction){
    }
}
