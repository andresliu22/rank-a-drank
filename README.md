# drink-rating-app

Project 1 :

What: For this project we will be using HTML, CSS, Javascript, existing third-party API’s and server side API’s to create an app with a dynamic user interface. This app will allow users to try a drink at a specific location, rate that drink, provide their location, and will provide nearby venue and similar drink suggestions.

How:

Wireframe: This will show the structure of our application page before we start writing code.

The user will need to turn on location sharing and will share their location. Use an alert and get back lat and lon data based on their IP address. If they decline they will have to enter manually and will need location auto populate city. 

The user will have an input form in which the enter their drink name or drink ingrediant. A list will auto-populate, and the user will select their current drink.

This input will populate a list of drinks and the user will select their current drink. 

The user will give a drink rating. Rating stored locally has a date, and expires in 24 hours. 

Low rating will not pupulate same ingrediant of current drink. 

*Two Columns will populate*

First column: A list of nearby venues (bars, liquer stores, restuaraunts) will populate. 

Second column: One suggest (featured) drink suggestion based on their rating. 

Persistant Data: Local Storage

## App Overview

This app will allow a user to input or “check-in” a mixed-drink as they enjoy it.  They will then be able to rate that drink (out of 5 stars).  This data will be saved in their dashboard and sorted in descending order: from favorite drinks (5 stars) shown first to less-enjoyable (1 star) drinks.  After submitting their rating, they will also be presented with personalized recommendations.  They will receive a recommendation for a different drink they may enjoy, based on the rating they provided. They will also see a list of 3 nearby venues so they can “keep the party going” and try a new selection.

## User Stories

<img src="DrinkAppUserStories.JPG" alt="Screenshot of User Stories">

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - to create and modify the code on my local device
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - to create elements
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - to style the html elements
* [Javascript](https://www.javascript.com/) - to create actions on the page
* [jQuery](https://jquery.com/) - to add actions to the page
* [Foundation CSS](https://get.foundation/sites/docs-v5/css.html) - style the page
* [Parsley](http://parsleyjs.org/doc/index.html) - to set requirements for the form input
* []() 
* [Git](https://git-scm.com/) - to track changes and push commits
* [GitHub](github.com) - to host the repository and deploy with GitHub pages
* [Cocktail DB API]( put link here) - to provide the drink data for user input and suggestions
* [Google Maps Api] ( put link here ) - to locate the user's current location and provide latitude/longitude to Yelp Places API
* [Yelp Places API] ( put link here ) - to locate nearby venues (bars, restaurants, and liquor stores) based on the user's location


## Deployed Link

* [https://amackenzie26.github.io/drink-rating-app/](#)

## Authors

* Andres Liu []
* Alec Mackenzie []
* Kiri Smith [https://www.linkedin.com/in/kiri-lynne-smith/]


Made with Luvv


