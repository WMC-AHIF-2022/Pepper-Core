import express, {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export const secretKey = "hvzfjkbbj5h7bniuhiuuq4asbjkfnejwnfjn=";

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