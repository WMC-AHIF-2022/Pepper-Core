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
    console.log(picture);
    try {
        console.log("1")
        await addPicture(picture);
        console.log("2")
        response.sendStatus(StatusCodes.OK);
    }
    catch (e) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    }
});

pictureRouter.get("/:username", async (request, response) => {
    console.log("4")
    const username: string = request.params.username;
    const db = await  DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM pictures WHERE username = ?1`);
    await stmt.bind({1: username});
    const result: Picture[] | undefined = await stmt.all<Picture[]>();
    await stmt.finalize();
    await db.close();
    console.log(result)
    console.log("2")
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

pictureRouter.delete("/", async function (request, response) {
    const db = await DB.createDBConnection();
    await db.all('truncate table pictures');
    await db.close();
    response.status(StatusCodes.OK);
});