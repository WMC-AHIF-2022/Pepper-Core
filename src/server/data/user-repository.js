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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.getAllUsers = exports.addUser = void 0;
const database_1 = require("../database");
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare('INSERT INTO users(USERNAME, PASSWORD) VALUES (?1, ?2)');
        yield stmt.bind({ 1: user.username, 2: user.password });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
            throw new Error("Username is already known");
        }
        else {
            user.id = operationResult.lastID;
        }
    });
}
exports.addUser = addUser;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const users = yield db.all('SELECT * FROM users');
        yield db.close();
        return users;
    });
}
exports.getAllUsers = getAllUsers;
function isAuthorized(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare(`SELECT * FROM users WHERE username = ?1`);
        yield stmt.bind({ 1: user.username });
        const result = yield stmt.get();
        yield stmt.finalize();
        yield db.close();
        return typeof result !== "undefined" && result.password === user.password;
    });
}
exports.isAuthorized = isAuthorized;
