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
const profilePictureImage = document.getElementById("profilePicture") as HTMLImageElement;
const pic:Picture[] = await fetchRestEndpoint(`/api/pictures/${sessionStorage.getItem("user-name")}`, "GET").then(r => r.json());
let img;
const reader = sessionStorage.getItem("reader-result");
for(let i = 0;i < pic.length;i++){
    if (typeof reader === "string") {
        img = new Image();
        img.src = pic[i].url;
        if (i === 0) {
            profilePictureImage.src = img.src;
        } else if (i === 1) {
            imgItemOne.src = img.src;
        } else if (i === 2) {
            imgItemTwo.src = img.src;
        } else if (i === 3) {
            imgItemThree.src = img.src;
        } else if (i === 4) {
            imgItemFour.src = img.src;
        }
    }
}