import {fetchRestEndpoint} from "./utils/client-server.js";

const editBtn = document.getElementById("editUserButton") as HTMLButtonElement;
const elementFirstName = <HTMLInputElement>document.getElementById("inputFirstName");
const elementLastName = <HTMLInputElement>document.getElementById("inputLastName");
const elementBirthdate = <HTMLInputElement>document.getElementById("inputBirthdate");
const elementGender = <HTMLInputElement>document.getElementById("inputGender");
alert("1");
const user = await fetchRestEndpoint(`/api/personUser/${sessionStorage.getItem("user-name")}`,"GET").then(r => r.json());
elementFirstName.value = user.firstName;
elementLastName.value = user.lastName;
elementBirthdate.value = user.birthdate;
elementGender.value = user.gender;

editBtn.addEventListener("click",async function (){
    const data = {firstName:elementFirstName.value,lastName:elementLastName.value,gender:elementGender.value,birthdate: elementBirthdate.value};
    await fetchRestEndpoint(`/api/personUser/${sessionStorage.getItem("user-name")}`,"PUT",data);
})
