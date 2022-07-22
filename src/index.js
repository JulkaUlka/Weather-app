let currentDay = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thirsday",
  "Friday",
  "Satuday",
  "Sunday",
];
let nowDate = currentDay.getDate();
let nowDay = days[currentDay.getDay()];
let currentDayShow = document.querySelector("div#currentDate");
currentDayShow.innerHTML = `${nowDay}, ${nowDate}`;

function displayWeatherCondition(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#display-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formateDate(response.data.sys.sunrise * 1000);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formateDate(response.data.sys.sunset * 1000);
}
function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "ff425fafca53dfa00a8edad5ed4545b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function cityValue(event) {
  let city = document.querySelector("#searchCity").value;

  if (event.key === "Enter") {
    event.preventDefault();
    searchCity(city);
  }
}

let citySearch = document.querySelector("#searchCity");
citySearch.addEventListener("keypress", cityValue);

function fTemp(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");

  let temp = document.querySelector("#display-temp");
  let displayTemp = temp.innerHTML;
  temp.innerHTML = Math.round((displayTemp * 9) / 5 + 32);
}
let tempChangeForF = document.querySelector("#fahrenheit");
tempChangeForF.addEventListener("click", fTemp);

function cTemp(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temp = document.querySelector("#display-temp");
  let displayTemp = temp.innerHTML;
  temp.innerHTML = Math.round((5 / 9) * (displayTemp - 32));
}
let tempChangeForC = document.querySelector("#celcius");
tempChangeForC.addEventListener("click", cTemp);

function searchLocation(position) {
  let apiKey = "ff425fafca53dfa00a8edad5ed4545b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let geolocation = document.querySelector("#searchPosition");
geolocation.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
