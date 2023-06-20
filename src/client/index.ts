import {fetchRestEndpoint} from "./utils/client-server.js";
const btnCreate = document.getElementById("createUserButton") as HTMLButtonElement;
const loginStatus = document.getElementById("loginStatus");
const loginError = document.getElementById("loginError");
const elementFirstName = <HTMLInputElement>document.getElementById("inputFirstName");
const elementLastName = <HTMLInputElement>document.getElementById("inputLastName");
const elementBirthdate = <HTMLInputElement>document.getElementById("inputBirthdate");
const elementGender = <HTMLInputElement>document.getElementById("inputGender");
const logoutBtn = <HTMLButtonElement>document.getElementById("logoutBtn");
const fileInput = document.getElementById('formFileProfilePictureInput') as HTMLInputElement;
const fileInputMore = document.getElementById('formFileMultipleMemoryPictureInput') as HTMLInputElement;
logoutBtn.addEventListener("click",function() {
    sessionStorage.clear();
    window.location.href = "/pages/logIn-SignUp/LogIn-SignUp.html";
});
interface Picture {
    pictureID: number;
    url: string;
    username: string;
    profilePicture: string;
}
sessionStorage.setItem("memPictures","false");
if(sessionStorage.getItem("user-name") !== null){
    const user = await fetchRestEndpoint(`/api/personUser/${sessionStorage.getItem("user-name")}`,"GET").then(r => r.json());
    if(user.firstName === ' ' && sessionStorage.getItem("memPictures") === "false"){
        alert("You can create a User now!");
    }
    else if(user.firstName !== ' ' && sessionStorage.getItem("memPictures") === "false"){
        fileInput.disabled = true;
        elementFirstName.value = user.lastName;
        elementLastName.value = user.lastName;
        elementBirthdate.value = user.birthdate;
        elementGender.value = user.gender;
    }
    else{
        window.location.href = "/pages/viewUser/viewUser.html";
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


fileInputMore.addEventListener('change',  async function (e) {
    await fetchPicture(fileInputMore.files[0],"false");
    await fetchPicture(fileInputMore.files[1],"false");
    await fetchPicture(fileInputMore.files[2],"false");
    await fetchPicture(fileInputMore.files[3],"false");
    sessionStorage.setItem("memPictures","true");
    console.log("fetchen fertig");
});
fileInput.addEventListener('change', async function (e) {
    await fetchPicture(fileInput.files[0],"true");
});
async function fetchPicture(file:File,profilePicture:String) {
    let reader = new FileReader();
    const imageType = /image.*/;
    if (file.type.match(imageType)) {
        reader.onload = async function (e) {
            const img = new Image();
            if (typeof reader.result === "string") {
                img.src = reader.result;
            }
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"), profilePicture: profilePicture};

            await fetchRestEndpoint(`/api/pictures`, "POST", data);
        }
        reader.readAsDataURL(file);
    }
}
//profile picture

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