import express from "express";
import {StatusCodes} from "http-status-codes";
import {Picture} from "../data/picture";
import {addPicture} from "../data/pictures-repository";
import {DB} from "../database";
export const pictureRouter = express.Router();

pictureRouter.post("/:username", async function (request, response) {
    const url: string = request.body.url;
    const username: string = request.params.username;
    const picture: Picture = {
        pictureID: -1,
        url: url,
        username: username,
        profilePicture: "-1"
    }
    try {
        await addPicture(picture);
        response.sendStatus(StatusCodes.OK);
    }
    catch (e) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    }
});

pictureRouter.post("/", async function (request, response) {
    const url: string = request.body.url;
    const username: string = request.body.username;
    const profilePicture:string = request.body.profilePicture;
    const picture: Picture = {
        pictureID: -1,
        url: url,
        username: username,
        profilePicture: profilePicture
    }
    try {
        await addPicture(picture);
        response.sendStatus(StatusCodes.OK);
    }
    catch (e) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    }
});

pictureRouter.get("/:username", async (request, response) => {
    const username: string = request.params.username;
    const db = await  DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM pictures WHERE username = ?1`);
    await stmt.bind({1: username});
    const result: Picture[] | undefined = await stmt.all<Picture[]>();
    await stmt.finalize();
    await db.close();
    response.status(StatusCodes.OK).json(result);
});

pictureRouter.get("/", async (request, response) => {
    const db = await  DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM pictures`);
    const result: Picture[] | undefined = await stmt.all<Picture[]>();
    await stmt.finalize();
    await db.close();
    response.status(StatusCodes.OK).json(result);
});

pictureRouter.get("/profilePicture/:username", async (request, response) => {
    const username: string = request.params.username;
    const db = await  DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM pictures where username = ?1 and profilePicture = "true"`);
    await stmt.bind({1: username});
    const result: Picture | undefined = await stmt.get<Picture>();
    await stmt.finalize();
    await db.close();

    if (typeof result === "undefined") {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
        response.status(StatusCodes.OK).json(result);
    }
});

pictureRouter.get("/memoryPictures/:username", async (request, response) => {
    const username: string = request.params.username;
    const db = await  DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM pictures where username = ?1 and profilePicture = "false"`);
    await stmt.bind({1: username});
    const result: Picture[] | undefined = await stmt.all<Picture[]>();
    await stmt.finalize();
    await db.close();

    if (typeof result === "undefined") {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
        response.status(StatusCodes.OK).json(result);
    }
});

pictureRouter.delete("/", async function (request, response) {
    const db = await DB.createDBConnection();
    await db.all('truncate table pictures');
    await db.close();
    response.status(StatusCodes.OK);
});

pictureRouter.delete("/memoryPictures/:username", async function (request, response) {
    const username: string = request.params.username;
    const db = await DB.createDBConnection();
    const stmt = await db.prepare('delete from pictures where username = ?1 and profilePicture = ?2');
    await stmt.bind({1: username,2:"false"});
    const result = await stmt.run();
    await stmt.finalize();
    await db.close();
    response.status(StatusCodes.OK);
});
pictureRouter.delete("/profilePictures/:username", async function (request, response) {
    const username: string = request.params.username;
    const db = await DB.createDBConnection();
    const stmt = await db.prepare('delete from pictures where username = ?1 and profilePicture = ?2');
    await stmt.bind({1: username,2:"true"});
    const result = await stmt.run();
    await stmt.finalize();
    await db.close();
    response.status(StatusCodes.OK);
});