import express from "express";
import {StatusCodes} from "http-status-codes";
import {PersonUser} from "../data/person-user";
import {addPersonUser, updatePersonUser} from "../data/person-user-repository";
import {isAuthorized,getUserDetails, getAllPersonUsers} from "../data/person-user-repository";
import {DB} from "../database";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {isAuthenticated1} from "../middleware/auth-handler";
import * as fs from "fs";

export const personUserRouter = express.Router();

export const saltRounds: number = 8;

export const secretKey = "hvzfjkbbj5h7bniuhiuuq4asbjkfnejwnfjn="

personUserRouter.delete("/",async function (request,response){
    const db = await DB.createDBConnection();
    await db.all(`truncate table personsUsers`);
    await db.close();
    response.status(StatusCodes.OK);
})

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
    personUser.password = await bcrypt.hash(password, saltRounds);

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
        const user = {username: username}
        const token = jwt.sign(user, secretKey, {expiresIn: '30m'});
        console.log(token);
        response.status(StatusCodes.OK).json({accessToken: token});
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
        await updatePersonUser(firstName, lastName, birthdate, gender, username);
        response.sendStatus(StatusCodes.OK);
    }
    catch (e) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    }
});


personUserRouter.get("/", async function (request, response) {
    const allPersonUsers: PersonUser[] = await getAllPersonUsers();
    response.status(StatusCodes.OK).json(allPersonUsers);
});

personUserRouter.post("/:username", async function (request, response) {
    const username: string = request.params.username;

    const createFolder = (folderName: string) => {
        // Überprüfe, ob der Ordner bereits existiert
        if (!fs.existsSync(folderName)) {
            // Erstelle den Ordner
            fs.mkdirSync(folderName);
            console.log(`Der Ordner ${folderName} wurde erfolgreich erstellt.`);
        } else {
            console.log(`Der Ordner ${folderName} existiert bereits.`);
        }
    }

    const moveFolder = (sourcePath: string, destinationPath: string) => {
        // Überprüfe, ob der Quellordner existiert
        if (fs.existsSync(sourcePath)) {
            // Versuche, den Ordner zu verschieben
            try {
                fs.renameSync(sourcePath, destinationPath);
                console.log(`Der Ordner wurde erfolgreich von ${sourcePath} nach ${destinationPath} verschoben.`);
            } catch (error) {
                console.error(`Beim Verschieben des Ordners ist ein Fehler aufgetreten: ${error}`);
            }
        } else {
            console.log(`Der Quellordner ${sourcePath} existiert nicht.`);
        }
    };

    createFolder(username);

    const sourcePath = `${username}`;
    const destinationPath = `./src/client/memoryPictures/${username}`;
    moveFolder(sourcePath, destinationPath);

    response.sendStatus(StatusCodes.OK);
});