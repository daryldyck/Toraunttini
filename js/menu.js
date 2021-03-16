// Web Development Fundamentals - MADS4007
// Toraunttini Restuarant & Martini Bar

// Group 7
// Brian Domingo - 101330689
// Daryl Dyck - 101338429

// ------------------ LOAD MENU FOR FEATURE ------------------
const menuURL = "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/ra/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json"
var featuresQty = 12;
var loadedMenu = [];

$.ajax({
  type: "GET",
  url: "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json",
  dataType: "json",
  success: loadMenu,
  error: function(request, error) {
    console.log("Error loading data:", error);
  }
});

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

  document.getElementById("nav-login").innerHTML = "Account";
  document.getElementById("nav-login").href = "account.html";
}

function loadMenu(data) {
  menuByCategory(data);

  //Set up search functions
  var sort = $("#sortList").val();
  $("#sortList").change(function() {
    var str = "";
    $("#sortList option:selected").each(function() {
      str += $(this).val();
    });
    sort = str;
  });

  //Set up button click
  var newData = [];
  $("#searchBtn").click(function() {

    if ($("#searchTextBox").val() != "") {
      console.log("Search for : " + $("#searchTextBox").val());
      var searchText = $("#searchTextBox").val().toLowerCase();
      for (i = 0; i < data.length; i++) {
        var pos = data[i].Title.toLowerCase().search(searchText);
        if (pos > -1) {
          console.log("Found Food");
          newData.push(data[i]);
        };
      }
    }

    console.log("New data : " + newData);
    if (newData.length != 0) {
      displayMenu(newData, sort);
    } else {
      displayMenu(data, sort);
    }
    newData = [];
  });
}

function displayMenu(data, sort) {
  if (sort == "Category") {
    menuByCategory(data);
  }
  if (sort == "Name(A-Z)") {
    console.log(sort);
    menuBySort(data, "name", "forward");
  }
  if (sort == "Name(Z-A)") {
    console.log(sort);
    menuBySort(data, "name", "backward");
  }
  if (sort == "Price(Asc.)") {
    console.log(sort);
    menuBySort(data, "price", "forward");
  }
  if (sort == "Price(Des.)") {
    console.log(sort);
    menuBySort(data, "price", "backward");
  }
  if (sort == "Rating(Asc.)") {
    menuBySort(data, "rating", "forward");
  }
  if (sort == "Rating(Des.)") {
    menuBySort(data, "rating", "backward");
  }
  if (sort == "Availability") {
    menuBySort(data, "avail", "backward");
  }
}

function menuBySort(data, criteria, direction) {
  //Empty first
  $("#menuDisplay").empty();

  const menuList = data;

  console.log(menuList);
  addCartQuantity();

  var categories = []

  if (criteria == "name") {
    if (direction == "forward") {
      menuList.sort(function(a, b) {
        if (a.Title < b.Title) {
          return -1;
        }
        if (a.Title > b.Title) {
          return 1;
        }
        return 0;
      });
    } else if (direction == "backward") {
      menuList.sort(function(a, b) {
        if (a.Title > b.Title) {
          return -1;
        }
        if (a.Title < b.Title) {
          return 1;
        }
        return 0;
      });
    }
  } else if (criteria == "price") {
    if (direction == "forward") {
      menuList.sort(function(a, b) {
        if (a.Price < b.Price) {
          return -1;
        }
        if (a.Price > b.Price) {
          return 1;
        }
        return 0;
      });
    } else if (direction == "backward") {
      menuList.sort(function(a, b) {
        if (a.Price > b.Price) {
          return -1;
        }
        if (a.Price < b.Price) {
          return 1;
        }
        return 0;
      });
    }
  } else if (criteria == "rating") {
    if (direction == "forward") {
      menuList.sort(function(a, b) {
        if (a.Ratings < b.Ratings) {
          return -1;
        }
        if (a.Ratings > b.Ratings) {
          return 1;
        }
        return 0;
      });
    } else if (direction == "backward") {
      menuList.sort(function(a, b) {
        if (a.Ratings > b.Ratings) {
          return -1;
        }
        if (a.Ratings < b.Ratings) {
          return 1;
        }
        return 0;
      });
    }
  } else if (criteria = "avail") {
    menuList.sort(function(a, b) {
      if (a.Available > b.Available) {
        return -1;
      }
      if (a.Available < b.Available) {
        return 1;
      }
      return 0;
    });
  }

  console.log(menuList);
  console.log(categories);

  for (i = 0; i < menuList.length; i++) {

    console.log("New Category : " + menuList[i].Category);
    categories.push(menuList[i].Category);

    $('#menuDisplay').append('<div id="' + menuList[i].Id + 'Items"></div>');

    //Box Styles
    //$("#menuDisplay").append('<div class="row category-title-container">' + '<h2 class="category-title">' + menuList[i].Category + '</h2>' + '<hr class="category-title-decor">' + '</div>');

    //$('#menuDisplay').append('<div class="row" id="' + menuList[i].Category.replace(/\s/g, '') + 'Items"></div>');

    addFeatureByID(menuList[i]);
  }
}

