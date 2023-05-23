"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const user_router_1 = require("./routes/user-router");
const person_router_1 = require("./routes/person-router");
const picture_router_1 = require("./routes/picture-router");
const person_user_router_1 = require("./routes/person-user-router");
const app = (0, express_1.default)();
const path = (0, path_1.join)(__dirname, "../client");
const options = { extensions: ["html"] };
app.use(express_1.default.json());
app.use(express_1.default.static(path, options));
app.use("/api/users", user_router_1.userRouter);
app.use("/api/persons", person_router_1.personRouter);
app.use("/api/pictures", picture_router_1.pictureRouter);
app.use("/api/personUser", person_user_router_1.personUserRouter);
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
