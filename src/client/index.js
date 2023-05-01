"use strict";
import {fetchRestEndpoint} from "./utils/client-server.js";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
btnSignup.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () { return yield signup(); }));
btnLogin.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () { return yield login(); }));
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const elementUsername = document.getElementById("username");
            const username = elementUsername.value;
            const elementPassword = document.getElementById("password");
            const password = elementPassword.value;
            const data = JSON.parse(`{"username": "${username}", "password": "${password}"}`);
            yield (0, client_server_js_1.fetchRestEndpoint)("http://localhost:3333/api/users/login", "POST", data);
            sessionStorage.setItem('chat-user', username);
        }
        catch (e) {
            alert(e);
        }
    });
}
function signup() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const elementUsername = document.getElementById("username");
            const username = elementUsername.value;
            const elementPassword = document.getElementById("password");
            const password = elementPassword.value;
            const data = JSON.parse(`{"username": "${username}", "password": "${password}"}`);
            yield (0, fetchRestEndpoint)("http://localhost:3333/api/users/signup", "POST", data);
        }
        catch (e) {
            alert(e);
        }
    });
}
