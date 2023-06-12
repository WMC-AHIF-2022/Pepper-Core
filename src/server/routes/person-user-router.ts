import express from "express";
import {StatusCodes} from "http-status-codes";
import {PersonUser} from "../data/person-user";
import {addPersonUser, updatePersonUser} from "../data/person-user-repository";
import {isAuthorized,getUserDetails} from "../data/person-user-repository";
import {DB} from "../database";

export const personUserRouter = express.Router();

personUserRouter.get("/:username", async function (request, response) {
    const username = request.params.username;
    const db = await  DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM personsUsers WHERE username = ?1`);
    await stmt.bind({1: username});
    const result: PersonUser | undefined = await stmt.get<PersonUser>();
    await stmt.finalize();
    await db.close();
    response.send(result);
});

personUserRouter.post("/signup", async function (request, response) {
    const username: string = request.body.username;
    const password: string = request.body.password;

    const personUser: PersonUser = {
        id: 0,
        username: username,
        password: password,
        firstName: " ",
        lastName: " ",
        birthdate: " ",
        gender: " "
    }
    try {
        await addPersonUser(personUser);
        response.sendStatus(StatusCodes.OK);
    }
    catch (e) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    }
});

personUserRouter.post("/login", async function (request, response) {
    const username: string = request.body.username;
    const password: string = request.body.password;

    const personUser: PersonUser = {
        id: 0,
        username: username,
        password: password,
        firstName: " ",
        lastName: " ",
        birthdate: " ",
        gender: " "
    }


    const isUserAuthorized: boolean = await isAuthorized(personUser);
    if (isUserAuthorized){
        response.sendStatus(StatusCodes.OK);
    }
    else {
        response.sendStatus(StatusCodes.UNAUTHORIZED);
    }
});

personUserRouter.put("/:username", async function (request, response) {
    const username: string = request.params.username;
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const birthdate: string = request.body.birthdate;
    const gender: string = request.body.gender;

    try {
        console.log("1");
        await updatePersonUser(firstName, lastName, birthdate, gender, username);
        console.log("FERTIG!!!!!!!");
        response.sendStatus(StatusCodes.OK);
    }
    catch (e) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    }
});