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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const user_repository_1 = require("../data/user-repository");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = request.body.username;
        const password = request.body.password;
        if (password.trim().length === 0) {
            response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
            return;
        }
        const user = {
            id: -1,
            username: username,
            password: password
        };
        try {
            yield (0, user_repository_1.addUser)(user);
            response.sendStatus(http_status_codes_1.StatusCodes.OK);
        }
        catch (e) {
            response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    });
});
exports.userRouter.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const username = request.body.username;
    const password = request.body.password;
    const user = {
        id: -1,
        username: username,
        password: password
    };
    const isUserAuthorized = yield (0, user_repository_1.isAuthorized)(user);
    if (isUserAuthorized) {
        response.sendStatus(http_status_codes_1.StatusCodes.OK);
    }
    else {
        response.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}));
exports.userRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_repository_1.getAllUsers)();
    response.status(http_status_codes_1.StatusCodes.OK).json(users);
}));
