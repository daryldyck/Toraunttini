// Web Development Fundamentals - MADS4007
// Toraunttini Restuarant & Martini Bar

// Group 7
// Brian Domingo - 101330689
// Daryl Dyck - 101338429

console.log("cart.js loaded");

class Receipt {
  constructor() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.phone = "";
    this.address = "";
    this.cardNumber = 0;
    this.expiryDate = 0;
    this.cvv = 0;
    this.date = "";
    this.time = "";
    this.cart = [];
    this.totalCost = 0;
  }
}

var userList = [];
var userInfo = "";

//Set up sliding for confirmation
var cartForm = document.getElementById("cartForm");
var receiptForm = document.getElementById("cartConfirmForm");
var sts = document.getElementById("confirmStatus");
var infohdr = document.getElementById("infoHeader");

function moveToConfirmForm(receiptInfo) {
  receiptForm.style.transform = "translateX(-300px)";
  cartForm.style.transform = "translateX(-300px)";
  confirmStatus.style.transform = "translateX(-300px)";
  infohdr.style.transform = "translateX(-300px)";

  $("#receiptName").text(receiptInfo.firstName + " " + receiptInfo.lastName);
  $("#receiptAddr").text(receiptInfo.address);
  $("#receiptPhone").text(receiptInfo.phone);
  $("#receiptDate").text(receiptInfo.date);
  $("#receiptTime").text(receiptInfo.time);
  $("#receiptTotal").text("$" + receiptInfo.totalCost);
  $("#receiptEmail").text("Confirmation has been sent to " + receiptInfo.email + ".");

}

//Set up years selector
const date = new Date();
const currYear = date.getFullYear();
for (i = 0; i < 10; i++) {
  var addYear = currYear + i;
  $("#yearList").append('<option value="' + addYear + '">' + addYear + '</option>')
}

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
  userInfo = userList.find(elem => elem.username === currentUserName);

  document.getElementById("nav-login").innerHTML = "Account";
  document.getElementById("nav-login").href = "account.html";

  document.forms["cartForm"]["firstName"].value = userInfo.firstName;
  document.forms["cartForm"]["lastName"].value = userInfo.lastName;
  document.forms["cartForm"]["email"].value = userInfo.email;
  document.forms["cartForm"]["phone"].value = userInfo.phone;
  document.forms["cartForm"]["address"].value = userInfo.address;
}

// Set up
var menu;
var discount = 0.0;
const tax = 0.13;
addCartQuantity();

$.ajax({
  type: "GET",
  url: "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json",
  dataType: "json",
  success: loadMenu,
  error: function(request, error) {
    console.log("Error loading data:", error);
  }
});

function loadMenu(data) {

  menu = data;

  getCartItems(menu);

  //On coupon code changed
  $("#couponCode").change(function() {
    console.log("CHANGE");
    $("#couponBtn").trigger("change");
  });

  //Set coupon btn functions
  $("#couponBtn").change(function() {
    $(this).removeClass("inactive-btn");
    $(this).addClass("btn");
    $(this).attr("disabled", false);

    $(this).click(function() {
      const code = $("#couponCode").val();

      if (code.includes("CODE") && code.length == 6) {

        var codeDiscountAmount = parseInt(code.substring(4, 6));

        var totalCart = parseInt($("#cartPriceCost").text().substring(1));

        if (totalCart >= 100 && codeDiscountAmount == 30) {
          discount = codeDiscountAmount;
          $("#couponError").text("");
        } else if (totalCart >= 80 && codeDiscountAmount == 20) {
          discount = codeDiscountAmount;
          $("#couponError").text("");
        } else if (codeDiscountAmount == 5) {
          discount = codeDiscountAmount;
          $("#couponError").text("");
        } else {
          $("#couponError").text("Invalid coupon.");
          discount = 0;
        }
      } else {
        $("#couponError").text("Invalid coupon.");
      }

      getCartItems(menu);
      $(this).removeClass("btn");
      $(this).addClass("inactive-btn");
      $(this).attr("disabled", true);
    });
  });
}

