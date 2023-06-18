import {fetchRestEndpoint} from "./utils/client-server.js";
import {setEngine} from "crypto";
//import {Picture} from "../server/data/picture";
const btnCreate = document.getElementById("createUserButton") as HTMLButtonElement;
const editBtn = document.getElementById("editUserButton") as HTMLButtonElement;
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
const fileDisplayArea = document.getElementById('fileDisplayArea');
const fileInputMore = document.getElementById('formFileMultipleMemoryPictureInput') as HTMLInputElement;
const fileDisplayAreaMore = document.getElementById('fileDisplayAreaMore');

fileInputMore.addEventListener('change',  async function (e) {
    await fetchFirstPicture();
    await fetchSecondPicture();
    await fetchThirdPicture();
    await fetchFourthPicture()
});

//memory picture
async function fetchFirstPicture() {

    let reader = new FileReader();
    alert("1");
    console.log(fileInputMore.files);
    alert("2");
    const file = fileInputMore.files[0];
    alert("3");
    const imageType = /image.*/;
    alert("4");
    if (file.type.match(imageType)) {
        alert("5");
        reader.onload = async function (e) {
            alert("6");
            fileDisplayAreaMore.innerHTML = "";
            alert("7");
            const img = new Image();
            alert("8");
            if (typeof reader.result === "string") {
                alert("9");
                img.src = reader.result;
                alert("10");
            }
            console.log(sessionStorage.getItem("user-name") + "1");
            alert("11");
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"), profilePicture: "false"};
            alert("12");
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
            alert("13");
        }
        alert("14");
        reader.readAsDataURL(file);
        alert("15");
    } else {
        fileDisplayAreaMore.innerHTML = "File not supported!"
    }
}

async function fetchSecondPicture() {
    let reader = new FileReader();
    alert("1");
    console.log(fileInputMore.files);
    alert("2");
    const file = fileInputMore.files[1];
    alert("3");
    const imageType = /image.*/;
    alert("4");
    if (file.type.match(imageType)) {
        alert("5");
        reader.onload = async function (e) {
            alert("6");
            fileDisplayAreaMore.innerHTML = "";
            alert("7");
            const img = new Image();
            alert("8");
            if (typeof reader.result === "string") {
                alert("9");
                img.src = reader.result;
                alert("10");
            }
            console.log(sessionStorage.getItem("user-name") + "1");
            alert("11");
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"),profilePicture:"false"};
            alert("12");
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
            alert("13");
        }
        alert("14");
        reader.readAsDataURL(file);
        alert("15");
    } else {
        fileDisplayAreaMore.innerHTML = "File not supported!"
    }
}

async function fetchThirdPicture() {
    let reader = new FileReader();
    alert("1");
    console.log(fileInputMore.files);
    alert("2");
    const file = fileInputMore.files[2];
    alert("3");
    const imageType = /image.*/;
    alert("4");
    if (file.type.match(imageType)) {
        alert("5");
        reader.onload = async function (e) {
            alert("6");
            fileDisplayAreaMore.innerHTML = "";
            alert("7");
            const img = new Image();
            alert("8");
            if (typeof reader.result === "string") {
                alert("9");
                img.src = reader.result;
                alert("10");
            }
            console.log(sessionStorage.getItem("user-name") + "1");
            alert("11");
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"),profilePicture:"false"};
            alert("12");
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
            alert("13");
        }
        alert("14");
        reader.readAsDataURL(file);
        alert("15");
    } else {
        fileDisplayAreaMore.innerHTML = "File not supported!"
    }
}

async function fetchFourthPicture() {
    let reader = new FileReader();
    alert("1");
    console.log(fileInputMore.files);
    alert("2");
    const file = fileInputMore.files[3];
    alert("3");
    const imageType = /image.*/;
    alert("4");
    if (file.type.match(imageType)) {
        alert("5");
        reader.onload = async function (e) {
            alert("6");
            fileDisplayAreaMore.innerHTML = "";
            alert("7");
            const img = new Image();
            alert("8");
            if (typeof reader.result === "string") {
                alert("9");
                img.src = reader.result;
                alert("10");
            }
            console.log(sessionStorage.getItem("user-name") + "1");
            alert("11");
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"),profilePicture:"false"};
            alert("12");
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
            alert("13");
        }
        alert("14");
        reader.readAsDataURL(file);
        alert("15");
    } else {
        fileDisplayAreaMore.innerHTML = "File not supported!"
    }
}

//profile picture
fileInput.addEventListener('change', async function (e) {
    const file = fileInput.files[0];
    const imageType = /image.*/;
    let reader = new FileReader();
    if (file.type.match(imageType)) {
        reader.onload = async function (e) {
            fileDisplayArea.innerHTML = "";
            const img = new Image();
            if (typeof reader.result === "string") {
                sessionStorage.setItem("reader-result", reader.result);
                img.src = reader.result;
            }
            console.log(sessionStorage.getItem("user-name") + "3");
            const data = {url: reader.result, username: sessionStorage.getItem("user-name"),profilePicture:"true"};
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
        }
        reader.readAsDataURL(file);
    } else {
        fileDisplayArea.innerHTML = "File not supported!"
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


//https://runebook.dev/de/docs/html/element/input/file
//document.getElementById("profilePicture").addEventListener('change', dateiauswahl, false)

