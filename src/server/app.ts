import express from "express"
import { join } from "path"
import {userRouter} from "./routes/user-router";
import cors from "cors";

const app = express();

const path = join(__dirname, "../client");
const options = { extensions: ["html"] };
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json())
app.use(express.static(path, options));
app.use("/api/users", userRouter)

const port = 3333;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});