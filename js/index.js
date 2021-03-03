// ------------------ SLIDE SHOW ------------------ //

var currentSlide = 0;
var slideShowTime = 5000
var slideShowId;
var radioList = document.getElementsByClassName("radio");
var manualButtons = document.getElementsByClassName("manual-btn");

setActiveRadio();
startSlideShow();

function startSlideShow()
{
    console.log("startSlideShow");

    slideShowId = setInterval(function ()
    {
        currentSlide++;
        if (currentSlide == radioList.length)
        {
            currentSlide = 0;
        }

        setActiveRadio();

    }, slideShowTime);
}

function stopSlideShop()
{
    clearInterval(slideShowId);
}

function resetSlideShow(position)
{
    currentSlide = position
    setActiveRadio();
    stopSlideShop();
    startSlideShow();
}

function setActiveRadio()
{
    for (i = 0; i < manualButtons.length; i++)
    {
        if (currentSlide == i)
        {
            manualButtons[i].classList.add("active");
            radioList[currentSlide].checked = true;
        }
        else 
        {
            manualButtons[i].classList.remove("active");
        }
    }
}

// ------------------ LOAD MENU FOR FEATURE ------------------ //
const menuURL = "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/8fdfa7fa395452c7b8ca78c9c6ae7010955dc9ac/menu.json"
var featuresQty = 3;

$.ajax(
    {
        type: "GET",
        url: "menu.json",
        dataType: "json",
        success: loadFeatures,
        error: function (request, error)
        {
            console.log("Error loading data:", error);
            // alert("Unable to fetch data ", error);
        }
    });

function loadFeatures(data)
{
    const menuList = data;

    var randomPositions = [];

    while (randomPositions.length < featuresQty)
    {
        var random = Math.floor(Math.random() * menuList.length);

        if (!randomPositions.some(elem => elem === random))
        {
            randomPositions.push(random);
        }
    }

    for (i = 0; i < randomPositions.length; i++)
    {
        addFeature(menuList[randomPositions[i]]);
    }
}


function addFeature(dish)
{
    $("#featuresItems").append('<div class="feature-col" id="featureCol' + dish.Id + '"></div>');
    $("#featureCol" + dish.Id).append('<div class="feature-item" id="featureItem' + dish.Id + '"></div>');

    $("#featureItem" + dish.Id).append('<img src="' + dish.Image + '" class="feature-img">');
    $("#featureItem" + dish.Id).append('<h3 class="feature-title">' + dish.Title + '</h3>');
    $("#featureItem" + dish.Id).append('<hr class="feature-divider">');

    addRatings(dish);

    $("#featureItem" + dish.Id).append('<p class="feature-price">$' + dish.Price + '</p>');
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
