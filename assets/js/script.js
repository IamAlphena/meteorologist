/*
Global Variables
*/
var apikey = 'c83778c7f141b230770c6fd0f34d13b1';

var reportEl = document.querySelector('.report');
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
            // console.log(weather)

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
                    var report = oneCallData
                    report.for(current => {
                        var reportCard = createCard(current)

                        reportEl.append(reportCard)

                    });

                })

        })
};

function createCard(current) {
    console.log(current)
    var card = $(`
        <div class='card'>
        <h1>${city} (DATE) (Weather Icon)</h1>
        <p> Temperature: </p>
        <p> Feels Like: </p>
        <p> Humidity: </p>
        <p> Wind Speed: </p>
        <p> UV Index: </p>
        <div>
        `)

    return card;
}


retreiveWeather('Philadelphia');

/*
Events
*/



/*
Entry Points
*/