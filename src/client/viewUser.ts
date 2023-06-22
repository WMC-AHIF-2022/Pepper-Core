import {fetchRestEndpoint} from "./utils/client-server.js";
import {Picture} from "../server/data/picture";
import {response} from "express";
const editBtn = document.getElementById("editUserButton") as HTMLButtonElement;
const elementFirstName = <HTMLInputElement>document.getElementById("inputFirstName2");
const elementLastName = <HTMLInputElement>document.getElementById("inputLastName2");
const elementBirthdate = <HTMLInputElement>document.getElementById("inputBirthdate2");
const elementGender = <HTMLInputElement>document.getElementById("inputGender2");
const logoutBtn = <HTMLButtonElement>document.getElementById("logoutBtn");
logoutBtn.addEventListener("click",function() {
    sessionStorage.clear();
    window.location.href = "pages/CreateandViewUser/CreateandViewUser.html";
});
const user = await fetchRestEndpoint(`/api/personUser/${sessionStorage.getItem("user-name")}`,"GET").then(r => r.json());
elementFirstName.value = user.firstName;
elementLastName.value = user.lastName;
elementBirthdate.value = user.birthdate;
elementGender.value = user.gender;
editBtn.addEventListener("click",async function (){
    const data = {firstName:elementFirstName.value,lastName:elementLastName.value,gender:elementGender.value,birthdate: elementBirthdate.value};
    await fetchRestEndpoint(`/api/personUser/${sessionStorage.getItem("user-name")}`,"PUT",data);
    alert("User has been edited");
});
const imgItemOne = document.getElementById("imgItemOne") as HTMLImageElement;
const imgItemTwo = document.getElementById("imgItemTwo") as HTMLImageElement;
const imgItemThree = document.getElementById("imgItemThree") as HTMLImageElement;
const imgItemFour = document.getElementById("imgItemFour") as HTMLImageElement;
const profilePictureImage = document.getElementById("profilePicture") as HTMLImageElement;
const profilePicture = await fetchRestEndpoint(`/api/pictures/profilePicture/${sessionStorage.getItem("user-name")}`, "GET").then(r => r.json());
const pic:Picture[] = await fetchRestEndpoint(`/api/pictures/memoryPictures/${sessionStorage.getItem("user-name")}`, "GET").then(r => r.json());
let img;
for(let i = 0;i < pic.length;i++){
        img = new Image();
        img.src = pic[i].url;
        if (i === 0) {
            imgItemOne.src = img.src;
        } else if (i === 1) {
            imgItemTwo.src = img.src;
        } else if (i === 2) {
            imgItemThree.src = img.src;
        } else if (i === 3) {
            imgItemFour.src = img.src;
        }
}

let profileImage = new Image();
profileImage.src = profilePicture.url;
profilePictureImage.src = profileImage.src;


const deletePicturesBtn = document.getElementById("deletePicturesButton") as HTMLButtonElement;
deletePicturesBtn.addEventListener("click", async function () {
    sessionStorage.setItem("memPictures","false");
    alert("Your memory pictures has been deleted");
    window.location.href = "../../index.html";
    await fetchRestEndpoint(`/api/pictures/memoryPictures/${sessionStorage.getItem("user-name")}`, "DELETE");
});