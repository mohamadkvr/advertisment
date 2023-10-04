import {DbService} from '../../../../services/v1/mongoDbService/db'
import { Request, Response ,NextFunction} from 'express';
import {CustomError} from '../../../../services/v1/helper/error'
import { signUpschema, sendVerificationCodeSchema, signInSchema } from './validation';
import { Utils } from '../../../../services/v1/helper/utils';
const util = Utils.getInstance()

export default new class middleware extends DbService{
    async signUpValidation(req:Request,res:Response,next:NextFunction){
        const { error } = signUpschema.validate(req.body);
        if(error) {
            const err = new CustomError(400,error ? error.message : "")
            next(err)
        }
        let exist = await this.findOne(this.schemaHandler("provider"),{$or:[{email:req.body.email},{phoneNumber:req.body.phoneNumber}]})
        if(exist) return next(new CustomError(400,"کاربری با ایمیل و یا شماره تلفن وارد شده از قبل موجود است."))
        next()
    }
    async sendVerificationCode(req:Request,res:Response,next:NextFunction){
        const { error } = sendVerificationCodeSchema.validate(req.body);
        if(error) {
            const err = new CustomError(400,error ? error.message : "")
            next(err)
        }
        let exist = await this.findOne(this.schemaHandler("provider"),{phoneNumber:req.body.phoneNumber})
        if(!exist) return next(new CustomError(400,"کاربری با شماره تلفن وارد شده یافت نشد."))
        next()

    }
    async signIn(req:Request,res:Response,next:NextFunction){
        const { error } = signInSchema.validate(req.body);
        if(error) {
            const err = new CustomError(400,error ? error.message : "")
            next(err)
        }
        if(req.body.code !== "12345") {
            return next(new CustomError(400,error ? error.message : "کد وارد شده صحیح نیست"))
        }
        return next()
    }
    async removeValidation(req:Request,res:Response,next:NextFunction){
    }
}
