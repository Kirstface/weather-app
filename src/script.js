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
  console.log(response.data);
  document.querySelector("#city-title").innerHTML = response.data.name;
  document.querySelector("#main-number-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind-direction").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humid-levels").innerHTML =
    response.data.main.humidity;
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

let buttonSearch = document.querySelector("#search-form");
buttonSearch.addEventListener("submit", findCityWeather);

let currentButton = document.querySelector("#current-weather");
currentButton.addEventListener("click", findCurrentWeather);

searchCity("Toronto");
