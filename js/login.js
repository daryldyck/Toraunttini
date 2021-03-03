// < !-- ----------- LOGIN TOGGLE FORM------------ -->

var loginForm = document.getElementById("loginForm");
var regForm = document.getElementById("regForm");
var indicator = document.getElementById("login-indicator");

function moveToRegisterForm()
{
    regForm.style.transform = "translateX(350px)";
    loginForm.style.transform = "translateX(350px)";
    indicator.style.transform = "translateX(0px)";
}

function moveToLoginForm()
{
    regForm.style.transform = "translateX(0px)";
    loginForm.style.transform = "translateX(0px)";
    indicator.style.transform = "translateX(100px)";
}

function user(username, email, password, firstName, lastName, phone, address)
{
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
}

var userName = document.getElementById("userName");
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

userName.onchange = validateUserName;
password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

function register()
{
    var username = document.forms["registerInfo"]["username"].value;
    var email = document.forms["registerInfo"]["email"].value;
    var password = document.forms["registerInfo"]["password"].value;
    var firstName = document.forms["registerInfo"]["firstName"].value;
    var lastName = document.forms["registerInfo"]["lastName"].value;
    var phone = document.forms["registerInfo"]["phone"].value;
    var address = document.forms["registerInfo"]["address"].value;

    const newUser = new user(username, email, password, firstName, lastName, phone, address);
    userList.push(newUser);
    localStorage.setItem("toraunttini_userList", JSON.stringify(userList));
    localStorage.setItem("toraunttini_currentUser", username);
}

var loginUsername = document.getElementById("loginUsername");
var loginPassword = document.getElementById("loginPassword");

function validateUserExists()
{
    console.log("validateUserExists");

    if (!userList.some(elem => elem.username === loginUsername.value))
    {
        loginUsername.setCustomValidity("Username does not exist.");
    }
    else
    {
        loginUsername.setCustomValidity('');
    }
}

function authorize()
{
    console.log("authorize");
    var username = document.forms["loginInfo"]["loginUsername"].value;
    var password = document.forms["loginInfo"]["loginPassword"].value;

    var loginUser = userList.find(elem => elem.username === username);

    if (loginUser != null && password == loginUser.password)
    {
        loginPassword.setCustomValidity('');
    }
    else
    {
        loginPassword.setCustomValidity("Incorrect Password.");
    }
}

loginUsername.onchange = validateUserExists;
loginPassword.onchange = authorize;