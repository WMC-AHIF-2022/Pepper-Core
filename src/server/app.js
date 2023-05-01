import express from 'express';
import { join } from "path";
import { userRouter } from "./routes/user-router";
const app = express();
const path = join(__dirname, "../client");
const options = { extensions: ["html"] };
app.use(express.json());
app.use(express.static(path, options));
app.use("/api/users", userRouter);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
const port = 3333;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
