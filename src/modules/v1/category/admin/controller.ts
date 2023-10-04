import {DbService} from '../../../../services/v1/mongoDbService/db'
import { Router, Request, Response , NextFunction} from 'express';
import {Utils} from '../../../../services/v1/helper/utils'
const utils = Utils.getInstance()
import transform  from './transform';
import { ICategory } from '../model';

export default new class service extends DbService {
     async add(req:Request, res:Response, next: NextFunction) {
        try { 
               return utils.responseHandler(res,201,utils.responseMsgHandler("POST","گتگوری"),transform.getOne(
                //////insert in db///////
                    await this.create<ICategory>(this.schemaHandler('category'),{
                    title: req.body.title,
                    slug:utils.slugGenerator(req.body.slug),
                    ...(req.body.description && {description: req.body.description}),
                    ...(req.body.parentId && {parentId:req.body.parentId})
                    },true))  
                /////////////////////////      
               )
        } catch (error) {
              next(error)
        }
     }
     async edit(req:Request, res:Response, next: NextFunction) {
        try {
            return utils.responseHandler(res,201,utils.responseMsgHandler(req.method,"گتگوری"),transform.getOne(
                /////update query/////////////
                await this.update<ICategory>(await this.schemaHandler('category'),{_id:req.params.id},{
                    ...req.body,
                    ...(req.body.slug && {slug:utils.slugGenerator(req.body.slug)})
                },true)
                /////////////////////////////
            ))
        } catch (error) {
            next(error)
        }
     }
     async getOne(req:Request, res:Response, next: NextFunction) {
        try {
            return utils.responseHandler(res,200,utils.responseMsgHandler(req.method,"گتگوری"),transform.getOne(
                await this.findOne(this.schemaHandler('category'),{_id:req.params.id})
            ))
        } catch (error) {
            next(error)   
        }
     }
     async getSome(req:Request, res:Response, next: NextFunction) {
        try {
            return utils.responseHandler(res,200,utils.responseMsgHandler(req.method,"گتگوری"),transform.getSome(
                await this.findAndSelectAndPopulationPaginate(await this.schemaHandler('category') , {} ,
                    {populate : [],sort:{createdAt : -1}, page: req.query.page || 1,limit : req.query.limit|| 10})
            ))
        } catch (error) {
            console.log(error)
            next(error)   
        }
     }
     async remove(req:Request, res:Response, next: NextFunction) {
        try {
           await this.delete(await this.schemaHandler('category'),{_id:{$in:req.body.ids}})
           return utils.responseHandler(res,200,utils.responseMsgHandler(req.method,"گتگوری"),null)
        } catch (error) {
            console.log(error)
            next(error)   
        }
     }
}
