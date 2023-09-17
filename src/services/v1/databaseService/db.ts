import { Model } from "mongoose";
import nodeCache from "node-cache";
import models from './modelManagement'
import { populate } from "dotenv";
const {  categoryModel,formModel,formSectionModel} = models
import { IPaginate } from "../helper/interfaceManagement";
const memory = new nodeCache();

export class DbService {
  protected async create<T>(model: Model<any>, data: object, returnData: boolean): Promise<T | null> {
    let newFromModel = await model.create(data);
    if (returnData) return newFromModel;
    return null
  }
  protected async insertMany<T>(model: Model<any>, data: object, count: number): Promise<[T] | null> {
    let counter = 0;
    do {
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          await this.create(model, data[i], false);
        }
      } else {
        await this.create(model, data, false);
      }
    } while (counter < count);
    return null
  }
  protected async update<T>(model: Model<any>, which: object, data: object, returnUpdatedData: boolean):Promise<T | null> {
    await model.updateMany(which, data);
    if (returnUpdatedData) return await model.findOne(which);
    return null
  }
  protected async find<T>(model: Model<any>, which: object):Promise<T[]> {
    return model.find(which);
  }
  protected async findAndSelectAndPopulationPaginate(model: any, which: object, hasPaging={}):Promise<IPaginate> {
    return await model.paginate(which ? which : {} , hasPaging);
};
  protected async findOne(model: Model<any>, which: object) {
    return model.findOne(which);
  }
  protected async findOneAndPopulate(model: Model<any>, which: object, populate: string[]) {
    if (populate) {
      return model.findOne(which).populate(populate);
    } else {
      return model.findOne(which);
    }
  }
  protected async findAndSelect(model: Model<any>, which: object ,select:object) {
    return await model.find(which ? which : {} , select);
};
  protected async delete(model: Model<any>, which: object) {
    return model.deleteMany(which);
  }
  protected async setCache(key: string | number, value: any, time: number) {
    if (value) memory.set(key, value, time);
  }
  protected async getCache(key: string | number) {
    return memory.get(key);
  }
  protected schemaHandler(model :String): Model<any>{
        return model === "category" ? categoryModel:
               model === "form" ? formModel:
               formSectionModel
               
  }
}