import {fetchRestEndpoint} from "../../utils/client-server.js";
import {getUserId} from "../../../server/data/user-repository";

const btnCreate = document.getElementById("createUserButton");

const loginStatus = document.getElementById("loginStatus");
const loginError = document.getElementById("loginError");

btnCreate.addEventListener("click", async () => await createUser());

async function createUser() {
    try {
        console.log("create user methode hineingegangen");
        loginError.innerHTML = " ";
        loginStatus.innerHTML = " ";

        const elementFirstName = <HTMLInputElement>document.getElementById("inputFirstName");
        const fName = elementFirstName.value;

        const elementLastName = <HTMLInputElement>document.getElementById("inputLastName");
        const lastName = elementLastName.value;

        const elementBirthdate = <HTMLInputElement>document.getElementById("inputBirthdate");
        const birthdate = elementBirthdate.value;

        const elementGender = <HTMLInputElement>document.getElementById("inputGender");
        const gender = elementGender.value;

        const userName = sessionStorage.getItem('user-name');
        const userPassword = sessionStorage.getItem('user-password');

        console.log("in create user methode felder eingelesen");

        console.log("user id wurde geholt");

        const data = {firstName: fName, lastName: lastName,birthdate: birthdate, gender: gender};
        console.log("wowowowow");
        await fetchRestEndpoint(`http://localhost:3000/api/personUser/${userName}`, "PUT", data);
        console.log("wewewewwewe");
        loginStatus.innerHTML = "erfolgreich erstellt";


    } catch (e) {
        loginError.innerHTML = `Create failed: ${e}`;
    }
}