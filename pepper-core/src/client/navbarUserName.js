"use strict";
const navbarUserNameElement = document.getElementById("navbarUserName");
navbarUserNameElement.innerHTML = " ";
window.onload = () => {
    let username = sessionStorage.getItem('user-name');
    const element = document.getElementById("navbarUserName");
    if (username === null) {
        username = " ";
    }
    element.innerHTML = `${username}`;
};
//# sourceMappingURL=navbarUserName.js.map