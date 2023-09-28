import {DbService} from '../../../../services/v1/databaseService/db'
import { Router, Request, Response , NextFunction} from 'express';
import {Utils} from '../../../../services/v1/helper/utils'
const utils = Utils.getInstance()
import transform  from './transform';

export default new class service extends DbService {
     async add(req:Request, res:Response, next: NextFunction) {
        try {
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
