import { fetchRestEndpoint } from "../../utils/client-server";
import { getUserId } from "../../../server/data/user-repository";
const btnCreate = document.getElementById("createUserButton");
const loginStatus = document.getElementById("loginStatus");
const loginError = document.getElementById("loginError");
btnCreate.addEventListener("click", async () => await createUser());
async function createUser() {
    try {
        console.log("create user methode hineingegangen");
        loginError.innerHTML = " ";
        loginStatus.innerHTML = " ";
        const elementFirstName = document.getElementById("inputFirstName");
        const firstName = elementFirstName.value;
        const elementLastName = document.getElementById("inputLastName");
        const lastName = elementLastName.value;
        const elementBirthdate = document.getElementById("inputBirthdate");
        const birthdate = elementBirthdate.value;
        const elementGender = document.getElementById("inputGender");
        const gender = elementGender.value;
        const userName = sessionStorage.getItem('user-name');
        const userPassword = sessionStorage.getItem('user-password');
        console.log("in create user methode felder eingelesen");
        const userID = await getUserId(userName, userPassword);
        console.log("user id wurde geholt");
        const data = JSON.parse(`{"firstName": "${firstName}", "lastName": "${lastName}", "birthdate": "${birthdate}", "gender": "${gender}", "userID": "${userID}`);
        console.log("wowowowow");
        await fetchRestEndpoint("http://localhost:3000/api/persons/", "POST", data);
        console.log("wewewewwewe");
        loginStatus.innerHTML = "erfolgreich erstellt";
    }
    catch (e) {
        loginError.innerHTML = `Create failed: ${e}`;
    }
}
//# sourceMappingURL=createUser.js.map