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
    this.cart = [];
  }
}

var menu;
var total = 0;

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

  console.log("DATA : " + menu);

  getCartItems();
}

function getCartItems() {
  var cart = [];
  if ("cart" in localStorage) {
    cart = JSON.parse(localStorage.getItem("cart"));
    console.log("Cart : " + cart);

    for (i = 0; i < cart.length; i++) {
      $("#cartListContainer").append('<div id="cartRow' + i + '" class="row"></div>');

      //get item image
      var itemId = cart[i].itemId;
      $("#cartRow" + i).append('<div class="cart-col-first">' + '<div class="cart-img" style="background-image: url(' + menu[itemId].Image + ');"></div>');
      $("#cartRow" + i).append('<div class="cart-col-second"><h2 class="cart-item-title">' + cart[i].itemName + '</h2><p id="priceOfItem' + i + '">$' + cart[i].itemPrice + '</p></div>');
      $("#cartRow" + i).append('<div class="cart-col-third"><div class="adj"><h2 class="cart-item-title qty-h1">Qty:</h2><input id="itemQty' + i + '" class="cart-qty-inp" type="text" name="item-qty-' + i + '" value="' + cart[i].quantity + '"></div></div>');
      console.log("Curr Quantity : " + $("#itemQty" + i).val());

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
          $(this).removeClass("btn");
          $(this).addClass("inactive-btn");
          $(this).attr("disabled", true);
        });

      });

      $("#cartTotalCost").text("$" + total);

    }
  }
}

function updateCart(index, newQuantity) {

  var cartBefore = JSON.parse(localStorage.getItem("cart"));
  console.log("qty : " + newQuantity);
  console.log(cartBefore[index]);

  cartBefore[index].quantity = parseInt(newQuantity);
  localStorage.setItem("cart", JSON.stringify(cartBefore));

  $("#itemCumulative" + index).text("$" + cartBefore[index].itemPrice * newQuantity);

  total = 0;
  for (i = 0; i < cartBefore.length; i++) {
    total += parseInt($("#itemCumulative" + i).text().substring(1));
  }

  $("#cartTotalCost").text("$" + total);

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

function confirmOrder() {
  console.log("Confirmed order");

  var firstName = document.forms["cartForm"]["firstName"].value;
  var lastName = document.forms["cartForm"]["lastName"].value;
  var email = document.forms["cartForm"]["email"].value;
  var phone = document.forms["cartForm"]["phone"].value;
  var address = document.forms["cartForm"]["address"].value;
  var cardNumber = document.forms["cartForm"]["cardNumber"].value;
  var expiryDate = document.forms["cartForm"]["expiryDate"].value;
  var cvv = document.forms["cartForm"]["cvv"].value;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  const newReceipt = new Receipt();
  newReceipt.firstName = firstName;
  newReceipt.lastName = lastName;
  newReceipt.email = email;
  newReceipt.phone = phone;
  newReceipt.address = address;
  newReceipt.cardNumber = cardNumber;
  newReceipt.expiryDate = expiryDate;
  newReceipt.cvv = cvv;
  newReceipt.date = today;

  newReceipt.cart = JSON.parse(localStorage.getItem("cart"));

  var confirmation = confirm("Confirm order?");
  if (confirmation == true) {
    if ("purchases" in localStorage) {
      var purchases = JSON.parse(localStorage.getItem("purchases"));
      purchases.push(newReceipt);
      localStorage.setItem("purchases", JSON.stringify(purchases));
    } else {
      var purchases = []
      purchases.push(newReceipt);
      localStorage.setItem("purchases", JSON.stringify(purchases));
      console.log("Generate Receipt");
    }

    $("#confirmBtn").attr("disabled", true);
    $("#confirmBtn").removeClass("btn");
    $("#confirmBtn").addClass("inactive-btn");
    $("#confirmStatus").text("Confirmed Order - " + today);

    //Empty cart
    localStorage.removeItem("cart");
    addCartQuantity();
  } else {
    txt = "You pressed Cancel!";
  }

  return false;
}
