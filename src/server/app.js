"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const user_router_1 = require("./routes/user-router");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const path = (0, path_1.join)(__dirname, "../client");
const options = { extensions: ["html"] };
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions)); // Use this after the variable declaration
app.use(express_1.default.json());
app.use(express_1.default.static(path, options));
app.use("/api/users", user_router_1.userRouter);
const port = 3333;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
