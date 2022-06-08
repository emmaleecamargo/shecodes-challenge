function getDate(date) {
  let h2 = document.querySelector("h2");
  let dayIndex = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  h2.innerHTML = `${day}, ${month} ${dayIndex}, ${hours}:${minutes}`;
}

let now = new Date();
getDate(now);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#main-card-title");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let cityInput = document.querySelector("#city-input");
function getForecast(coordinates) {
  let apiKey = "96a225160ee7bd59b386370f8dd55115";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function displayWeather(response) {
  let cityInput = document.querySelector("#city-input");
  let cityElement = document.querySelector("#main-card-title");
  let cityDescription = document.querySelector("#main-card-description");
  let cityTemp = document.querySelector("#main-temperature");
  let cityWeatherDescription = document.querySelector(
    "#main-weather-description"
  );
  let emoji = document.querySelector("main-emoji");

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.main.wind.speed;

  cityTemp.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  cityWeatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  cityElement.innerHTML = cityInput.value;
  cityTemp.innerHTML = temperature;
  if (temperature >= 20) {
    cityWeatherDescription.innerHTML = `Sunny`;
    emoji.innerHTML = `☀`;
  }
  cityDescription.innerHTML = `Humidity: ${humidity}% Wind: ${windSpeed} km/h`;

  getForecast(response.data.coord);
}
