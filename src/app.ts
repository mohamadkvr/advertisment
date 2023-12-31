import express, {Express, Request,Response,NextFunction,Errback} from "express"
import mongoose from "mongoose"
import http from "http"
import cors from "cors"
import morgan from "morgan";
import categoryRouter from './modules/v1/category/admin/routes'
import userCategoryRouter from './modules/v1/category/user/routes'
import adminAuthenticationRouter from './modules/v1/admin/auth/routes'
import providerRoutes from './modules/v1/provider/auth/routes'
import cookieParser from 'cookie-parser';

import { IError } from "./services/v1/helper/error";
// import userRoutes from "./http/routes/user/index"


export class App {
    public app :Express = express()
    private static instance: App;
    private constructor(private port: number, private mongoUri: string) {
        this.setMongoConnection(mongoUri)
        this.setupExpress()
        this.setConfig()
        this.setRouters()
        this.setSeeds()
        this.setError()
    }
    static getInstance(port: number,mongoUri:string): App {
        if (!App.instance) {
          App.instance = new App(port,mongoUri);
        }
        return App.instance;
    }
    
    private setMongoConnection(mongoUri: string) {
        mongoose.Promise = global.Promise;
        mongoose.connect(mongoUri).then(res => {
            console.log("Mongodb connection successfully established and uri is :" + mongoUri)
        })
    }
    private setupExpress(){
        const server = http.createServer(this.app)
        server.listen(this.port, () => {
            console.log(`The server is listening port ${this.port}` + " 🚀")
        })
    }
    private setConfig(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:false}))
        this.app.use(cookieParser());
        this.app.use("/public", express.static("./public"));
        this.app.use(cors())
        this.app.use(morgan("dev"))
    }
    private setRouters(){
        ///////////////////////admin////////////////////////////////////
        //admin
        this.app.use('/api/v1/admin',adminAuthenticationRouter)
        //category
        this.app.use('/api/v1/admin/category',categoryRouter)
        //////////////////////user/////////////////////////////////////
        // category
        this.app.use('/api/v1/user/category',userCategoryRouter)
        /////////////////////provider/////////////////////////////////
        this.app.use('/api/v1/provider/auth',providerRoutes)
        
    }
    private async setSeeds(){
    }
    private setError(){
        this.app.use((error:IError ,req: Request, res: Response,next : NextFunction) => {
            console.log(error)
            res.status(error.status || 500).json({msg:error.message,status:error.status})
        });
    }
}