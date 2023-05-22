import express from "express";
import {StatusCodes} from "http-status-codes";
import {addPerson, getAllPersons} from "../data/person-repository";
import {Picture} from "../data/picture";

export const personRouter = express.Router();

personRouter.post("/", async (request, response) => {
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const birthdate: string = request.body.birthdate;
    const gender: string = request.body.gender;

    /*const person: Picture = {
        personID: -1,
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        gender: gender
    }

    addPerson(person);

    //const isUserAuthorized: boolean = await isAuthorized(user);
    /*if (isUserAuthorized){
        response.sendStatus(StatusCodes.OK);
    }
    else {
        response.sendStatus(StatusCodes.UNAUTHORIZED);
    }*/

})

personRouter.get("/", async (request, response) => {
    const persons = await getAllPersons();
    response.status(StatusCodes.OK).json(persons);
})