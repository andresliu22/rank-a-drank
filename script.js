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
                })
            }
        })
    }

    if (ingredient !== "") {
        var searchCocktailByIngredientAPI = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient;
        fetch(searchCocktailByIngredientAPI).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                })
            }
        })
    }

    

}


submitBtnEl.on("click", submitDrink);