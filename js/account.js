var userList = [];
var currentUser;

if ("toraunttini_userList" in localStorage)
{
    userList = JSON.parse(localStorage.getItem("toraunttini_userList"));
}

if ("toraunttini_currentUser" in localStorage)
{
    var currentUserName = localStorage.getItem("toraunttini_currentUser");
    currentUser = userList.find(elem => elem.username === currentUserName);
}
else
{
    window.location.href = "./index.html";
}

loadAccountDeatils();

function loadAccountDeatils()
{
    if (currentUser != null)
    {
        document.getElementById("username").innerHTML = currentUser.username;
        document.forms["accountInfo"]["email"].value = currentUser.email;
        document.forms["accountInfo"]["password"].value = currentUser.password;
        document.forms["accountInfo"]["confirmPassword"].value = currentUser.password;
        document.forms["accountInfo"]["firstName"].value = currentUser.firstName;
        document.forms["accountInfo"]["lastName"].value = currentUser.lastName;
        document.forms["accountInfo"]["phone"].value = currentUser.phone;
        document.forms["accountInfo"]["address"].value = currentUser.address;
    }
}

function saveAccount()
{
    console.log("saveAccount");
    var username = currentUser.username;
    var email = document.forms["accountInfo"]["email"].value;
    var password = document.forms["accountInfo"]["password"].value;
    var firstName = document.forms["accountInfo"]["firstName"].value;
    var lastName = document.forms["accountInfo"]["lastName"].value;
    var phone = document.forms["accountInfo"]["phone"].value;
    var address = document.forms["accountInfo"]["address"].value;

    currentUser.email = email;
    currentUser.password = password;
    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.phone = phone;
    currentUser.address = address;

    //userList.push(newUser);
    localStorage.setItem("toraunttini_userList", JSON.stringify(userList));
    alert("Your account has been saved.");
}

function deleteAccount()
{
    console.log("deleteAccount");
    if (confirm("Are you sure you want to delete your account?"))
    {
        userList.splice(userList.indexOf(currentUser), 1);
        localStorage.setItem("toraunttini_userList", JSON.stringify(userList));
        localStorage.removeItem("toraunttini_currentUser");
        window.location.replace("./index.html");
    }
}

var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");

function validateUserName()
{
    console.log("validateUserName");

    if (userList.some(elem => elem.username === userName.value))
    {
        userName.setCustomValidity("Username already exists.");
    }
    else
    {
        userName.setCustomValidity('');
    }
}

function validatePassword()
{
    if (password.value != confirmPassword.value)
    {
        confirmPassword.setCustomValidity("Passwords Don't Match");
    } else
    {
        confirmPassword.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

function history()
{
    window.location.href = "./history.html";
}