// Load items from menu
function menuByCategory(data) {
  //Empty menu
  $("#menuDisplay").empty();

  const menuList = data;

  console.log(menuList);
  addCartQuantity();

  var categories = []

  menuList.sort(function(a, b) {
    if (a.Category < b.Category) {
      return -1;
    }
    if (a.Category > b.Category) {
      return 1;
    }
    return 0;
  });

  console.log(menuList);

  console.log(categories);

  for (i = 0; i < menuList.length; i++) {
    if (!categories.includes(menuList[i].Category)) {
      console.log("New Category : " + menuList[i].Category);
      categories.push(menuList[i].Category);

      //Row Styles
      $("#menuDisplay").append('<div class="row category-title-container">' + '<h2 class="category-title">' + menuList[i].Category + '</h2>' + '<hr class="category-title-decor">' + '</div>');

      $('#menuDisplay').append('<div id="' + menuList[i].Category.replace(/\s/g, '') + 'Items"></div>');

      //Box Styles
      //$("#menuDisplay").append('<div class="row category-title-container">' + '<h2 class="category-title">' + menuList[i].Category + '</h2>' + '<hr class="category-title-decor">' + '</div>');

      //$('#menuDisplay').append('<div class="row" id="' + menuList[i].Category.replace(/\s/g, '') + 'Items"></div>');

    }

    addFeature(menuList[i]);
  }

}

function addFeatureByID(dish) {
  const categoryItemTag = "#" + dish.Id + "Items";
  //Uncomment for cards
  //$(categoryItemTag).append('<div class="menu-item-col" id="featureCol' + dish.Id + '"></div>');
  $(categoryItemTag).append('<div id="menuItemRow' + dish.Id + '" class="menu-item-row box" style="margin: 10px;"></div>');

  //Row styles------
  $("#menuItemRow" + dish.Id).append('<a href="meal.html?mealId=' + dish.Id + '"><div class="row" id="menuItem' + dish.Id + '"></div></a>');

  $("#menuItem" + dish.Id).append('<div class="cart-col-first"><img src="' + dish.Image + '" class="menu-item-img"></div>');
  $("#menuItem" + dish.Id).append('<div id="info' + dish.Id + '" class="cart-col-second"><h3 class="menu-row-item-title">' + dish.Title + '<span class="menu-item-price">' + '</span>' + '</div></h3>');
  $("#info" + dish.Id).append('<p class="menu-row-item-desc">' + dish.Description + '</p>')
  addRatings(dish);

  $("#menuItem" + dish.Id).append('<div class="cart-col-third"><p class="menu-row-item-price">$' + dish.Price + '</p></h3>');
  $("#menuItem" + dish.Id).append('<div class="cart-col-fourth"><button class="btn" id="addButton' + dish.Id + '" type="button">Add to cart</button></div>');
  // ----------------

  console.log("Dish is avail: " + dish.Available);
  if (dish.Available == 0) {
    $("#addButton" + dish.Id).removeClass("btn");
    $("#addButton" + dish.Id).addClass("inactive-btn");
  }

  //Card styles-----
  // $("#featureCol" + dish.Id).append('<a href="meal.html?mealId=' + dish.Id + '"><div class="menu-item" id="featureItem' + dish.Id + '"></div></a>');
  //
  // $("#featureItem" + dish.Id).append('<img src="' + dish.Image + '" class="menu-item-img">');
  // $("#featureItem" + dish.Id).append('<h3 class="menu-item-title">' + dish.Title + '</h3>');
  // $("#featureItem" + dish.Id).append('<p class="menu-item-price">$' + dish.Price + '</p>');
  // $("#featureItem" + dish.Id).append('<p class="menu-item-desc">' + dish.Description + '</p>');
  // $("#featureItem" + dish.Id).append('<hr class="menu-item-divider">');
  // ---------------

  $("#featureItem" + dish.Id).append('<button class="btn" id="addButton" type="button">Add to cart</button>');

  $("#addButton").click(function() {
    console.log("AddToCart");
  });
}

