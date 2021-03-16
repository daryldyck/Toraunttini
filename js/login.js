// < !-- ----------- LOGIN TOGGLE FORM ------------ -->

var loginForm = document.getElementById("loginForm");
var regForm = document.getElementById("regForm");
var indicator = document.getElementById("login-indicator");

function moveToRegisterForm() {
  regForm.style.transform = "translateX(300px)";
  loginForm.style.transform = "translateX(300px)";
  indicator.style.transform = "translateX(0px)";
}

function moveToLoginForm() {
  regForm.style.transform = "translateX(0px)";
  loginForm.style.transform = "translateX(0px)";
  indicator.style.transform = "translateX(100px)";
}

// < !-- ----------- REGISTER/LOGIN ------------ -->

var userName = document.getElementById("userName");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");
addCartQuantity();

function validateUserName() {
  console.log("validateUserName");

  if (userList.some(elem => elem.username === userName.value.toLowerCase())) {
    userName.setCustomValidity("Username already exists.");
  } else {
    userName.setCustomValidity('');
  }
}

function validatePassword() {
  if (password.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    confirmPassword.setCustomValidity('');
  }
}

userName.onchange = validateUserName;
password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

function register() {
  var username = document.forms["registerInfo"]["username"].value.toLowerCase();
  var email = document.forms["registerInfo"]["email"].value.toLowerCase();
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

function validateUserExists() {
  console.log("validateUserExists");

  if (!userList.some(elem => elem.username === loginUsername.value.toLowerCase())) {
    loginUsername.setCustomValidity("Username does not exist.");
  } else {
    loginUsername.setCustomValidity('');
  }
}

function authorize() {
  console.log("authorize");
  var username = document.forms["loginInfo"]["loginUsername"].value.toLowerCase();
  var password = document.forms["loginInfo"]["loginPassword"].value;

  var loginUser = userList.find(elem => elem.username === username);

  if (loginUser != null && password == loginUser.password) {
    loginPassword.setCustomValidity('');
  } else {
    loginPassword.setCustomValidity("Incorrect Password.");
  }
}

function addCartQuantity() {
  var qty = 0;
  if ("cart" in localStorage) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    for (var i = 0; i < cart.length; i++) {
      console.log("adding " + cart[i].quantity);
      qty += cart[i].quantity;
    }
  }
  console.log(qty);
  if (qty > 0) {
    $("#navCartQty").text(qty);
  } else if (qty <= 0) {
    $("#navCartQty").text("");
  }
}

loginUsername.onchange = validateUserExists;
loginPassword.onchange = authorize;
