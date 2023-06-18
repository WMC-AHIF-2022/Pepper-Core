import {fetchRestEndpoint} from "./utils/client-server.js";
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



        ////////////////////////////////////////
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;

        alert("1");
        const file = fileInput.files[0]; // Das ausgewählte Bild
        alert("2");
        if (file) {
            alert("3");

            // Datei als URL-Objekt erstellen
            const fileReader = new FileReader();

            alert("4");

            fileReader.onload = async () => {
                alert("5");

                const imageUrl = fileReader.result as string;
                alert("6");


                // Bild als Base64-Zeichenkette erhalten
                const base64ImageData = imageUrl.split(',')[1];
                alert("7");

                fetch('/api/pictures/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: base64ImageData })
                }).then(response => {
                    if (response.ok) {
                        alert('Bild erfolgreich hochgeladen und gespeichert.');
                    } else {
                        alert('Fehler beim Hochladen und Speichern des Bildes.');
                    }
                }).catch(error => {
                    console.log('Fehler beim Senden der Anfrage:', error);
                });
            };
            alert("9");

            fileReader.readAsDataURL(file);
            alert("10");

        }
        ////////////////////////////////////////////////

        const data = {firstName: fName, lastName: lastName,birthdate: birthdate, gender: gender};
        await fetchRestEndpoint(`http://localhost:3000/api/personUser/${userName}`, "PUT", data);

        loginStatus.innerHTML = "erfolgreich erstellt";
        //window.location.href = "/pages/viewUser/viewUser.html";
    } catch (e) {
        loginError.innerHTML = `Create failed: ${e}`;
    }
}


//https://runebook.dev/de/docs/html/element/input/file
//document.getElementById("profilePicture").addEventListener('change', dateiauswahl, false)

