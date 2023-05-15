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
exports.personRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const person_repository_1 = require("../data/person-repository");
const database_1 = require("../database");
exports.personRouter = express_1.default.Router();
exports.personRouter.post("/", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstName = request.body.firstName;
        const lastName = request.body.lastName;
        const birthdate = request.body.birthdate;
        const gender = request.body.gender;
        const userID = request.body.userID;
        const person = {
            personID: -1,
            firstName: firstName,
            lastName: lastName,
            birthdate: birthdate,
            gender: gender,
            userID: userID
        };
        try {
            yield (0, person_repository_1.addPerson)(person);
            response.sendStatus(http_status_codes_1.StatusCodes.OK);
        }
        catch (e) {
            response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    });
});
exports.personRouter.delete("/", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        yield db.all('truncate table persons');
        yield db.close();
        response.status(http_status_codes_1.StatusCodes.OK);
    });
});
exports.personRouter.get("/", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const persons = yield db.all('select * from persons');
        yield db.close();
        response.status(http_status_codes_1.StatusCodes.OK).json(persons);
    });
});
