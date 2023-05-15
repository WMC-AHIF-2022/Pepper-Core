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
exports.pictureRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const pictures_repository_1 = require("../data/pictures-repository");
const database_1 = require("../database");
exports.pictureRouter = express_1.default.Router();
exports.pictureRouter.post("/", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = request.body.url;
        const picture = {
            pictureID: -1,
            url: url,
            personID: 0
        };
        try {
            yield (0, pictures_repository_1.addPicture)(picture);
            response.sendStatus(http_status_codes_1.StatusCodes.OK);
        }
        catch (e) {
            response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    });
});
exports.pictureRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database_1.DB.createDBConnection();
    const pictures = yield db.all('SELECT * from picture');
    response.status(http_status_codes_1.StatusCodes.OK).json(pictures);
}));
exports.pictureRouter.delete("/", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        yield db.all('truncate table pictures');
        yield db.close();
        response.status(http_status_codes_1.StatusCodes.OK);
    });
});
