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
                username NOT NULL,
                password NOT NULL,
                firstName NOT NULL,
                lastName NOT NULL,
                birthdate NOT NULL,
                gender NOT NULL
            )`
        );
        await connection.run(`
            CREATE TABLE IF NOT EXISTS pictures (
                pictureID INTEGER PRIMARY KEY,
                url NOT NULL,
                username NOT NULL
            ) 
        `);
    }
}