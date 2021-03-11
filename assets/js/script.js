/*
Global Variables
*/
var apikey = 'c83778c7f141b230770c6fd0f34d13b1';

var reportEl = document.querySelector('.report');

var city = '';
/*
Functions
*/

// function to get weather data for specified city
function retreiveWeather(city) {
    //places city and API key into API address
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    fetch(currentURL)
        .then((data) => data.json())
        .then(function (weather) {

            if (weather.cod === "404") {
                alert("City not found");
            };

            var lat = weather.coord.lat;
            var lon = weather.coord.lon;

            var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`;

            fetch(onecallURL)
                .then((data) => data.json())
                .then(function (oneCallData) {
                    console.log(oneCallData)

                    var titles = results.results
                    titles.forEach(title => {

                        var titleCard = createCard(title)

                        searchResults.append(titleCard);
                    });
                });
        });

};


function createCard(title) {
    console.log(title.date)
    var card = $(`
            <div class="card">
            <h1>${city}<h1>
            </div >
    `)

    return card;
}


retreiveWeather('Philadelphia');

/*
Events
*/

// function to collect search city
//Listen for click, then store input value (city) for recent search and run search
$("#search").on('click', function (event) {
    //prevent default (reload)
    event.preventDefault();
    //collect the search information
    var citySearch = $(this).siblings("input").val();

    console.log(citySearch);
});

/*
Entry Points
*/