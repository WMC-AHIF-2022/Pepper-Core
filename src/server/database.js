var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Database as Driver } from "sqlite3";
import { open } from "sqlite";
export const dbFileName = 'database.db';
export class DB {
    static createDBConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield open({
                filename: `./${dbFileName}`,
                driver: Driver
            });
            yield DB.ensureTablesCreated(dbConnection);
            return dbConnection;
        });
    }
    static ensureTablesCreated(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username UNIQUE NOT NULL,
                password NOT NULL,
                avatarId INTEGER
            )
        `);
        });
    }
}