function getCartItems(menuList) {
  var total = 0;
  var cart = [];

  //reset cart
  $("#cartListContainer").empty();
  $("#cartListContainer").append('<div id="cart-headers" class="row"><div class="cart-col-first"><h2 class="cart-item-title">Item</h2></div><div class="cart-col-second"><h2 class="cart-item-title">Name</h2></div><div id="cart-label-amount" class="cart-col-third"><h2 class="cart-item-title">Amount</h2></div><div class="cart-col-fourth" id="cart-label-price"><h2 class="cart-item-title">Price</h2></div><div class="cart-col-fourth" id="spacer"></div></div><hr class="cart-divider">');

  console.log("DATA : " + menuList);
  if ("cart" in localStorage) {
    cart = JSON.parse(localStorage.getItem("cart"));
    console.log("Cart : " + cart);

    //If there is a cart enable purchase button
    $("#confirmBtn").removeClass("inactive-btn");
    $("#confirmBtn").addClass("btn");
    $("#confirmBtn").attr("disabled", false);

    for (i = 0; i < cart.length; i++) {
      $("#cartListContainer").append('<div id="cartRow' + i + '" class="row"></div>');

      //get item image
      var itemId = cart[i].itemId - 1;
      console.log("ID : " + itemId);
      console.log("Image name : " + menuList[itemId].Image);
      $("#cartRow" + i).append('<div class="cart-col-first">' + '<img class="meal-image" src="' + menuList[itemId].Image + '"></div>');
      $("#cartRow" + i).append('<div class="cart-col-second"><h2 class="cart-item-title">' + cart[i].itemName + '</h2><p id="priceOfItem' + i + '">$' + cart[i].itemPrice + '</p></div>');
      $("#cartRow" + i).append('<div class="cart-col-third"><div class="adj"><h2 class="cart-item-title qty-h1">Qty:</h2><input id="itemQty' + i + '" class="cart-qty-inp" type="text" name="item-qty-' + i + '" value="' + cart[i].quantity + '"></div></div>');
      console.log("Curr Quantity : " + $("#itemQty" + i).val());

      //Get total price
      var totalPrice = cart[i].itemPrice * cart[i].quantity;
      total += totalPrice;

      $("#cartRow" + i).append('<div class="cart-col-fourth"><h2 id="itemCumulative' + i + '" class="cart-item-title qty-h1">$' + totalPrice + '</h2></div>');
      $("#cartRow" + i).append('<div class="cart-col-fourth"><button id="itemBtn' + i + '" class="inactive-btn update-btn" type="button" name="button' + i + '">Update Cart</button></div>');
      $("#cartListContainer").append('<hr class="cart-divider">');

      $("#itemQty" + i).change(function(i) {
        var idx = parseInt(i.target.name.substring(9));
        $("#itemBtn" + idx).trigger("change");
      });

      //Set btn functions
      $("#itemBtn" + i).change(function() {
        console.log("Change Btn");
        $(this).removeClass("inactive-btn");
        $(this).addClass("btn");
        $(this).attr("disabled", false);

        $(this).click(function(i) {
          var idx = i.target.name.substring(6);
          var qty = $("#itemQty" + idx).val();
          updateCart(idx, qty);
          addCartQuantity();
          $(this).removeClass("btn");
          $(this).addClass("inactive-btn");
          $(this).attr("disabled", true);
        });
      });

      $("#cartPriceCost").text("$" + total);

      //Calculate cost/discount/tax/total
      var discountAmount = total * (discount / 100);
      discountAmount = discountAmount.toFixed(2);
      $("#cartDiscountCost").text("-$" + discountAmount);
      //TAX
      var taxAmount = total * tax;
      taxAmount = taxAmount.toFixed(2);
      $("#cartTaxCost").text("$" + taxAmount);
      var bill = (total - discountAmount) + parseFloat(taxAmount);
      $("#cartTotalCost").text("$" + bill.toFixed(2));
    }
  }
}

