"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// import userRoutes from "./http/routes/user/index"
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        // this.setMongoConnection()
        this.setupExpress();
        this.setConfig();
        this.setRouters();
        this.setSeeds();
        this.setError();
    }
    static getInstance(port) {
        if (!App.instance) {
            App.instance = new App(port);
        }
        return App.instance;
    }
    setMongoConnection() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(process.env.MONGODB_URL || "").then(res => {
            console.log("Mongodb connection successfully established and uri is :" + process.env.MONGODB_URL);
        });
    }
    setupExpress() {
        const server = http_1.default.createServer(this.app);
        server.listen(this.port, () => {
            console.log(`The server is listening port ${this.port}` + " 🚀");
        });
    }
    setConfig() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use("/public", express_1.default.static("./public"));
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
    }
    setRouters() {
    }
    setSeeds() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    setError() {
    }
}
exports.App = App;
