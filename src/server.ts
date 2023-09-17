import {App} from './app';
import dotEnv from "dotenv";
dotEnv.config();
App.getInstance(Number(process.env.PORT),process.env.DATABASE_URL || "");