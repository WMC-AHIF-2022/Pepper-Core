import express, {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {secretKey} from "../routes/person-user-router";

export const isAuthenticated1 = (req: Request,res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error("No bearer token available");
        }
        // check if the token is valid => otherwise an error is thrown
        jwt.verify(token, secretKey);
        next();
    } catch (err) {
        res.status(401).send(`Please authenticate! ${err}`);
    }
};