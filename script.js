const apiKey = "8b31efa1bb6a5d665ece492bc139e4fc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    
    console.log(data);

    document.querySelector(".city-name-div").innerHTML = data.name + " , " + data.sys.country;
    document.querySelector(".city-weather-state-text").innerHTML = data.weather[0].description;
    document.querySelector(".temp-text").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".feels-like-temp").innerHTML = Math.round(data.main.feels_like) + "°C";
    document.querySelector(".humidity-percent").innerHTML = Math.round(data.main.humidity) + "%";
    document.querySelector(".wind-speed").innerHTML = Math.round(data.wind.speed) + " km/h";

    let weatherStt = document.querySelector(".weather-state-img");
        let windSpeed = data.wind.speed; // assuming you have the wind speed

        if (data.weather[0].main == "Clouds") {
        weatherStt.src = "/img/cloudy.png";
        } else if (data.weather[0].main == "Clear") {
        weatherStt.src = "/img/sun.png";
        } else if (data.weather[0].main == "Mist") {
        weatherStt.src = "/img/haze.png";
        } else if (data.weather[0].main == "Drizzle") {
        weatherStt.src = "/img/drizzle.png";
        } else if (data.weather[0].main == "Rain") {
        weatherStt.src = "/img/rain.png";
        } else if (windSpeed > 5) { // Check for wind speed
        weatherStt.src = "/img/windy.png";
        } else {
        weatherStt.src = "/img/default.png"; // Fallback for other conditions
        }
}

searchBtn.addEventListener('click', ()=> {
    checkWeather(searchBox.value);
})
