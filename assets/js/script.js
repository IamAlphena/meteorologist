/*
Global Variables
*/
var apikey = 'c83778c7f141b230770c6fd0f34d13b1';

var reportEl = document.querySelector('.report');
var cardEl = document.querySelector('.card');
var tempEl = document.querySelector('.temperature')
var humidityEl = document.querySelector(".humidity")
var windEl = document.querySelector(".wind")
var uvEl = document.querySelector(".uv")
var cityEl = document.querySelector('.city')
var dayEl = document.querySelector('.day')
var savedEl = document.querySelector('.saved')

var today = moment().format('MMMM Do YYYY');

var savedCities = JSON.parse(localStorage.getItem("recent")) || [];

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

                    var report = oneCallData.current

                    console.log(report);

                    $(reportEl).show();
                   
                   
                    cityEl.append(city);
                    dayEl.textContent = today

                    var temperature = `Temperature: ${report.temp} °F`;

                    tempEl.textContent = temperature;

                    var humidity = `Humidity: ${report.humidity} %`;

                    humidityEl.textContent = humidity;

                    var wind = `Wind Speed: ${report.wind_speed} MPH`;

                    windEl.textContent = wind;


                    var uvindex = `${report.uvi}`;

                    uvEl.textContent = uvindex;

                    if (report.uvi <= 2 ){
                        uvEl.classList.add('low');
                    } else if (report.uvi > 2 && report.uvi < 6){
                        uvEl.addClass("mid")
                    } else if (report.uvi > 5 && report.uvi < 8){
                        uvEl.addClass("high")
                    } else if (report.uvi > 7 && report.uvi < 11){
                        uvEl.addClass("vhigh")
                    } else {
                        uvEl.addClass("extreme")
                    };
                });
        });
};

// function createCard(report) {
//     console.log(report)
//     var card = $(`
//             <div class="card">
//             <h1>${city}<h1>
//             <p>Temperature: ${report.temp}</p>
//             </div >
//     `)
//     console.log(card);
//     return card;
// }

function saveRecent(city){
    
    if (savedCities.includes(city)){
        return;
    }

    if (savedCities.length === 7) {
        // Remove last item
        savedCities.pop();
      }
      // Add item to front of array
      savedCities.unshift(city);
      localStorage.setItem("recent", JSON.stringify(savedCities));
      pullRecent(savedCities);

}

function pullRecent(arr) {
    savedEl.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
      var item = arr[i];
      var li = document.createElement("li");
      li.innerText = item;
      savedEl.append(li);
    }
  }

  pullRecent(savedCities)
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

    retreiveWeather(citySearch);
    saveRecent(citySearch)

});

/*
Entry Points
*/