var currentDrinkEl = $('#chosen-drink-card');
var submitRatingBtn = $('#submitRating');
var ingredient

$(document).ready(function () {
    getChosenDrink();
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
        card.css({ "width": '500px', "margin": "10px" })
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

function rateDrink(event) {
    // console.log(event.target.className);
    var starRating = event.target.className.slice(event.target.className.indexOf('star-') + 5)[0];
    // console.log(starRating)
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
    var card = $('<a>')
    card.addClass("card");
    card.attr("href", "index2.html?drink=" + drink.strDrink);
    card.css({ "flex": "1 0 300px", "margin": "10px" })
    var cardHeader = $('<div>');
    cardHeader.addClass("card-divider");
    var cardImg = $('<img>');
    cardHeader.text(drink.strDrink);
    cardImg.attr("src", drink.strDrinkThumb);
    card.append(cardHeader);
    card.append(cardImg);


    $('#suggested-drink-card').append(card);
}
submitRatingBtn.on("click", submitRating);



// function for recommended drink

// api for location info (google map)

// api fetch for location suggestion (yelp)

// function for location suggestion