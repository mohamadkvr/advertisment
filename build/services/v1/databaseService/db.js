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
exports.DbService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const memory = new node_cache_1.default();
class DbService {
    constructor() { }
    static getInstance() {
        if (!DbService.instance) {
            DbService.instance = new DbService();
        }
        return DbService.instance;
    }
    create(model, data, returnData) {
        return __awaiter(this, void 0, void 0, function* () {
            let newFromModel = yield model.create(data);
            if (returnData)
                return newFromModel;
        });
    }
    insertMany(model, data, count) {
        return __awaiter(this, void 0, void 0, function* () {
            let counter = 0;
            do {
                if (Array.isArray(data)) {
                    for (let i = 0; i < data.length; i++) {
                        yield this.create(model, data[i], false);
                    }
                }
                else {
                    yield this.create(model, data, false);
                }
            } while (counter < count);
        });
    }
    update(model, which, data, returnUpdatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model.updateMany(which, data);
            console.log(which);
            if (returnUpdatedData)
                return model.findOne(which);
        });
    }
    find(model, which) {
        return __awaiter(this, void 0, void 0, function* () {
            return model.find(which);
        });
    }
    findOne(model, which) {
        return __awaiter(this, void 0, void 0, function* () {
            return model.findOne(which);
        });
    }
    findOneAndPopulate(model, which, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (populate) {
                return model.findOne(which).populate(populate);
            }
            else {
                return model.findOne(which);
            }
        });
    }
    delete(model, which) {
        return __awaiter(this, void 0, void 0, function* () {
            return model.deleteMany(which);
        });
    }
    setCache(key, value, time) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value)
                memory.set(key, value, time);
        });
    }
    getCache(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return memory.get(key);
        });
    }
}
exports.DbService = DbService;
