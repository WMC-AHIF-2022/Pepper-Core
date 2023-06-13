import {fetchRestEndpoint} from "./utils/client-server.js";
import {PersonUser} from "../server/data/person-user";
const btnCreate = document.getElementById("createUserButton") as HTMLButtonElement;
const editBtn = document.getElementById("editUserButton") as HTMLButtonElement;
const loginStatus = document.getElementById("loginStatus");
const loginError = document.getElementById("loginError");
const elementFirstName = <HTMLInputElement>document.getElementById("inputFirstName");
const elementLastName = <HTMLInputElement>document.getElementById("inputLastName");
const elementBirthdate = <HTMLInputElement>document.getElementById("inputBirthdate");
const elementGender = <HTMLInputElement>document.getElementById("inputGender");

if(sessionStorage.getItem("user-name") !== null){
    const user = await fetchRestEndpoint(`/api/personUser/${sessionStorage.getItem("user-name")}`,"GET").then(r => r.json());
    if(user.firstName === ' '){
        alert("You can create a User now!");
    }
    else{
        window.location.href = "/pages/viewUser/viewUser.html";
        elementFirstName.value = user.lastName;
        elementLastName.value = user.lastName;
        elementBirthdate.value = user.birthdate;
        elementGender.value = user.gender;
    }
}

if(sessionStorage.getItem("user-name") !== null){
    btnCreate.disabled = false;
}

btnCreate.addEventListener("click", async function (){
    if(sessionStorage.getItem("user-name") !== null){
        await createUser();
    }
    else{
        alert("You have to SignUp/Login before you can create your User!");
    }
});

//https://runebook.dev/de/docs/html/element/input/file
//document.getElementById("profilePicture").addEventListener('change', dateiauswahl, false)

async function createUser() {
    try {
        loginError.innerHTML = " ";
        loginStatus.innerHTML = " ";


        const fName = elementFirstName.value;

        const lastName = elementLastName.value;

        const birthdate = elementBirthdate.value;

        const gender = elementGender.value;

        const userName = sessionStorage.getItem('user-name');
        const userPassword = sessionStorage.getItem('user-password');

        const data = {firstName: fName, lastName: lastName,birthdate: birthdate, gender: gender};
        await fetchRestEndpoint(`http://localhost:3000/api/personUser/${userName}`, "PUT", data);
        loginStatus.innerHTML = "erfolgreich erstellt";
        window.location.href = "/pages/viewUser/viewUser.html";
    } catch (e) {
        loginError.innerHTML = `Create failed: ${e}`;
    }
}