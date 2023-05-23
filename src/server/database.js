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
            console.log("bevor ensure table");
            yield DB.ensureTablesCreated(dbConnection);
            console.log("after ensure table");
            return dbConnection;
        });
    }
    static ensureTablesCreated(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.run(`
            create table if not exists avatars (
                id INTEGER NOT NULL PRIMARY KEY,
                name TEXT NOT NULL,
                url TEXT DEFAULT false
            ) strict;`);
            yield connection.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username UNIQUE NOT NULL,
                password NOT NULL,
                avatarId INTEGER
            ) strict;`);
            yield connection.run(`
            CREATE TABLE IF NOT EXISTS persons (
                personID INTEGER PRIMARY KEY,
                firstName NOT NULL,
                lastName NOT NULL,
                birthdate date,
                gender NOT NULL,
                userID NOT NULL
            ) strict;`);
            console.log("sollte das danach ausführen");
            yield connection.run(`
            CREATE TABLE IF NOT EXISTS personsUsers (
                id INTEGER PRIMARY KEY,
                username NOT NULL,
                password NOT NULL,
                firstName NOT NULL,
                lastName NOT NULL,
                birthdate NOT NULL,
                gender NOT NULL
            )`);
            console.log("sollte ausgeführt sein");
            yield connection.run(`
            CREATE TABLE IF NOT EXISTS pictures (
                pictureID INTEGER PRIMARY KEY,
                url NOT NULL,
                personID INTEGER
            ) 
        `);
        });
    }
}
exports.DB = DB;
