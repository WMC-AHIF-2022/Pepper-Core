import {fetchRestEndpoint} from "./utils/client-server.js";
import {Picture} from "../server/data/picture";

const editBtn = document.getElementById("editUserButton") as HTMLButtonElement;
const elementFirstName = <HTMLInputElement>document.getElementById("inputFirstName");
const elementLastName = <HTMLInputElement>document.getElementById("inputLastName");
const elementBirthdate = <HTMLInputElement>document.getElementById("inputBirthdate");
const elementGender = <HTMLInputElement>document.getElementById("inputGender");
const user = await fetchRestEndpoint(`/api/personUser/${sessionStorage.getItem("user-name")}`,"GET").then(r => r.json());
elementFirstName.value = user.firstName;
elementLastName.value = user.lastName;
elementBirthdate.value = user.birthdate;
elementGender.value = user.gender;

editBtn.addEventListener("click",async function (){
    const data = {firstName:elementFirstName.value,lastName:elementLastName.value,gender:elementGender.value,birthdate: elementBirthdate.value};
    await fetchRestEndpoint(`/api/personUser/${sessionStorage.getItem("user-name")}`,"PUT",data);
});

const imgItemOne = document.getElementById("imgItemOne") as HTMLImageElement;
const imgItemTwo = document.getElementById("imgItemTwo") as HTMLImageElement;
const imgItemThree = document.getElementById("imgItemThree") as HTMLImageElement;
const imgItemFour = document.getElementById("imgItemFour") as HTMLImageElement;

const data: Picture[] = await fetchRestEndpoint( `/api/pictures/${user.username}`, "GET").then(r => r.json());
imgItemOne.src = `../../memoryPictures/${data[0].url}`;
imgItemTwo.src = `../../memoryPictures/${data[1].url}`;
imgItemThree.src = `../../memoryPictures/${data[2].url}`;
imgItemFour.src = `../../memoryPictures/${data[3].url}`;


