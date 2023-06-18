import {fetchRestEndpoint} from "./utils/client-server.js";
const btnCreate = document.getElementById("createUserButton") as HTMLButtonElement;
const loginStatus = document.getElementById("loginStatus");
const loginError = document.getElementById("loginError");
const elementFirstName = <HTMLInputElement>document.getElementById("inputFirstName");
const elementLastName = <HTMLInputElement>document.getElementById("inputLastName");
const elementBirthdate = <HTMLInputElement>document.getElementById("inputBirthdate");
const elementGender = <HTMLInputElement>document.getElementById("inputGender");
interface Picture {
    pictureID: number;
    url: string;
    username: string;
    profilePicture: string;
}
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
const fileInput = document.getElementById('formFileProfilePictureInput') as HTMLInputElement;
const fileInputMore = document.getElementById('formFileMultipleMemoryPictureInput') as HTMLInputElement;
fileInputMore.addEventListener('change',  async function (e) {
    await fetchFirstPicture();
    await fetchSecondPicture();
    await fetchThirdPicture();
    await fetchFourthPicture();
    console.log("fetchen fertig");
});
//memory picture
async function fetchFirstPicture() {

    let reader = new FileReader();
    const file = fileInputMore.files[0];
    const imageType = /image.*/;
    if (file.type.match(imageType)) {
        reader.onload = async function (e) {
            const img = new Image();
            if (typeof reader.result === "string") {
                img.src = reader.result;
            }
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"), profilePicture: "false"};
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
        }
        reader.readAsDataURL(file);
    }
}
async function fetchSecondPicture() {
    let reader = new FileReader();
    const file = fileInputMore.files[1];
    const imageType = /image.*/;
    if (file.type.match(imageType)) {
        reader.onload = async function (e) {
            const img = new Image();
            if (typeof reader.result === "string") {
                img.src = reader.result;
            }
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"),profilePicture:"false"};
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
        }
        reader.readAsDataURL(file);
    }
}
async function fetchThirdPicture() {
    let reader = new FileReader();
    const file = fileInputMore.files[2];
    const imageType = /image.*/;
    if (file.type.match(imageType)) {
        reader.onload = async function (e) {
            const img = new Image();
            if (typeof reader.result === "string") {
                img.src = reader.result;
            }
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"),profilePicture:"false"};
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
        }
        reader.readAsDataURL(file);
    }
}
async function fetchFourthPicture() {
    let reader = new FileReader();
    const file = fileInputMore.files[3];
    const imageType = /image.*/;
    if (file.type.match(imageType)) {
        reader.onload = async function (e) {
            const img = new Image();
            if (typeof reader.result === "string") {
                img.src = reader.result;
            }
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"),profilePicture:"false"};
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
        }
        reader.readAsDataURL(file);
    }
}
//profile picture
fileInput.addEventListener('change', async function (e) {
    const file = fileInput.files[0];
    const imageType = /image.*/;
    let reader = new FileReader();
    if (file.type.match(imageType)) {
        reader.onload = async function (e) {
            const img = new Image();
            if (typeof reader.result === "string") {
                sessionStorage.setItem("reader-result", reader.result);
                img.src = reader.result;
            }
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"),profilePicture:"true"};
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
        }
        reader.readAsDataURL(file);
    }
});
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