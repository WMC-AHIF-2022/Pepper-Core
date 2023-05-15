const navbarUserNameElement = document.getElementById("navbarUserName");
navbarUserNameElement.innerHTML = " ";
window.onload = () => {
    const username = sessionStorage.getItem('user-name');
    const element = document.getElementById("navbarUserName");
    element.innerHTML = `${username}`;
}