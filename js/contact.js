function initMap() {
  // The location of Uluru
  const uluru = {
    lat: 43.649996,
    lng: -79.385849
  };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: uluru
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({position: uluru, map: map});
}

//Add cart quantity
addCartQuantity();

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
