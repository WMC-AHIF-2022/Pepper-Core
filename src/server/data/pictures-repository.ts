import {DB} from "../database";
import {Picture} from "./picture";

export async function addPicture(picture: Picture) {
    const db = await DB.createDBConnection();
    const stmt = await db.prepare('INSERT INTO pictures(url, username) VALUES (?1, ?2)');
    await stmt.bind({1: picture.url, 2: picture.username});
    const operationResult = await stmt.run();
    await stmt.finalize();
    await db.close();

    if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
        throw new Error("Adding Picture Error!");
    } else {
        picture.pictureID = operationResult.lastID!;
    }
}