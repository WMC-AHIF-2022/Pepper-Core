import {DB} from "../database";
import {Person} from "./person";

export async function addPerson(person: Person) {
    const db = await DB.createDBConnection();
    const stmt = await db.prepare('INSERT INTO persons(firstName, lastName, birthdate, gender, userID) VALUES (?1, ?2, ?3, ?4, ?5)');
    await stmt.bind({1: person.firstName, 2: person.lastName, 3: person.birthdate, 4: person.gender, 5: person.userID});
    const operationResult = await stmt.run();
    await stmt.finalize();
    await db.close();

    if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
        throw new Error("Adding Person Error!");

    } else {
        person.personID = operationResult.lastID!;
    }
}