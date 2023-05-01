var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as express from 'express';
import { StatusCodes } from "http-status-codes";
import { addUser, getAllUsers, isAuthorized } from "../data/user-repository";
export const userRouter = express.Router();
userRouter.post("/signup", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = request.body.username;
        const password = request.body.password;
        if (password.trim().length === 0) {
            response.sendStatus(StatusCodes.BAD_REQUEST);
            return;
        }
        const user = {
            id: -1,
            username: username,
            password: password
        };
        try {
            yield addUser(user);
            response.sendStatus(StatusCodes.OK);
        }
        catch (e) {
            response.sendStatus(StatusCodes.BAD_REQUEST);
        }
    });
});
userRouter.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const username = request.body.username;
    const password = request.body.password;
    const user = {
        id: -1,
        username: username,
        password: password
    };
    const isUserAuthorized = yield isAuthorized(user);
    if (isUserAuthorized) {
        response.sendStatus(StatusCodes.OK);
    }
    else {
        response.sendStatus(StatusCodes.UNAUTHORIZED);
    }
}));
userRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getAllUsers();
    response.status(StatusCodes.OK).json(users);
}));
