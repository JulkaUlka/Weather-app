// display current day

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

// display weather for current day

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
function displayWeatherCondition(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#display-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = capitalizeFirstLetter(
    response.data.weather[0].description
  );

  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formateDate(response.data.sys.sunrise * 1000);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formateDate(response.data.sys.sunset * 1000);

  let videoElement = document.querySelector("#video");
  if (response.data.weather[0].main === "Clouds") {
    videoElement.setAttribute(
      "src",
      "images/Bill Withers - Ain't No Sunshine.mp4"
    );
  }
  if (response.data.weather[0].main === "Clear") {
    videoElement.setAttribute("src", "images/Boney M. - Sunny.mp4");
  }
  if (response.data.weather[0].main === "Rain") {
    videoElement.setAttribute(
      "src",
      "images/The Weather Girls - It's Raining Men.mp4"
    );
  }
  if (response.data.weather[0].main === "Snow") {
    videoElement.setAttribute("src", "images/Frank Sinatra - Let It Snow.mp4");
  }
  if (response.data.weather[0].main === "Thunderstorm") {
    videoElement.setAttribute("src", "images/AC_DC - Thunderstruck.mp4");
  }
  if (response.data.weather[0].main === "Haze") {
    videoElement.setAttribute("src", "images/Mist.mp4");
  }

  getForecast(response.data.coord);
}
function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

// search city and position

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
function searchLocation(position) {
  let apiKey = "ff425fafca53dfa00a8edad5ed4545b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let citySearch = document.querySelector("#searchCity");
citySearch.addEventListener("keypress", cityValue);
let geolocation = document.querySelector("#searchPosition");
geolocation.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");

// convert temperature

function fTemp(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");

  let temp = document.querySelector("#display-temp");
  let displayTemp = temp.innerHTML;
  temp.innerHTML = Math.round((displayTemp * 9) / 5 + 32);
}
function cTemp(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temp = document.querySelector("#display-temp");
  let displayTemp = temp.innerHTML;
  temp.innerHTML = Math.round((5 / 9) * (displayTemp - 32));
}
let tempChangeForF = document.querySelector("#fahrenheit");
tempChangeForF.addEventListener("click", fTemp);

let tempChangeForC = document.querySelector("#celcius");
tempChangeForC.addEventListener("click", cTemp);

// display forecast by days

function getForecast(coordinates) {
  let apiKey = "ff425fafca53dfa00a8edad5ed4545b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let dailyForecast = response.data.daily;
  let forecastHTML = `<div class="row row-cols-md-6">`;
  dailyForecast.forEach(function (days, index) {
    if (index < 7 && index > 0) {
      let icon = days.weather[0].icon;
      forecastHTML =
        forecastHTML +
        `<div class="col">
          <div class="card">
            <h5 class="card-title">${formatForecastDays(days.dt)}</h5>
            <img id="icon" src="images/${icon}.png" / >
            <div class="card-body">
              <p class="card-text"><strong>${Math.round(
                days.temp.max
              )}°</strong>/${Math.round(days.temp.min)}°</p>
            </div>      
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

// video
window.onload = function () {
  document.querySelector("video").muted = false;
};
