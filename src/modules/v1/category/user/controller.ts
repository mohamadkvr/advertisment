import {DbService} from '../../../../services/v1/databaseService/db'
import { Request, Response , NextFunction} from 'express';
import {Utils} from '../../../../services/v1/helper/utils'
const utils = Utils.getInstance()
import transform  from './transform';

export default new class service extends DbService {
     async getSome(req:Request, res:Response, next: NextFunction) {
        try {
            let catWithSlug = await this.findOne(await this.schemaHandler('category'),{slug:req.body.slug})
            return utils.responseHandler(res,201,utils.responseMsgHandler(req.method,"گتگوری"),transform.getSome(
                await this.findAndSelectAndPopulationPaginate(await this.schemaHandler('category') , {
                    ...((req.query.hasOwnProperty('isBase') && req.query.isBase === "true") && {parentId:null}),
                    ...(catWithSlug && {parentId:catWithSlug._id})
                } ,
                    {populate : [],sort:{createdAt : -1}, page: req.query.page || 1,limit : req.query.limit|| 10})
            ))
        } catch (error) {
            console.log(error)
            next(error)   
        }
     }
}
