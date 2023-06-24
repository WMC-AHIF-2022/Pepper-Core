import { Database as Driver } from "sqlite3";
import { open, Database } from "sqlite";

export const dbFileName: string = 'database.db';

export class DB {
    public static async createDBConnection(): Promise<Database> {
        const dbConnection = await open({
            filename: `./${dbFileName}`,
            driver: Driver
        });
        await DB.ensureTablesCreated(dbConnection);
        return dbConnection;
    }

    private static async ensureTablesCreated(connection: Database): Promise<void> {
        await connection.run(`
            CREATE TABLE IF NOT EXISTS personsUsers (
                id INTEGER PRIMARY KEY,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                birthdate TEXT NOT NULL,
                gender TEXT NOT NULL
            )`
        );
        await connection.run(`
            CREATE TABLE IF NOT EXISTS pictures (
                pictureID INTEGER PRIMARY KEY,
                url TEXT NOT NULL,
                username TEXT NOT NULL,
                profilePicture TEXT NOT NULL,
                constraint personsUsers foreign key (username) references personsUsers(username)
            )
        `);
    }
}