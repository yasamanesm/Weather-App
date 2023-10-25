
const backImg = document.querySelector('.back-img');
const input = document.querySelector('.search input');
const button = document.querySelector('.search button');
const weatherImg = document.querySelector('.weather-img');


function weather(city) {

    const apiKey = '06cb067b83518f84b4e6b8c49103f7c7';
    const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    document.querySelector(".error").style.display = "none";

    fetch(apiURL + `${city}&appid=${apiKey}`)
        .then((response) => {
            if (response.status == 404) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather-info").style.display = "none";
                backImg.style.background = "url('../img/main.back.webp')";
                backImg.style.backgroundRepeat = "no-repeat";
                backImg.style.backgroundPosition = "center center";
                backImg.style.backgroundSize = "cover";
            } else {
                return response.json();

            }
        })
        .then((data) => WeatherInfo(data));



}
const weatherImages = {
    Mist: "../img/mist.png",
    Rain: "../img/rain.png",
    Clouds: "../img/cloudy.png",
    Clear: "../img/Sunny.png",
    Drizzle: "../img/drizzle.png",
};

const weatherBackImages = {
    Mist: "../img/mist-back.jpg",
    Rain: "../img/rainy-back.jpg",
    Clouds: "../img/cloudy-back.jpg",
    Clear: "../img/sunny-back.jpg",
    Drizzle: "../img/drizzle-back.jpg",
};

function WeatherInfo(data) {

    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".humidity-descr").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-descr").innerHTML = data.wind.speed + " km/h";

    const weatherDESCR = data.weather[0].main;

    weatherImg.src = weatherImages[weatherDESCR];

    backImg.classList.add("back-transition");
    backImg.style.background = `url(${weatherBackImages[weatherDESCR]})`;
    backImg.style.backgroundRepeat = "no-repeat";
    backImg.style.backgroundPosition = "center center";
    backImg.style.backgroundSize = "cover";

    document.querySelector(".weather-info").style.display = "block";
}


button.addEventListener("click", () => {
    weather(input.value);
    input.value = "";
})


document.querySelector(".search-input")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather(input.value);
            input.value = "";
        }
    });





