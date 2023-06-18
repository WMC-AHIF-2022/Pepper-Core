import express from "express"
import { join } from "path"
import {pictureRouter} from "./routes/picture-router";
import {personUserRouter} from "./routes/person-user-router";

const app = express();
const bodyParser = require('body-parser');

const path = join(__dirname, "../client");
const options = { extensions: ["html"] };
app.use(express.json());
app.use(express.static(path, options));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/api/pictures", pictureRouter);
app.use("/api/personUser", personUserRouter);


const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});