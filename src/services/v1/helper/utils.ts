import {Response } from 'express';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';


interface IUtils {
    responseMsgHandler(method: String, msg:String):string,
    responseHandler(res:Response,status:number , msg: string, data: Object | null):object,
}
export class Utils implements IUtils{
    public static instance: Utils;  
    private constructor(){}
    static getInstance(): Utils {
        if (!Utils.instance) {
            Utils.instance = new Utils();
        }
        return Utils.instance;
    }
    public responseMsgHandler(method: String, msg:String):string {
        return method === "GET" ?  msg +" با موفقیت ارسال شد."  :
               method === "POST" ? msg + " باموفقیت ساخته شد.":
               method === "PATCH" ? msg + " با موفقیت اپدیت شد."  :
               method === "DELETE" ? msg +  " با موفقیت حذف شد.": ""
    }
    public responseHandler(res:Response,status:number , msg: string, data: Object | null):object {
          return res.status(status).json({
            msg,
            data,
          })
    }
    public slugGenerator(input: string): string {
        const lowercased = input.toLowerCase();
        const slug = lowercased.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return slug.replace(/^-+|-+$/g, '');
    }
    public generateToken(payload:object,secretKey:string,expirDate:object): string{
        return jwt.sign(payload, secretKey, expirDate);
    }
    public async hash(data:string){
        return bcrypt.hashSync(data, 10)
    }
    public async compare(data:string,hash:string){
       return bcrypt.compareSync(data,hash);
    }
}