function updateCart(index, newQuantity) {
  console.log("Updating");

  var cartBefore = JSON.parse(localStorage.getItem("cart"));
  console.log("qty : " + newQuantity);
  console.log(cartBefore[index]);

  if (newQuantity < 0) {
    alert("Cannot update value");
    getCartItems(menu);
  } else if (newQuantity == 0) {
    var removeItem = confirm("Do you want to remove item from cart?");
    if (removeItem) {
      cartBefore.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartBefore));
    }
    getCartItems(menu);
  } else if (newQuantity > 0) {
    var updateItem = confirm("Do you want to update cart?");
    if (updateItem) {
      cartBefore[index].quantity = parseInt(newQuantity);
      localStorage.setItem("cart", JSON.stringify(cartBefore));
      $("#itemCumulative" + index).text("$" + cartBefore[index].itemPrice * newQuantity);
    }
    getCartItems(menu);
  } else {
    alert("Invalid input");
    getCartItems(menu);
  }
  //
  // total = 0;
  // for (i = 0; i < cartBefore.length; i++) {
  //   total += parseInt($("#itemCumulative" + i).text().substring(1));
  // }
  //
  // $("#cartTotalCost").text("$" + total);

}

function confirmOrder() {
  console.log("Confirmed order");

  var firstName = document.forms["cartForm"]["firstName"].value;
  var lastName = document.forms["cartForm"]["lastName"].value;
  var email = document.forms["cartForm"]["email"].value;
  var phone = document.forms["cartForm"]["phone"].value;
  var address = document.forms["cartForm"]["address"].value;
  var cardNumber = document.forms["cartForm"]["cardNumber"].value;
  //var expiryDate = document.forms["cartForm"]["expiryDate"].value;
  var expiryMonth = document.forms["cartForm"]["monthList"].value;
  var expiryYear = document.forms["cartForm"]["yearList"].value;
  var cvv = document.forms["cartForm"]["cvv"].value;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var time = today.toLocaleTimeString();
  today = mm + '/' + dd + '/' + yyyy;

  const newReceipt = new Receipt();
  newReceipt.firstName = firstName;
  newReceipt.lastName = lastName;
  newReceipt.email = email;
  newReceipt.phone = phone;
  newReceipt.address = address;

  if (cardNumber.length != 16) {
    alert("Enter valid card number.");
    return false;
  } else {
    newReceipt.cardNumber = cardNumber;
  }

  if (expiryMonth == "" || expiryYear == "") {
    alert("Enter valid expire date.");
    return false;
  } else {
    console.log(expiryMonth);
    console.log(expiryYear);
    newReceipt.expiryDate = expiryMonth + "/" + expiryYear;
  }

  if (cvv.length != 3) {
    alert("Enter valid security code.");
    return false;
  } else {
    newReceipt.cvv = cvv;
  }

  newReceipt.date = today;
  newReceipt.time = time;
  console.log("Total cost" + $("#cartTotalCost").text().substring(1));
  newReceipt.totalCost = parseFloat($("#cartTotalCost").text().substring(1));

  newReceipt.cart = JSON.parse(localStorage.getItem("cart"));

  var confirmation = confirm("Confirm order?");
  if (confirmation == true) {
    if ("purchases" in localStorage) {
      var purchases = JSON.parse(localStorage.getItem("purchases"));
      purchases.push(newReceipt);
      addToPurchases(newReceipt);
      localStorage.setItem("purchases", JSON.stringify(purchases));
    } else {
      var purchases = []
      purchases.push(newReceipt);
      addToPurchases(newReceipt);
      localStorage.setItem("purchases", JSON.stringify(purchases));
      console.log("Generate Receipt");
    }

    $("#confirmBtn").attr("disabled", true);
    $("#confirmBtn").removeClass("btn");
    $("#confirmBtn").addClass("inactive-btn");
    $("#confirmStatus").text("Confirmed Order - " + today + " " + time);

    moveToConfirmForm(newReceipt);

    //Empty cart
    localStorage.removeItem("cart");
    addCartQuantity();
  } else {
    txt = "You pressed Cancel!";
  }

  return false;
}

function addToPurchases(receipt) {
  if ("toraunttini_currentUser" in localStorage || "toraunttini_userList" in localStorage) {
    var users = JSON.parse(localStorage.getItem("toraunttini_userList"));
    var userName = localStorage.getItem("toraunttini_currentUser");
    var user = userList.find(elem => elem.username === userName);
    var idx = userList.indexOf(user);
    user.purchases.push(receipt);

    //update user info in userList
    users[idx] = user;
    //update localStorage
    localStorage.setItem("toraunttini_userList", JSON.stringify(users));
  }

}
