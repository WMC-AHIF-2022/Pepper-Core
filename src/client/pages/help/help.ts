const logoutBtn = <HTMLButtonElement>document.getElementById("logoutBtn");
logoutBtn.addEventListener("click",function() {
    sessionStorage.clear();
    window.location.href = "../CreateandViewUser/CreateandViewUser.html";
});