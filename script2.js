var currentDrinkEl = $('chosen-drink-card')
var drinkSuggestEl = $('drink-suggest-card')
var locationSuggestEl = $('location-suggest-card')

function currentDrink(data) {


        var card = $('<div>')
        card.addClass("card");
        card.css({ "flex": "1 0 300px", "margin": "10px" })
        var cardHeader = $('<div>');
        cardHeader.addClass("card-divider");
        var cardImg = $('<img>');
        var cardSection = $('<div>');
        cardSection.addClass("card-section");

        cardHeader.text(drinkName);
        cardImg.attr("src", drinkName);
        console.log('drink');
        

        cardSection.append('<h4><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></h4>');
        card.append(cardHeader);
        card.append(cardImg);
        card.append(cardSection);

        $('#chosen-drink-card').append(card);
    }

    currentDrink();

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


// function for current drink 

// function for drink rating

// function for recommended drink

// api for location info (google map)

// api fetch for location suggestion (yelp)

// function for location suggestion