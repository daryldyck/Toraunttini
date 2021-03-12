// ------------------ LOAD MENU FOR FEATURE ------------------ //
const menuURL = "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/ra/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json"
var featuresQty = 12;

$.ajax(
    {
        type: "GET",
        url: "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json",
        dataType: "json",
        success: loadMenu,
        error: function (request, error)
        {
            console.log("Error loading data:", error);
        }
    });

function loadMenu(data)
{
    const menuList = data;

    console.log(menuList);

    var categories = []

    // for (i = 0; i < menuList.length; i++) {
    //   if(!categories.includes(menuList[i].Category)) {
    //       categories.push(menuList[i].Category);
    //   }
    //
    //   if(menuList.some(item => item.Category === 'Indian')) {
    //     console.log("Indian food found!");
    //   }
    // }

    menuList.sort(function(a, b) {
      if(a.Category < b.Category) {
        return -1;
      }
      if(a.Category > b.Category) {
        return 1;
      }
      return 0;
    });

    console.log(menuList);

    console.log(categories);

    for (i = 0; i < menuList.length; i++) {
      if(!categories.includes(menuList[i].Category)) {
        console.log("New Category : " + menuList[i].Category);
        categories.push(menuList[i].Category);

        $("#menuDisplay").append('<div class="row category-title-container">' +
          '<h2 class="category-title">' + menuList[i].Category +'</h2>' +
          '<hr class="category-title-decor">' +
          '</div>');

        $('#menuDisplay').append('<div class="row" id="'+ menuList[i].Category.replace(/\s/g, '') + 'Items"></div>');

      }

      addFeature(menuList[i]);
    }

    //Inefficient adding
    // for (i = 0; i < 5; i++)
    // {
    //   addFeature(menuList[i]);
    // }
    //
    // for (i = 3; i < 6; i++) {
    //   addFeature(menuList[i]);
    // }
    //
    // for (i = 6; i < 9; i++) {
    //   addFeature(menuList[i]);
    // }
    //
    // for (i = 9; i < 12; i++) {
    //   addFeature(menuList[i]);
    // }
    //
    // for (i = 12; i < 15; i++) {
    //   addFeature(menuList[i]);
    // }
    //
    // for (i = 15; i < 18; i++) {
    //   addFeature(menuList[i]);
    // }
    //
    // for (i = 18; i < 21; i++) {
    //   addFeature(menuList[i]);
    // }
    //
    // for (i = 21; i < 24; i++) {
    //   addFeature(menuList[i]);
    // }
    //
    // for (i = 24; i < 27; i++) {
    //   addFeature(menuList[i]);
    // }
    //
    // for (i = 27; i < 30; i++) {
    //   addFeature(menuList[i]);
    // }

}


function addFeature(dish)
{
    const categoryItemTag = "#" + dish.Category.replace(/\s/g, '') + "Items";
    $(categoryItemTag).append('<div class="menu-item-col" id="featureCol' + dish.Id + '"></div>');
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
