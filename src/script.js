function currentDay(special) {
  let day = special.getDay();
  let week = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  let days = week[day];

  return days;
}

let current = new Date();
let hours = current.getHours();
let minutes = current.getMinutes();
let time = document.querySelector("#time-date");
let date = document.querySelector("#date-head, special");
date.innerHTML = currentDay(current);

time.innerHTML = current.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

function searchCity(city) {
  let apiKey = "6ab671fa732a8fecfd76817bf10a3006";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  //console.log(response.data);

  let iconElement = document.querySelector("#icon-weather");

  document.querySelector("#city-title").innerHTML = response.data.name;
  findCelsiusTemperature = response.data.main.temp;
  document.querySelector("#main-number-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind-direction").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humid-levels").innerHTML =
    response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function currentPosition(position) {
  let apiKey = "6ab671fa732a8fecfd76817bf10a3006";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function findCityWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}
function findCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function fahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-number-temp");
  let findFahrenheitTemperature = (findCelsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(findFahrenheitTemperature);
}

function celsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-number-temp");
  temperature.innerHTML = Math.round(findCelsiusTemperature);
}

let findCelsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-symbol");
celsiusLink.addEventListener("click", celsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-symbol");
fahrenheitLink.addEventListener("click", fahrenheitTemperature);

let buttonSearch = document.querySelector("#search-form");
buttonSearch.addEventListener("submit", findCityWeather);

let currentButton = document.querySelector("#current-weather");
currentButton.addEventListener("click", findCurrentWeather);

searchCity("Toronto");
