import {DB} from "../database";
import {Person} from "./person";

export async function addPerson(person: Person){
    const db = await DB.createDBConnection();
    const stmt = await db.prepare('INSERT INTO persons(firstName, lastName, birthdate, gender) VALUES (?1, ?2, ?3, ?4)');
    await stmt.bind({1: person.firstName, 2: person.lastName, 3: person.birthdate, 4: person.gender});
    const operationResult = await stmt.run();
    await stmt.finalize();
    await db.close();

    person.personID = operationResult.lastID!;
}

export async function getAllPersons(): Promise<Person[]>{
    const db = await DB.createDBConnection();
    const persons: Person[] = await db.all<Person[]>('SELECT * FROM persons');
    await db.close();
    return persons;
}

/*
async function getNextPersonID(): Promise<number> {
    const db = await DB.createDBConnection();
    const nextPersonID: number = await db.all('select count(personID) from persons');
    await db.close();
    return nextPersonID;
}*/