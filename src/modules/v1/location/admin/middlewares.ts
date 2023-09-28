import {DbService} from '../../../../services/v1/mongoDbService/db'
import { Request, Response ,NextFunction} from 'express';
import {CustomError} from '../../../../services/v1/helper/error'
import { schema } from './validation';
import { Utils } from '../../../../services/v1/helper/utils';
const util = Utils.getInstance()

export default new class middleware extends DbService{
    async createValidation(req:Request,res:Response,next:NextFunction){
    }
    async updateValidation(req:Request,res:Response,next:NextFunction){
    }
    async getOneValidation(req:Request,res:Response,next:NextFunction){
    }
    async removeValidation(req:Request,res:Response,next:NextFunction){
    }
}
