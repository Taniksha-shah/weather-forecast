const apiKey = "8b31efa1bb6a5d665ece492bc139e4fc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const forecastData = await forecastResponse.json();

    console.log(data);
    console.log(forecastData);

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

        const weekPreviewCards = document.querySelector(".week-preview-cards");
        if (forecastData && forecastData.list && weekPreviewCards) {
            // Clear previous forecast
            weekPreviewCards.innerHTML = "";

            // Create a map to store one forecast per day (at 12:00)
            const dailyForecast = {};
            forecastData.list.forEach(item => {
                const date = new Date(item.dt_txt);
                const hours = date.getHours();
                if (hours === 12) {
                    const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                    dailyForecast[day] = item;
                }
            });

            // Get up to 7 days
            const days = Object.keys(dailyForecast).slice(0, 7);

            days.forEach(day => {
                const item = dailyForecast[day];
                const icon = item.weather[0].main === "Clouds" ? "/img/cloudy.png"
                    : item.weather[0].main === "Clear" ? "/img/sun.png"
                    : item.weather[0].main === "Mist" ? "/img/haze.png"
                    : item.weather[0].main === "Drizzle" ? "/img/drizzle.png"
                    : item.weather[0].main === "Rain" ? "/img/rain.png"
                    : item.wind.speed > 5 ? "/img/windy.png"
                    : "/img/default.png";

                const card = document.createElement("div");
                card.className = "forecast-card";
                card.innerHTML = `
                    <div class="day-preview-card">
                        <div class="day-div">
                            <div class="day-text">${day}</div>
                        </div>
                        <div class="weather-div">
                            <div class="weather-icon-img">
                                <img src="${icon}" alt="${item.weather[0].main}" class="forecast-icon" width="20" height="20"/>
                            </div>
                            <div class="weather-text">${data.weather[0].description}</div>
                        </div>
                        <div class="max-min-temp-div">
                            <div class="max-temp">${Math.round(item.main.temp_max)}°C</div>
                            <div class="min-temp">${Math.round(item.main.temp_min)}°C</div>
                        </div>
                    </div>
                    
                `;
                weekPreviewCards.appendChild(card);
                
            });
        }
    
}

searchBtn.addEventListener('click', ()=> {
    checkWeather(searchBox.value);
})

const forecastElement = document.querySelector("week-preview-cards");

document.addEventListener('DOMContentLoaded', ()=> {
    getlocationWeather();
});

async function getlocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();
            if (data && data.name) {
                checkWeather(data.name);
            }
        }, (error) => {
            // fallback: use a default city if user denies location
            checkWeather("London");
        });
    } else {
        // fallback: use a default city if geolocation not supported
        checkWeather("London");
    }
}