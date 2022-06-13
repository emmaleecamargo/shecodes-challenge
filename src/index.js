function getDate(date) {
  let h2 = document.querySelector("h2");
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  h2.innerHTML = `${day} ${hours}:${minutes}`;
}

let now = new Date();
getDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <div class="card" style="width: 14rem">
          <div class="card-body">
            <h5 class="card-title">${formatDay(day.dt)}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="forecast-temp-max"> 
            ${Math.round(day.temp.max)}℃</span></li>
            <li class="list-group-item"><span class="forecast-temp-min"> 
            ${Math.round(day.temp.min)}℃</span></li>
            <li class="list-group-item"><img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="" /></li>
          </ul>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "96a225160ee7bd59b386370f8dd55115";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function displayWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#main-card-title");
  let cityTemp = document.querySelector("#main-temperature");
  let cityWeatherDescription = document.querySelector(
    "#main-weather-description"
  );
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityTemp.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  cityWeatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "96a225160ee7bd59b386370f8dd55115";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Lisbon");
