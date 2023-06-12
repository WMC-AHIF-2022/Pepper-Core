import {PersonUser} from "./person-user";
import {DB} from "../database";
import {StatusCodes} from "http-status-codes";

export async function getUserDetails(username:string):Promise<PersonUser|undefined>{
    const db = await  DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM personsUsers WHERE username = ?1`);
    await stmt.bind({1: username});
    const result: PersonUser | undefined = await stmt.get<PersonUser>();
    await stmt.finalize();
    await db.close();
    return result;
}

export async function addPersonUser(personUser: PersonUser) {
    const db = await DB.createDBConnection();
    const stmt = await db.prepare('INSERT INTO personsUsers (username, password, firstName, lastName, birthdate, gender) VALUES (?1, ?2, ?3, ?4, ?5, ?6)');
    await stmt.bind({1: personUser.username, 2: personUser.password, 3: personUser.firstName, 4: personUser.lastName, 5: personUser.birthdate, 6: personUser.gender});
    const operationResult = await stmt.run();
    await stmt.finalize();
    await db.close();

    if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
        throw new Error("Adding PersonUser Error!");
    } else {
        personUser.id = operationResult.lastID!;
    }
}
export async function updatePersonUser(firstName: string, lastName: string, birthdate: string, gender: string, username: string) {
    const db = await DB.createDBConnection();
    const stmt = await db.prepare('update personsUsers set firstName = ?1, lastName = ?2, birthdate = ?3, gender = ?4 where username = ?5');
    await stmt.bind({1: firstName, 2: lastName, 3: birthdate, 4: gender, 5: username});
    const operationResult = await stmt.run();
    await stmt.finalize();
    await db.close();
}

export async function isAuthorized(personUser: PersonUser): Promise<boolean>{
    const db = await  DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM personsUsers WHERE username = ?1`);
    await stmt.bind({1: personUser.username});
    const result: PersonUser | undefined = await stmt.get<PersonUser>();
    await stmt.finalize();
    await db.close();

    return typeof result !== "undefined" && result.password === personUser.password
}
