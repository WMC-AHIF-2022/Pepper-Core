import express from "express";
import {StatusCodes} from "http-status-codes";
import {Picture} from "../data/picture";
import {addPicture} from "../data/pictures-repository";
import {DB} from "../database";

export const pictureRouter = express.Router();

pictureRouter.post("/", async function (request, response) {
    const url: string = request.body.url;

    const picture: Picture = {
        pictureID: -1,
        url: url,
        personID: 0
    }
    try {
        await addPicture(picture);
        response.sendStatus(StatusCodes.OK);
    }
    catch (e) {
        response.sendStatus(StatusCodes.BAD_REQUEST);
    }
});

pictureRouter.get("/", async (request, response) => {
    const db = await DB.createDBConnection();
    const pictures: Picture[] = await db.all<Picture[]>('SELECT * from picture')
    response.status(StatusCodes.OK).json(pictures);
});

pictureRouter.delete("/", async function (request, response) {
    const db = await DB.createDBConnection();
    await db.all('truncate table pictures');
    await db.close();
    response.status(StatusCodes.OK);
});