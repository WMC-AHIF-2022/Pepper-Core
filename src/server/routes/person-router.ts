import express from "express";
import {StatusCodes} from "http-status-codes";
import {addPerson, getAllPersons} from "../data/person-repository";
import {Person} from "../data/person";

export const personRouter = express.Router();

personRouter.post("/", async (request, response) => {
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const birthdate: string = request.body.birthdate;
    const gender: string = request.body.gender;

    const person: Person = {
        personID: -1,
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        gender: gender,
        userID: NaN
    }
    try {
        await addPerson(person);
        response.status(StatusCodes.CREATED).send(person);
    } catch (e) {
        console.log("Error im catch!!!!!!!!!!!");
        response.sendStatus(StatusCodes.BAD_REQUEST)
    }
})

personRouter.get("/", async (request, response) => {
    const persons = await getAllPersons();
    response.status(StatusCodes.OK).json(persons);
})