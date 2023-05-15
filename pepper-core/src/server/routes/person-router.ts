import express from "express";
import {StatusCodes} from "http-status-codes";
import {addPerson} from "../data/person-repository";
import {Person} from "../data/person";
import {DB} from "../database";

export const personRouter = express.Router();

personRouter.post("/", async function (request, response) {
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const birthdate: string = request.body.birthdate;
    const gender: string = request.body.gender;
    const userID: number = request.body.userID;


    const person: Person = {
        personID: -1,
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        gender: gender,
        userID: userID
    }
    try {
        await addPerson(person);
        response.sendStatus(StatusCodes.OK);
    }
    catch (e) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    }
});

personRouter.delete("/", async function (request, response) {
    const db = await DB.createDBConnection();
    await db.all('truncate table persons');
    await db.close();
    response.status(StatusCodes.OK);
});

personRouter.get("/", async function (request, response) {
    const db = await DB.createDBConnection();
    const persons: Person[] = await db.all<Person[]>('select * from persons');
    await db.close();
    response.status(StatusCodes.OK).json(persons);
});