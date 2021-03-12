// ------------------ LOAD MENU FOR FEATURE ------------------ //
const menuURL = "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/ra/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json"
var featuresQty = 12;

$.ajax(
    {
        type: "GET",
        url: "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json",
        dataType: "json",
        success: loadFeatures,
        error: function (request, error)
        {
            console.log("Error loading data:", error);
        }
    });

function loadFeatures(data)
{
    const menuList = data;

    console.log(data);

    var randomPositions = [];

    // load 3 random menu items (except hot beverages)
    while (randomPositions.length < featuresQty)
    {
        var random = Math.floor(Math.random() * menuList.length);

        if ((menuList[random].Category != "Hot Beverage") && !randomPositions.some(elem => elem === random))
        {
            randomPositions.push(random);
        }
    }

    for (i = 0; i < 3; i++)
    {
        addFeature(menuList[randomPositions[i]]);
    }

    for (i = 3; i < 6; i++) {
      addFeature(menuList[randomPositions[i]]);
    }

    for (i = 6; i < 9; i++) {
      addFeature(menuList[randomPositions[i]]);
    }

    for (i = 9; i < 12; i++) {
      addFeature(menuList[randomPositions[i]]);
    }

    //addFeature(menuList[randomPositions[9]])
}


function addFeature(dish)
{
    $("#featuresItems").append('<div class="menu-item-col" id="featureCol' + dish.Id + '"></div>');
    $("#featureCol" + dish.Id).append('<a href="meal.html?mealId=' + dish.Id +
    '"><div class="menu-item" id="featureItem' +
    dish.Id + '"></div></a>');

    $("#featureItem" + dish.Id).append('<img src="' + dish.Image + '" class="menu-item-img">');
    $("#featureItem" + dish.Id).append('<h3 class="menu-item-title">' + dish.Title + '</h3>');
    $("#featureItem" + dish.Id).append('<p class="menu-item-price">$' + dish.Price + '</p>');
    $("#featureItem" + dish.Id).append('<p class="menu-item-desc">'+dish.Description+'</p>');
    $("#featureItem" + dish.Id).append('<hr class="menu-item-divider">');

    addRatings(dish);


    $("#featureItem" + dish.Id).append('<button class="btn" id="addButton" type="button">Add to cart</button>');

    $("#addButton").click(function(){
      alert("Added to cart");
    });
}

function addRatings(dish)
{
    $("#featureItem" + dish.Id).append('<div class="ratings" id="ratings' + dish.Id + '"></div>');

    var fullRating = 5;

    var fullStars = Math.trunc(dish.Ratings);
    var halfStars = Math.round(dish.Ratings) - fullStars;
    var emptyStars = fullRating - fullStars - halfStars;

    // full stars
    while (fullStars > 0)
    {
        $("#ratings" + dish.Id).append('<i class="fa fa-star"></i>'); // 1
        fullStars--;
    }

    // half stars
    while (halfStars > 0)
    {
        $("#ratings" + dish.Id).append('<i class="fa fa-star-half-o"></i>'); // 0.5
        halfStars--;
    }

    // empty stars
    while (emptyStars > 0)
    {
        $("#ratings" + dish.Id).append('<i class="fa fa-star-o"></i>'); // 0
        emptyStars--;
    }
}
