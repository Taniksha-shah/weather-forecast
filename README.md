# Weather Forecast App ☀️

This is a simple web application that provides real-time weather information and a 7-day forecast for any city around the world. It is built using HTML, CSS, and JavaScript and deployed using Vercel.

Live Demo Link : https://weather-forecast-self-nu.vercel.app/

## Features

  * **Current Weather:** Displays real-time temperature, weather conditions, humidity, and wind speed.
  * **7-Day Forecast:** Provides a detailed forecast for the next week, including daily high and low temperatures and weather conditions.
  * **City Search:** Allows users to get weather information for any city by typing its name.
  * **Responsive Design:** The app is fully responsive and works on desktops, tablets, and mobile devices.

## Screenshots
![desktop-screenshot](/img/ss1.png)

## Technologies Used

  * **HTML:** For the app's structure.
  * **CSS:** For styling and layout, including a smooth gradient background.
  * **JavaScript:** For fetching data from the **OpenWeatherMap API** and dynamically updating the UI.

## How to Run the App

1.  **Clone the Repository:** Download the project files to your local machine.
2.  **Get an API Key:** Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/) to get your API key.
3.  **Update the JavaScript:** Open the `script.js` file and replace the placeholder API key with your own.
4.  **Open in Browser:** Open the `index.html` file in your preferred web browser.

## API Endpoints

The app uses two main API endpoints from OpenWeatherMap:

  * **Current Weather:** `https://api.openweathermap.org/data/2.5/weather`
  * **7-Day Forecast:** `https://api.openweathermap.org/data/2.5/onecall`

-----

## Project Structure

```
.
├── index.html
├── style.css
├── general.css
├── script.js
└── img
    ├── rain.png
    ├── drizzle.png
    ├── haze.png
    ├── clear.png
    ├── windy.png
    └── cloudy.png
```
```