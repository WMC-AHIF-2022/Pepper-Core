import {DB} from "../database";
import {Picture} from "./picture";

export async function addPicture(picture: Picture){
    const db = await DB.createDBConnection();
    const stmt = await db.prepare('INSERT INTO pictures(url) VALUES (?1)');
    await stmt.bind({1: picture.url});
    const operationResult = await stmt.run();
    await stmt.finalize();
    await db.close();
    if (operationResult.changes === null || operationResult.changes !== 1) {
        throw new Error("picture konnte nicht erstellt werden");
    } else {
        pictureID: operationResult.lastID;
    }
}

export async function getAllPersons(): Promise<Picture[]>{
    const db = await DB.createDBConnection();
    const users: Picture[] = await db.all<Picture[]>('SELECT * FROM pictures');
    await db.close();
    return users;
}

