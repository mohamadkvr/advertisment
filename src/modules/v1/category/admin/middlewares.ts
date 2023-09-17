import {DbService} from '../../../../services/v1/databaseService/db'
import { Request, Response ,NextFunction} from 'express';
import {CustomError} from '../../../../services/v1/helper/error'
import { schema } from './validation';
import { Utils } from '../../../../services/v1/helper/utils';
const util = Utils.getInstance()

export default new class middleware extends DbService{
    async createValidation(req:Request,res:Response,next:NextFunction){
        const { error } = schema.validate(req.body);
        if(error) {
            const err = new CustomError(400,error ? error.message : "")
            next(err)
        }
        let existWithTitle = await this.findOne(this.schemaHandler("category"),{title:req.body.title, 
            slug :util.slugGenerator(req.body.slug)})
        if(existWithTitle) return next(new CustomError(400,"از قبل کتگوری با این تایتل  یا اسلاگ موجود است."))
        if(req.body.parentId) {
            let parent = await this.findOne(this.schemaHandler("category"),{_id:req.body.parentId})
            if(!parent) return next(new CustomError(404,`داکیومنتی با ایدی ${req.body.parentId} برای فیلد پرنت پیدا نشد`))
        }
        next()
    }
    async updateValidation(req:Request,res:Response,next:NextFunction){
        let existWithParam = await this.findOne(this.schemaHandler("category"),{_id:req.params.id})
        if(!existWithParam) return next(new CustomError(404,`داکیومنتی با ایدی ${req.params.id} برای فیلد params.id پیدا نشد`))
        const { error, value } = schema.validate(req.body);
        if(error) {
            const err = new CustomError(400,error ? error.message : "")
            next(err)
        }
        let existWithTitle = await this.findOne(this.schemaHandler("category"),{title:req.body.title,slug :util.slugGenerator(req.body.slug)})
        if(existWithTitle && existWithTitle._id != req.params.id) return next(new CustomError(400,"از قبل کتگوری با این تایتل,اسلاگ موجود است."))
        if(req.body.parentId) {
            let parent = await this.findOne(this.schemaHandler("category"),{_id:req.body.parentId})
            if(!parent) return next(new CustomError(404,`داکیومنتی با ایدی ${req.body.parentId} برای فیلد پرنت پیدا نشد`))
        }
        next()
    }
    async getOneValidation(req:Request,res:Response,next:NextFunction){
        let existWithParam = await this.findOne(this.schemaHandler("category"),{_id:req.params.id})
        if(!existWithParam) return next(new CustomError(404,`داکیومنتی با ایدی ${req.params.id} برای فیلد params.id پیدا نشد`))
        next()
    }
    async removeValidation(req:Request,res:Response,next:NextFunction){
        if(!req.body.ids || req.body.ids.length === 0) return next(new CustomError(404,"فیلد ایدی ها را وارد کنید"))
        let cats = await this.findAndSelect(await this.schemaHandler('category'),{_id:{$in:req.body.ids.filter((i : object | null) => i)}},{_id:1})
        req.body.ids = cats.map(item => item._id)
        next()
    }
}
