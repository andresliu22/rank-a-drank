var dashboardEl = $('#dashboard');

$(document).ready(function () {
    displayDashboard();
});

function displayDashboard() {

    if (JSON.parse(localStorage.getItem("ratedDrinks")) !== null) {
        var ratedDrinks = JSON.parse(localStorage.getItem("ratedDrinks"));
    } else {
        var ratedDrinks = []
    }
    console.log(ratedDrinks)

    ratedDrinks.sort(function (a, b) {
        return b.rating - a.rating;
    });

    var li = $('<li class="collection-header">');
    var h4 = $('<h4>');
    h4.text("Dashboard");
    li.append(h4);
    $('.collection').append(li);

    for (var i = 0; i < ratedDrinks.length; i++) {
        var li = $('<li class="collection-item">');
        var div = $('<div>');
        div.text(ratedDrinks[i].name);
        var span = $('<span>');
        span.css({"margin-left": "10px"});

        for (j = 0; j < 5; j++) {
            if (j < ratedDrinks[i].rating) {
                span.append('<i class="fa fa-star checked"></i>');
            } else {
                span.append('<i class="fa fa-star"></i>');
            }
        }
        var a = $('<a class="secondary-content">');
        a.attr("href", "cocktail.html?drink=" + ratedDrinks[i].name);
        var iEl = $('<i class="material-icons">');
        iEl.text("send");
        $('.collection').append(li);
        li.append(div);
        div.append(span);
        div.append(a);
        a.append(iEl);
    }
}