function addFeature(dish) {
  const categoryItemTag = "#" + dish.Category.replace(/\s/g, '') + "Items";
  //Uncomment for cards
  //$(categoryItemTag).append('<div class="menu-item-col" id="featureCol' + dish.Id + '"></div>');
  $(categoryItemTag).append('<div id="menuItemRow' + dish.Id + '" class="menu-item-row box" style="margin: 10px;"></div>');

  //Row styles------
  $("#menuItemRow" + dish.Id).append('<a href="meal.html?mealId=' + dish.Id + '"><div class="row" id="menuItem' + dish.Id + '"></div></a>');

  $("#menuItem" + dish.Id).append('<div class="cart-col-first"><img src="' + dish.Image + '" class="menu-item-img"></div>');
  $("#menuItem" + dish.Id).append('<div id="info' + dish.Id + '" class="cart-col-second"><h3 class="menu-row-item-title">' + dish.Title + '<span class="menu-item-price">' + '</span>' + '</div></h3>');
  $("#info" + dish.Id).append('<p class="menu-row-item-desc">' + dish.Description + '</p>')
  addRatings(dish);

  $("#menuItem" + dish.Id).append('<div class="cart-col-third"><p class="menu-row-item-price">$' + dish.Price + '</p></h3>');
  $("#menuItem" + dish.Id).append('<div class="cart-col-fourth"><button class="btn" id="addButton' + dish.Id + '" type="button">Add to cart</button></div>');

  console.log("Dish is avail: " + dish.Available);
  if (dish.Available == 0) {
    $("#addButton" + dish.Id).removeClass("btn");
    $("#addButton" + dish.Id).addClass("inactive-btn");
  }
  // ----------------

  //Card styles-----
  // $("#featureCol" + dish.Id).append('<a href="meal.html?mealId=' + dish.Id + '"><div class="menu-item" id="featureItem' + dish.Id + '"></div></a>');
  //
  // $("#featureItem" + dish.Id).append('<img src="' + dish.Image + '" class="menu-item-img">');
  // $("#featureItem" + dish.Id).append('<h3 class="menu-item-title">' + dish.Title + '</h3>');
  // $("#featureItem" + dish.Id).append('<p class="menu-item-price">$' + dish.Price + '</p>');
  // $("#featureItem" + dish.Id).append('<p class="menu-item-desc">' + dish.Description + '</p>');
  // $("#featureItem" + dish.Id).append('<hr class="menu-item-divider">');
  // ---------------

  $("#featureItem" + dish.Id).append('<button class="btn" id="addButton" type="button">Add to cart</button>');

  $("#addButton").click(function() {
    console.log("AddToCart");
  });
}

function addRatings(dish) {
  $("#menuItem" + dish.Id).append('<div class="ratings" id="ratings' + dish.Id + '"></div>');

  var fullRating = 5;

  var fullStars = Math.trunc(dish.Ratings);
  var halfStars = Math.round(dish.Ratings) - fullStars;
  var emptyStars = fullRating - fullStars - halfStars;

  // full stars
  while (fullStars > 0) {
    $("#ratings" + dish.Id).append('<i class="fa fa-star"></i>'); // 1
    fullStars--;
  }

  // half stars
  while (halfStars > 0) {
    $("#ratings" + dish.Id).append('<i class="fa fa-star-half-o"></i>'); // 0.5
    halfStars--;
  }

  // empty stars
  while (emptyStars > 0) {
    $("#ratings" + dish.Id).append('<i class="fa fa-star-o"></i>'); // 0
    emptyStars--;
  }
}
