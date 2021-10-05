var formEl = $('#drinkChoice');
var nameInputEl = $('#drinkInput');
var ingredientInputEl = $('#ingredientInput');
var submitBtnEl = $('#drinkSubmit');

function submitDrink(event) {
    event.preventDefault()

    var drink = nameInputEl.val();
    var ingredient = ingredientInputEl.val();

    if (drink !== "") {
        var searchCocktailByNameAPI = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink;
        fetch(searchCocktailByNameAPI).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayDrinks(data);
                })
            }
        })
        nameInputEl.val('');
    }

    if (ingredient !== "") {
        var searchCocktailByIngredientAPI = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient;
        fetch(searchCocktailByIngredientAPI).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayDrinks(data);
                })
            }
        })
        ingredientInputEl.val('');
    }

}

function displayDrinks(data) {

    var drinks = data.drinks;

    for (var i = 0; i < drinks.length; i++) {
        console.log(drinks[i]);
        var card = $('<div>');
        card.addClass("card");
        card.css({"width": "300px", "margin":"10px"})
        var cardHeader = $('<div>');
        cardHeader.addClass("card-divider");
        var cardImg = $('<img>');
        var cardSection = $('<div>');
        cardSection.addClass("card-section");

        cardHeader.text(drinks[i].strDrink);
        cardImg.attr("src", drinks[i].strDrinkThumb);
        
        cardSection.append('<h4>Rating</h4><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>');
        card.append(cardHeader);
        card.append(cardImg);
        card.append(cardSection);

        $('#drinks-card').append(card);
    }
}

submitBtnEl.on("click", submitDrink);