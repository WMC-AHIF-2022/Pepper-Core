import { fetchRestEndpoint } from "./utils/client-server.js";
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const loginStatus = document.getElementById("loginStatus");
const loginError = document.getElementById("loginError");
btnSignup.addEventListener("click", async () => await signup());
btnLogin.addEventListener("click", async () => await login());
const logoutBtn = <HTMLButtonElement>document.getElementById("logoutBtn");
logoutBtn.addEventListener("click",function() {
    sessionStorage.clear();
    window.location.href = "pages/CreateandViewUser/CreateandViewUser.html";
});
async function login() {
    try {
        loginStatus.innerHTML = "";
        loginError.innerHTML = "";
        const elementUsername = <HTMLInputElement>document.getElementById("username");
        const username = elementUsername.value;
        const elementPassword = <HTMLInputElement>document.getElementById("password");
        const password = elementPassword.value;
        const data = JSON.parse(`{"username": "${username}", "password": "${password}"}`);
        await fetchRestEndpoint("http://localhost:3000/api/personUser/login", "POST", data);
        sessionStorage.setItem('user-name', username);
        sessionStorage.setItem('user-password', password);
        loginStatus.innerHTML = "erfolgreich eingelogt";
        window.location.href = "/pages/CreateandViewUser/CreateandViewUser.html";
    } catch (e) {
        loginError.innerHTML = `Login failed: ${e}`;
    }
}
async function signup() {
    try {
        loginError.innerHTML = "";
        const elementUsername = <HTMLInputElement>document.getElementById("username");
        const username = elementUsername.value;
        const elementPassword = <HTMLInputElement>document.getElementById("password");
        const password = elementPassword.value;
        const data = JSON.parse(`{"username": "${username}", "password": "${password}"}`);
        await fetchRestEndpoint("http://localhost:3000/api/personUser/signup", "POST", data);
        loginStatus.innerHTML = "Signup successful, please login to continue";
    } catch (e) {
        loginError.innerHTML = `Signup failed: ${e}`;
    }
}