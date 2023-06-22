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
const imgItemOne = document.getElementById("imgItemOne") as HTMLImageElement;
const imgItemTwo = document.getElementById("imgItemTwo") as HTMLImageElement;
const imgItemThree = document.getElementById("imgItemThree") as HTMLImageElement;
const imgItemFour = document.getElementById("imgItemFour") as HTMLImageElement;
const profilePictureImage = document.getElementById("profilePicture") as HTMLImageElement;
logoutBtn.addEventListener("click",function() {
    sessionStorage.clear();
    window.location.href = "index.html";
});
interface Picture {
    pictureID: number;
    url: string;
    username: string;
    profilePicture: string;
}
sessionStorage.setItem("memPictures","false");
/*if(sessionStorage.getItem("user-name") !== null){
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
}*/
async function loadPictures() {
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
}
btnCreate.addEventListener("click", async function (){


    if(elementFirstName.value !== "" && elementLastName.value !== "" && elementBirthdate.value !== "" && elementGender.value !== "" && fileInputMore.files.length === 4 && fileInput.files.length === 1){
        alert("Your Person has been created");
        await createUser();
        await fetchPicture(fileInputMore.files[0],"false");
        await fetchPicture(fileInputMore.files[1],"false");
        await fetchPicture(fileInputMore.files[2],"false");
        await fetchPicture(fileInputMore.files[3],"false");
        await fetchPicture(fileInput.files[0],"true");
        sessionStorage.setItem("memPictures","true");
    }
    else{
        alert("You must fill out all fields");
    }
});
if(sessionStorage.getItem("memPictures") === "true"){
    await loadPictures();
}

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

        const data = {firstName: fName, lastName: lastName,birthdate: birthdate, gender: gender};
        await fetchRestEndpoint(`/api/personUser/${userName}`, "PUT", data);

        loginStatus.innerHTML = "erfolgreich erstellt";
    } catch (e) {
        loginError.innerHTML = `Create failed: ${e}`;
    }
}