import {Response } from 'express';
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
}