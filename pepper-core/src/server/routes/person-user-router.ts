import express from "express";
import {StatusCodes} from "http-status-codes";
import {PersonUser} from "../data/person-user";
import {addPersonUser, updatePersonUser} from "../data/person-user-repository";
import {isAuthorized} from "../data/person-user-repository";

export const personUserRouter = express.Router();

personUserRouter.post("/signup", async function (request, response) {
    const username: string = request.body.username;
    const password: string = request.body.password;

    console.log("username und password aus body eingelesen");
    const personUser: PersonUser = {
        id: 0,
        username: username,
        password: password,
        firstName: " ",
        lastName: " ",
        birthdate: " ",
        gender: " "
    }
    console.log("personUser wurde erstellt");
    try {
        console.log("in addPersonUser Methode hineingehen");
        await addPersonUser(personUser);
        console.log("addPersonUser abgeschlossen");
        response.sendStatus(StatusCodes.OK);
    }
    catch (e) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    }
});

personUserRouter.post("/login", async function (request, response) {
    const username: string = request.body.username;
    const password: string = request.body.password;

    console.log("username und password aus body eingelesen");
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

    console.log("id und firstName und lastName aus body/params eingelesen");
    try {
        console.log("in updatePersonUser Methode hineingehen");
        await updatePersonUser(firstName, lastName, birthdate, gender, username);
        console.log("updatePersonUser abgeschlossen");
        response.sendStatus(StatusCodes.OK);
    }
    catch (e) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    }
});