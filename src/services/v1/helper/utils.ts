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
    public async  decodeTokenAsync(token:string, secretKey:string) {
        return new Promise((resolve, reject) => {
          jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          });
        });
      }
    public async hash(data:string){
        return bcrypt.hashSync(data, 10)
    }
    public async compare(data:string,hash:string){
       return bcrypt.compareSync(data,hash);
    }
    public generateRandomString(length:number) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }
}