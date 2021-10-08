var currentDrinkEl = $('#chosen-drink-card');
var submitRatingBtn = $('#submitRating');
var suggestedDrinkEl = $('#suggested-drink-card');
var yelpApiKey = "XGPJzdsArujs0a5GBLbAgRXVjA0Ht8qthqX-MLFDM0pckAYtxRSmRcJCodfZ9Yxk9WsRQt7Isno_i1ZOlRrlEDY7laqvOLzkb23nclEnir1HfZkyAPxi8jOkwAZfYXYx";
var nearbyLocationBtn = $('#nearbyLocationBtn');
var drinkInfoEl = $('#drinkInfo')
var ingredient;
var currentLat;
var currentLon;

$(document).ready(function () {
    getChosenDrink();
    getLocation();
    $('.collapsible').collapsible();
});

function getChosenDrink() {
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    var drink = hashes[0].split('=');
    var drinkName = drink[1].replace('%20', ' ');

    if (drinkName !== "") {
        var searchCocktailByNameAPI = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
        fetch(searchCocktailByNameAPI).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayChosenDrink(data);
                    displayDrinkInfo(data);
                })
            }
        })
    }
}

function displayChosenDrink(data) {
    var drinks = data.drinks;
    for (var i = 0; i < drinks.length; i++) {
        console.log(drinks[i]);
        var card = $('<div>')
        card.addClass("card");
        card.css({ "flex": "1 0 300px", "margin": "10px" })
        var cardHeader = $('<div>');
        cardHeader.addClass("card-divider");
        var cardImg = $('<img>');
        var cardSection = $('<div>');
        cardSection.addClass("card-section");
        ingredient = drinks[i].strIngredient1
        cardHeader.text(drinks[i].strDrink);
        cardImg.attr("src", drinks[i].strDrinkThumb);
        for (var i = 0; i < 5; i++) {
            var starBtn = $('<button>')
            starBtn.addClass('starBtn');
            starBtn.append("<i class='fa fa-star star-" + (i + 1) + "'></i>");
            cardSection.append(starBtn);

            starBtn.on("click", rateDrink);
        }

        card.append(cardHeader);
        card.append(cardImg);
        card.append(cardSection);

        currentDrinkEl.append(card);
    }
}

function displayDrinkInfo(data) {
    var drink = data.drinks[0];
    
    console.log(drink);
    var p = $('<p>');
    p.text(drink.strInstructions);



    var ul = $('<ul class="ingredientsList">');
    var count = 1;
    var numberOfIngredient = "strIngredient" + count;

    while(drink[numberOfIngredient] != null) {
        var li = $('<li>')
        li.css({"list-style-type": "disclosure-closed"});
        li.text(drink[numberOfIngredient]);
        ul.append(li);
        count++;
        numberOfIngredient = "strIngredient" + count;
    }

    drinkInfoEl.append($('<h4>Instructions</h4>'));
    drinkInfoEl.append(p);
    drinkInfoEl.append($('<h4>Ingredients</h4>'))
    drinkInfoEl.append(ul);

    
}

function rateDrink(event) {
    var starRating = event.target.className.slice(event.target.className.indexOf('star-') + 5)[0];
    for (var i = 0; i < 5; i++) {
        if (i < starRating) {
            $('.star-' + (i + 1)).addClass('checked');
        } else {
            $('.star-' + (i + 1)).removeClass('checked');
        }
    }
}

function submitRating() {
    var starsChecked = $('.checked');
    if (starsChecked.length > 0) {
        if (JSON.parse(localStorage.getItem("ratedDrinks")) !== null) {
            var ratedDrinks = JSON.parse(localStorage.getItem("ratedDrinks"));
        } else {
            var ratedDrinks = []
        }

        var drinkObj = {
            name: $(".card-divider").text(),
            rating: starsChecked.length
        }

        for (var i = 0; i < ratedDrinks.length; i++) {
            if (ratedDrinks[i].name === drinkObj.name) {
                ratedDrinks[i].rating = drinkObj.rating;
                localStorage.setItem("ratedDrinks", JSON.stringify(ratedDrinks));
                suggestDrink(starsChecked.length);
                return;
            }
        }
        ratedDrinks.push(drinkObj);
        localStorage.setItem("ratedDrinks", JSON.stringify(ratedDrinks));
        suggestDrink(starsChecked.length);
    }

}

function suggestDrink(rating) {
    if (rating < 3) {
        switch (ingredient) {
            case "vodka", "rum", "gin", "tequila":
                ingredient = "whiskey"
                break;

            case "whiskey", "scotch", "brandy", "triple sec":
                ingredient = "rum"
                break;

            default:
                ingredient = "vodka"
                break;

        }
    }

    var searchCocktailByIngredientAPI = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient;
    fetch(searchCocktailByIngredientAPI).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                var randomDrink = data.drinks[Math.floor(Math.random() * data.drinks.length)];
                displaySuggestDrink(randomDrink);
            })
        }
    })
}

function displaySuggestDrink(drink) {
    suggestedDrinkEl.empty();
    var card = $('<a>')
    card.addClass("card");
    card.attr("href", "cocktail.html?drink=" + drink.strDrink);
    card.css({ "flex": "1 0 300px", "margin": "10px" })
    var cardHeader = $('<div>');
    cardHeader.addClass("card-divider");
    var cardImg = $('<img>');
    cardHeader.text(drink.strDrink);
    cardImg.attr("src", drink.strDrinkThumb);

    card.append(cardHeader);
    card.append(cardImg);
    suggestedDrinkEl.append(card);
}

// Get Current Location courtesy of w3shools
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
  
function showPosition(position) {
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;
    console.log("Lat:" + currentLat + ", Lon:" + currentLon);
}


function getNearbySuggestions() {
    var url =
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=cocktail&latitude=37.786882&longitude=-122.399972";
    
    // https://cors-anywhere.herokuapp.com/corsdemo
    
      fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: "no-cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + yelpApiKey,
      },
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displaySuggestedLocations(data.businesses);
        });
      }
    });
  }

function fetchLocationSuggestions() {
    var apiUrl = "http://www.mapquestapi.com/geocoding/v1/batch?key=u1CqLkL4TtGYm7gJkTYRUEHkXQY1Mkyj&location=30.333472,-81.470448&includeRoadMetadata=true&includeNearestIntersection=true&thumbMaps=true"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        }
    })
}

function displaySuggestedLocations(locations) {
    var li = $('<li class="collection-header">');
    var h4 = $('<h4>');
    h4.text("Suggested Locations");
    li.append(h4);
    
    $('.collection').append(li);

    for (var i = 0; i < 5; i++) {
        var li = $('<li class="collection-item">');
        var div = $('<div>');
        div.text(locations[i].name + " - " + locations[i].location.display_address[0] + ", " + locations[i].location.display_address[1]);
        
        var a = $('<a class="secondary-content">');
        var mapUrl = "https://maps.google.com/maps?q=" + locations[i].coordinates.latitude + "," + locations[i].coordinates.longitude + "&hl=es;z=14&amp;output=embed";
        a.attr("href", mapUrl);
        a.attr("target", "_blank");
        var iEl = $('<i class="material-icons">');
        iEl.text("send");

        $('.collection').append(li);
        li.append(div);
        div.append(a);
        a.append(iEl);
    }
}

submitRatingBtn.on("click", submitRating);
nearbyLocationBtn.on("click", getNearbySuggestions);



// api for location info (google map)

// api fetch for location suggestion (yelp)

// function for location suggestion