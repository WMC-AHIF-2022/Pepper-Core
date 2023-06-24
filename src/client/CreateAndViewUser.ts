import { fetchRestEndpoint } from "./utils/client-server.js";
import {File} from "buffer";
const btnCreate = document.getElementById("createUserButton");
const elementFirstName = document.getElementById("inputFirstName")  as HTMLInputElement;
const elementLastName = document.getElementById("inputLastName")  as HTMLInputElement;
const elementBirthdate = document.getElementById("inputBirthdate")  as HTMLInputElement;
const elementGender = document.getElementById("inputGender") as HTMLInputElement;
const logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;
const fileInput = document.getElementById('formFileProfilePictureInput') as HTMLInputElement;
const fileInputMore = document.getElementById('formFileMultipleMemoryPictureInput') as HTMLInputElement;
const imgItemOne = document.getElementById("imgItemOne") as HTMLImageElement;
const imgItemTwo = document.getElementById("imgItemTwo") as HTMLImageElement;
const imgItemThree = document.getElementById("imgItemThree") as HTMLImageElement;
const imgItemFour = document.getElementById("imgItemFour") as HTMLImageElement;
const profilePictureImage = document.getElementById("profilePicture") as HTMLImageElement;
const deleteProfilePicture = document.getElementById("deleteProfilePicture") as HTMLButtonElement;
const deleteMemoryPictures = document.getElementById("deleteMemoryPictures") as HTMLButtonElement;
logoutBtn.addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "index.html";
});
if (sessionStorage.getItem("user-name") !== null) {
    const user = await fetchRestEndpoint(`/api/personUser/${sessionStorage.getItem("user-name")}`, "GET").then(r => r.json());
    if (user.firstName === ' ') {
        alert("You can create a User now!");
        deleteProfilePicture.disabled = true;
        deleteMemoryPictures.disabled = true;
    }
    else if (user.firstName !== ' ') {
        elementFirstName.value = user.lastName;
        elementLastName.value = user.lastName;
        elementBirthdate.value = user.birthdate;
        elementGender.value = user.gender;
        await loadPictures();
    }
}
async function loadPictures() {
    const profilePicture = await fetchRestEndpoint(`/api/pictures/profilePicture/${sessionStorage.getItem("user-name")}`, "GET").then(r => r.json());
    const pic = await fetchRestEndpoint(`/api/pictures/memoryPictures/${sessionStorage.getItem("user-name")}`, "GET").then(r => r.json());
    let img;
    for (let i = 0; i < pic.length; i++) {
        img = new Image();
        img.src = pic[i].url;
        if (i === 0) {
            imgItemOne.src = img.src;
        }
        else if (i === 1) {
            imgItemTwo.src = img.src;
        }
        else if (i === 2) {
            imgItemThree.src = img.src;
        }
        else if (i === 3) {
            imgItemFour.src = img.src;
        }
    }
    let profileImage = new Image();
    profileImage.src = profilePicture.url;
    profilePictureImage.src = profileImage.src;
}
deleteProfilePicture.addEventListener("click", async function () {
    fileInput.value = "";
    deleteProfilePicture.disabled = true;
    profilePictureImage.src = "";
    await fetchRestEndpoint(`/api/pictures/profilePictures/${sessionStorage.getItem("user-name")}`, "DELETE");
});
deleteMemoryPictures.addEventListener("click", async function () {
    fileInputMore.value = "";
    deleteMemoryPictures.disabled = true;
    imgItemOne.src = "";
    imgItemTwo.src = "";
    imgItemThree.src = "";
    imgItemFour.src = "";
    await fetchRestEndpoint(`/api/pictures/memoryPictures/${sessionStorage.getItem("user-name")}`, "DELETE");
});
fileInput.addEventListener("change", async function () {
    deleteProfilePicture.disabled = false;
    if (fileInput.files.length === 1) {
        await fetchPicture(fileInput.files[0], "true");
    }
    else {
        alert("You have to select 1 ProfilePictures, if you want to create a Person");
    }
});
fileInputMore.addEventListener("change", async function () {
    deleteMemoryPictures.disabled = false;
    if (fileInputMore.files.length === 4) {
        await fetchPicture(fileInputMore.files[0], "false");
        await fetchPicture(fileInputMore.files[1], "false");
        await fetchPicture(fileInputMore.files[2], "false");
        await fetchPicture(fileInputMore.files[3], "false");
    }
    else {
        alert("You have to select exactly 4 MemoryPictures, if you want to create a Person");
    }
});
btnCreate.addEventListener("click", async function () {
    if (elementFirstName.value !== "" && elementLastName.value !== "" && elementBirthdate.value !== "" && elementGender.value !== "" && fileInputMore.files.length === 4 && fileInput.files.length === 1) {
        alert("Your Person has been created/edited");
        await createUser();
        if (fileInputMore.files.length === 4 || fileInput.files.length === 1) {
            await loadPictures();
        }
    }
    else {
        alert("You must fill out all fields");
    }
});
async function fetchPicture(file:any, profilePicture:String) {
    let reader = new FileReader();
    const imageType = /image.*/;
    if (file.type.match(imageType)) {
        reader.onload = async function (e) {
            const img = new Image();
            if (typeof reader.result === "string") {
                img.src = reader.result;
            }
            const data = { url: reader.result, username: sessionStorage.getItem("user-name"), profilePicture: profilePicture };
            await fetchRestEndpoint(`/api/pictures`, "POST", data);
        };
        reader.readAsDataURL(file);
    }
}
//profile picture
async function createUser() {
    try {
        const fName = elementFirstName.value;
        const lastName = elementLastName.value;
        const birthdate = elementBirthdate.value;
        const gender = elementGender.value;
        const userName = sessionStorage.getItem('user-name');
        const data = { firstName: fName, lastName: lastName, birthdate: birthdate, gender: gender };
        await fetchRestEndpoint(`/api/personUser/${userName}`, "PUT", data);
    }
    catch (e) {
    }
}
//# sourceMappingURL=CreateAndViewUser.js.map