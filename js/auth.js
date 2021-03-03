var userList = [];
var currentUser;

if ("toraunttini_userList" in localStorage)
{
    userList = JSON.parse(localStorage.getItem("toraunttini_userList"));
}

if ("toraunttini_currentUser" in localStorage)
{
    var currentUserName = localStorage.getItem("toraunttini_currentUser");
    login(currentUserName);
}

function login(currentUserName)
{
    console.log("login: " + currentUserName);
    localStorage.setItem("toraunttini_currentUser", currentUserName);
    currentUser = userList.find(elem => elem.username === currentUserName);

    document.getElementById("nav-login").innerHTML = "Account";
    document.getElementById("nav-login").href = "account.html";
}

function logout()
{
    console.log("logout");
    localStorage.removeItem("toraunttini_currentUser");
    document.getElementById("nav-login").innerHTML = "Login";
    document.getElementById("nav-login").href = "login.html";
}