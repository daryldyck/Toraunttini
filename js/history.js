console.log("history.js");

var userList = [];

// Get current user info
if ("toraunttini_userList" in localStorage) {
  userList = JSON.parse(localStorage.getItem("toraunttini_userList"));
}

if ("toraunttini_currentUser" in localStorage) {
  var currentUserName = localStorage.getItem("toraunttini_currentUser");
  login(currentUserName);
}

function login(currentUserName) {
  console.log("login: " + currentUserName);
  localStorage.setItem("toraunttini_currentUser", currentUserName);
  currentUser = userList.find(elem => elem.username === currentUserName);

  console.log(currentUser);
  getHistory(currentUser);

  document.getElementById("nav-login").innerHTML = "Account";
  document.getElementById("nav-login").href = "account.html";
}

function getHistory(user) {
  console.log("Username : " + user.username);

  for (i = 0; i < user.purchases.length; i++) {
    var cartHistory = user.purchases[i];
    console.log(cartHistory.date);

    //Add row
    $("#historyListContainer").append('<div id="historyRow' + i + '" class="row"></div>');
    $("#historyRow" + i).append('<div class="history-col-first"><h2 id="historyDate" class="cart-item-title">' + cartHistory.date + " " + cartHistory.time + '</h2></div>');
    $("#historyRow" + i).append('<div id="historyItems' + i + '" class="history-col-second"></div>');
    $("#historyRow" + i).append('<div class="history-col-third"><h2 id="historyCard" class="cart-item-title">' + cartHistory.cardNumber + '</h2></div>');
    $("#historyRow" + i).append('<div class="history-col-fourth"><h2 id="historyTotal" class="cart-item-title">$' + cartHistory.totalCost + '</h2></div>');
    $("#historyListContainer").append('<hr class="cart-divider">');

    for (j = 0; j < cartHistory.cart.length; j++) {
      $("#historyItems" + i).append('<p style = "color: grey;" >- ' + cartHistory.cart[j].itemName + " (x" + cartHistory.cart[j].quantity + ')</p>');
    }
  }

}
