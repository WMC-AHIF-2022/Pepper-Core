import {fetchRestEndpoint} from "./utils/client-server.js";

const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");

if(btnSignup){
    btnSignup.addEventListener("click", async () => await signup());
}
if(btnLogin){
    btnLogin.addEventListener("click", async () => await login());
}


async function login(){
    try{
        const elementUsername = <HTMLInputElement>document.getElementById("username");
        const username = elementUsername.value;
        const elementPassword = <HTMLInputElement>document.getElementById("password");
        const password = elementPassword.value;

        const data = JSON.parse(`{"username": "${username}", "password": "${password}"}`);
        await fetchRestEndpoint("http://localhost:3333/api/users/login", "POST", data);
        console.log("Yessir");
        sessionStorage.setItem('chat-user', username);
    }catch (e){
        alert(e);
    }
}

async function signup(){
    try{
        const elementUsername = <HTMLInputElement>document.getElementById("username");
        const username = elementUsername.value;
        const elementPassword = <HTMLInputElement>document.getElementById("password");
        const password = elementPassword.value;

        const data = JSON.parse(`{"username": "${username}", "password": "${password}"}`);
        await fetchRestEndpoint("http://localhost:3333/api/users/signup", "POST", data);
        console.log("Yessir");
    }catch (e){
        alert(e);
    }
}
