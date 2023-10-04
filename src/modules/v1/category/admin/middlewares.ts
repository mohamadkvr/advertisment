import {DbService} from '../../../../services/v1/mongoDbService/db'
import { Request, Response ,NextFunction} from 'express';
import {CustomError} from '../../../../services/v1/helper/error'
import { schema } from './validation';
import { Utils } from '../../../../services/v1/helper/utils';
import jwt from 'jsonwebtoken';
const util = Utils.getInstance()

export default new class middleware extends DbService{
    async createValidation(req:Request,res:Response,next:NextFunction){
        console.log('aliiiiiiiiiiiiiiiiiiiiiiiiiii')
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
        if(!req.body.ids || req.body.ids.length === 0) return next(new CustomError(400,"فیلد ایدی ها را وارد کنید"))
        let cats = await this.findAndSelect(await this.schemaHandler('category'),{_id:{$in:req.body.ids.filter((i : object | null) => i)}},{_id:1})
        req.body.ids = cats.map(item => item._id)
        next()
    }
    async auth(req:Request,res:Response,next:NextFunction){
        try {
            const token = req.headers["x-api-key"] ||  req.cookies["x-api-key"]
            if(!token) {
                return next(new CustomError(401,"Unauthorized"))
            }else {
                jwt.verify(token, process.env.SECRET_KEY || "", async(err:any, decoded:any) => {
                    if (err) {
                        return next(new CustomError(401,"Unauthorized"))
                    }else {
    
                        if(decoded && decoded._id){
                            let admin = await this.findOne(this.schemaHandler('admin'),{_id:decoded._id})
                            if(admin) {
                                (req as any).ofToken = admin
                                return next()
                            }
                            return next(new CustomError(401,"Unauthorized"))
                        }else {
                            return next(new CustomError(401,"Unauthorized"))
                        }
                    }
                });
            }
        } catch (error) {
            if(error) {
                return next(new CustomError(401,"Unauthorized"))
            }
        }
    }
}
