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
    window.location.replace("./index.html");
}


// code for locking body scroll
function lockScroll()
{
    if ($('body').hasClass('lock-scroll'))
    {
        $('body').removeClass('lock-scroll');
    }
    else
    {
        $('body').addClass('lock-scroll');
    }
}
