import { Database as Driver } from "sqlite3";
import { open } from "sqlite";
export const dbFileName = 'database.db';
export class DB {
    static async createDBConnection() {
        const dbConnection = await open({
            filename: `./${dbFileName}`,
            driver: Driver
        });
        await DB.ensureTablesCreated(dbConnection);
        return dbConnection;
    }
    static async ensureTablesCreated(connection) {
        await connection.run(`
            create table if not exists avatars (
                id INTEGER NOT NULL PRIMARY KEY,
                name TEXT NOT NULL,
                url TEXT DEFAULT false
            ) strict;`);
        await connection.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username UNIQUE NOT NULL,
                password NOT NULL,
                avatarId INTEGER
            ) strict;`);
        await connection.run(`
            CREATE TABLE IF NOT EXISTS persons (
                personID INTEGER PRIMARY KEY,
                firstName NOT NULL,
                lastName NOT NULL,
                birthdate date,
                gender NOT NULL,
                userID NOT NULL
            ) strict;
        `);
        await connection.run(`
            CREATE TABLE IF NOT EXISTS pictures (
                pictureID INTEGER PRIMARY KEY,
                url NOT NULL,
                personID INTEGER
            ) 
        `);
    }
}
//# sourceMappingURL=database.js.map