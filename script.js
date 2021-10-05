var formEl = $('#drinkChoice');
var inputEl = $('#drinkInput');
var submitBtnEl = $('#drinkSubmit');


function submitDrink(event) {
    event.preventDefault()

    var drink = inputEl.val()

    var searchCocktailByNameAPI = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink;

    fetch(searchCocktailByNameAPI).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        }
    })

}


submitBtnEl.on("click", submitDrink);