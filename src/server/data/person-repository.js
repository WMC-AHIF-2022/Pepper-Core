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
exports.getAllPersons = exports.addPerson = void 0;
const database_1 = require("../database");
function addPerson(person) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare('INSERT INTO persons(firstName, lastName, birthdate, gender) VALUES (?1, ?2, ?3, ?4)');
        yield stmt.bind({ 1: person.firstName, 2: person.lastName, 3: person.birthdate, 4: person.gender });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        person.personID = operationResult.lastID;
    });
}
exports.addPerson = addPerson;
function getAllPersons() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const persons = yield db.all('SELECT * FROM persons');
        yield db.close();
        return persons;
    });
}
exports.getAllPersons = getAllPersons;
/*
async function getNextPersonID(): Promise<number> {
    const db = await DB.createDBConnection();
    const nextPersonID: number = await db.all('select count(personID) from persons');
    await db.close();
    return nextPersonID;
}*/ 
