var mealId;

$(document).on("pagebeforeshow", "#mainContainer", function() {
  const url = location.search;
  console.log(url);

  mealId = url.substring(url.indexOf("=") + 1);
  console.log("Meal ID: " + mealId);

  const menuURL = "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/ra/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json"

  $.ajax({
    type: "GET",
    url: "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json",
    dataType: "json",
    success: loadMeal,
    error: function (request, error) {
      console.log("Error loading meal data", error);
    }
  });

});

function loadMeal(data) {
  const menuData = data;
  const meal = menuData[mealId-1]
  console.log("Menu Data : " + meal.Title);

  $("#mealName").append(meal.Title)

  $("#mealInfoContainer").append('<div id="mealDisplay" class="row"><img class="meal-image" src="' + meal.Image + '"></div>');
  $('#mealDisplay').append('<div id="mealDescription" class="meal-item-col"><p class="meal-item-price">$' + meal.Price + '</p></div>');
  addRatings(meal);
  $('#mealDescription').append('<p class="meal-item-desc">' + meal.Description + '</p>');
  $('#mealDescription').append('<input type="text" name="quantity" placeholder="0"><br>');


  $('#mealDescription').append('<button class="btn" id="addButton" type="button" class="btn btn-primary">Add to cart</button>');

  // $('#addButton').click(function(){
  //   console.log("Adding to favourites");
  //   myFavs.addCountryToFavourites(country);
  //   console.log(myFavs.countryList);
  // });

}

function addRatings(dish)
{
    $("#mealDescription").append('<div class="ratings" id="ratings' + dish.Id + '"></div>');

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
