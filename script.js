var formEl = $('#drinkChoice');
var nameInputEl = $('#drinkInput');
var ingredientInputEl = $('#ingredientInput');
var submitBtnEl = $('#drinkSubmit');
var switchBtnEl = $('#switchBtn');

function submitDrink(event) {
    event.preventDefault()

    $('#drinks-card').empty();
    var drink = nameInputEl.val();
    var ingredient = ingredientInputEl.val();

    if (drink !== "") {
        var searchCocktailByNameAPI = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink;
        fetch(searchCocktailByNameAPI).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayDrinks(data);
                })
            }
        })
        nameInputEl.val('');
        ingredientInputEl.val('');
    }

    if (ingredient !== "") {
        var searchCocktailByIngredientAPI = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient;
        fetch(searchCocktailByIngredientAPI).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayDrinks(data);
                })
            }
        })
        nameInputEl.val('');
        ingredientInputEl.val('');
    }

}

function displayDrinks(data) {

    var drinks = data.drinks;

    for (var i = 0; i < drinks.length; i++) {
        console.log(drinks[i]);
        var card = $('<a>')
        card.addClass("card");
        card.css({ "flex": "1 0 300px", "margin": "10px" })
        var cardHeader = $('<div>');
        cardHeader.addClass("card-divider");
        var cardImg = $('<img>');
        var cardSection = $('<div>');
        cardSection.addClass("card-section");

        cardHeader.text(drinks[i].strDrink);
        cardImg.attr("src", drinks[i].strDrinkThumb);

        cardSection.append('<h4><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></h4>');
        card.append(cardHeader);
        card.append(cardImg);
        card.append(cardSection);

        $('#drinks-card').append(card);
    }
}

function switchInput(event) {
    event.preventDefault();
    if (ingredientInputEl.css("display") === "none") {
        nameInputEl.css({ "display": "none" });
        ingredientInputEl.css({ "display": "block" });
        switchBtnEl.text("Search by Drink");
        ingredientInputEl.val('');

    } else if (nameInputEl.css("display") === "none") {
        nameInputEl.css({ "display": "block" });
        ingredientInputEl.css({ "display": "none" });
        switchBtnEl.text("Search by Ingredient");
        nameInputEl.val('');
    }
}

function drinkRating(event) {
    console.log(event.target)
}

$("#drinks-card").on("click", ".card", drinkRating);

switchBtnEl.on("click", switchInput);
submitBtnEl.on("click", submitDrink);
