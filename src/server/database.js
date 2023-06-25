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
exports.DB = exports.dbFileName = void 0;
const sqlite3_1 = require("sqlite3");
const sqlite_1 = require("sqlite");
exports.dbFileName = 'database.db';
class DB {
    static createDBConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, sqlite_1.open)({
                filename: `./${exports.dbFileName}`,
                driver: sqlite3_1.Database
            });
            yield DB.ensureTablesCreated(dbConnection);
            return dbConnection;
        });
    }
    static ensureTablesCreated(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.run(`
            CREATE TABLE IF NOT EXISTS personsUsers (
                id INTEGER PRIMARY KEY,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                birthdate TEXT NOT NULL,
                gender TEXT NOT NULL
            )`);
            yield connection.run(`
            CREATE TABLE IF NOT EXISTS pictures (
                pictureID INTEGER PRIMARY KEY,
                url TEXT NOT NULL,
                username TEXT NOT NULL,
                profilePicture TEXT NOT NULL,
                constraint personsUsers foreign key (username) references personsUsers(username)
            )
        `);
        });
    }
}
exports.DB = DB;
