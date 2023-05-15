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
exports.addPerson = void 0;
const database_1 = require("../database");
function addPerson(person) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare('INSERT INTO persons(firstName, lastName, birthdate, gender, userID) VALUES (?1, ?2, ?3, ?4, ?5)');
        yield stmt.bind({ 1: person.firstName, 2: person.lastName, 3: person.birthdate, 4: person.gender, 5: person.userID });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
            throw new Error("Adding Person Error!");
        }
        else {
            person.personID = operationResult.lastID;
        }
    });
}
exports.addPerson = addPerson;
