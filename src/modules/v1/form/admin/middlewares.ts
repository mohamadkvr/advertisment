import {DbService} from '../../../../services/v1/databaseService/db'
import { Request, Response ,NextFunction} from 'express';
import {CustomError} from '../../../../services/v1/helper/error'
import { Sectionschema ,FormSchema} from './validation';
import { Utils } from '../../../../services/v1/helper/utils';
const util = Utils.getInstance()

export default new class middleware extends DbService{
    async createSectionValidation(req:Request,res:Response,next:NextFunction){
        const { error } = Sectionschema.validate(req.body);
        if(error) {
            const err = new CustomError(400,error ? error.message : "")
            return next(err)
        }
        return next()
    }
    async updateSectionValidation(req:Request,res:Response,next:NextFunction){
        let existWithParam = await this.findOne(this.schemaHandler("formSection"),{_id:req.params.id})
        if(!existWithParam) return next(new CustomError(404,`داکیومنتی با ایدی ${req.params.id} برای فیلد params.id پیدا نشد`))
        const { error, value } = Sectionschema.validate(req.body);
        if(error) {
            const err = new CustomError(400,error ? error.message : "")
            return next(err)
        }
        return next()
    }
    async getOneValidation(req:Request,res:Response,next:NextFunction){
        let existWithParam = await this.findOne(this.schemaHandler("formSection"),{_id:req.params.id})
        if(!existWithParam) return next(new CustomError(404,`داکیومنتی با ایدی ${req.params.id} برای فیلد params.id پیدا نشد`))
        return next()
    }
    async removeSectionValidation(req:Request,res:Response,next:NextFunction){
        if(!req.body.ids || req.body.ids.length === 0) return next(new CustomError(404,"فیلد ایدی ها را وارد کنید"))
        let cats = await this.findAndSelect(await this.schemaHandler('formSection'),{_id:{$in:req.body.ids.filter((i : object | null) => i)}},{_id:1})
        req.body.ids = cats.map(item => item._id)
        return next()
    }
    async createFormValidation(req:Request,res:Response,next:NextFunction){
        const { error } = FormSchema.validate(req.body);
        if(error) {
            const err = new CustomError(400,error ? error.message : "")
            return next(err)
        }
        return next()
    }
    async updateFormValidation(req:Request,res:Response,next:NextFunction){
        let existWithParam = await this.findOne(this.schemaHandler("formSection"),{_id:req.params.id})
        if(!existWithParam) return next(new CustomError(404,`داکیومنتی با ایدی ${req.params.id} برای فیلد params.id پیدا نشد`))
        const { error, value } = FormSchema.validate(req.body);
        if(error) {
            const err = new CustomError(400,error ? error.message : "")
            return next(err)
        }
        return next()
    }
    
}
