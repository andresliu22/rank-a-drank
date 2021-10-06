var currentDrinkEl = $('#chosen-drink-card')
var drinkSuggestEl = $('#drink-suggest-card')
var locationSuggestEl = $('#location-suggest-card')

$(document).ready(function () {
    chosenDrink();
});

function currentDrink(data) {
    var drinks = data.drinks;
    for (var i = 0; i < drinks.length; i++) {
        console.log(drinks[i]);
        var card = $('<div>')
        card.addClass("card");
        card.css({"width": '500px', "margin": "10px" })
        var cardHeader = $('<div>');
        cardHeader.addClass("card-divider");
        var cardImg = $('<img>');
        var cardSection = $('<div>');
        cardSection.addClass("card-section");

        cardHeader.text(drinks[i].strDrink);
        cardImg.attr("src", drinks[i].strDrinkThumb);
        
        for (var i=0 ; i<5 ; i++) {
            var starBtn = $('<button>')
            starBtn.addClass('starBtn');
            starBtn.append('<i class="fa fa-star checked"></i>')
            cardSection.append(starBtn);

            starBtn.on("click", rateDrink);
        }
        
        card.append(cardHeader);
        card.append(cardImg);
        card.append(cardSection);

        currentDrinkEl.append(card);
    }
}

function chosenDrink() {
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    var drink = hashes[0].split('=');
    var drinkName = drink[1].replace('%20', ' ');

    if (drinkName !== "") {
        var searchCocktailByNameAPI = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
        fetch(searchCocktailByNameAPI).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    currentDrink(data);
                })
            }
        })
    }
}

function rateDrink(event) {
    console.log(event.target);
    console.log("I NEEEEEEEED SOME SLEEEEEEEEEEP")
}



//$('.startBtn').on("click", rateDrink);

// function for current drink 

// function for drink rating

// function for recommended drink

// api for location info (google map)

// api fetch for location suggestion (yelp)

// function for location suggestion