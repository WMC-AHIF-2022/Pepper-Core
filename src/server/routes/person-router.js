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
exports.personRouter = express_1.default.Router();
exports.personRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const birthdate = request.body.birthdate;
    const gender = request.body.gender;
    const person = {
        personID: -1,
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        gender: gender,
        userID: NaN
    };
    try {
        yield (0, person_repository_1.addPerson)(person);
        response.status(http_status_codes_1.StatusCodes.CREATED).send(person);
    }
    catch (e) {
        console.log("Error im catch!!!!!!!!!!!");
        response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}));
exports.personRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = yield (0, person_repository_1.getAllPersons)();
    response.status(http_status_codes_1.StatusCodes.OK).json(persons);
}));
