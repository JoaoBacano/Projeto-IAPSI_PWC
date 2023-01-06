const apiKey = "e5ce83158746fe24c83144f9e04b70f7";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

var myCarousel = document.querySelector("#carouselExampleIndicators");
const carouselDubai = document.querySelector("#dubai");
const carouselLondres = document.querySelector("#londres");
const carouselToquio = document.querySelector("#toquio");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");
const highElement = document.querySelector("#high");
const lowElement = document.querySelector("#low");
const pressureElement = document.querySelector("#pressure");
const visibilityElement = document.querySelector("#visibility");
const uvElement = document.querySelector("#uv");
const moonElement = document.querySelector("#moon");


console.log(localStorage.getItem("city"));

const getWeatherData = async (city) => {

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  console.log(data);
  return data;
};

const getWeatherForecast = async (city) => {

  const apiWeatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherForecastURL);
  const data = await res.json();

  console.log(data);
  return data;
  
}

const showWeatherData = async (city) => {

  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  countryElement.innerText = data.sys.country;
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;
  highElement.innerText = parseInt(data.main.temp_max);
  lowElement.innerText = parseInt(data.main.temp_min);
  pressureElement.innerText = `${data.main.pressure}mb`;
  visibilityElement.innertext = `${data.visibility}km`;
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  
  const link = window.location.href;
  localStorage.setItem('city', cityInput.value);

  if (link.includes("index.html")) {
    window.location.replace("pages/about.html");
  }

});

const showWeatherDataIndex = async (city) => {

  const data = await getWeatherData(city);

  tempElement.innerText = parseInt(data.main.temp);
  humidityElement.innerText = `${data.main.humidity}%`;
  //windElement.innerText = `${data.wind.speed}km/h`;

};

document.addEventListener('DOMContentLoaded', () => {

  var city = localStorage.getItem("city");
  const link = window.location.href;

  if (link.includes("index.html")) {
    showWeatherDataIndex(`Dubai`);
  } else if (link.includes("about.html")) {
    
    console.log(city);
    showWeatherData(city);
  } else if (link.includes("forecast.html")) {
    //showWeatherDataForeCast(city);
    getinfo(city);
    
  }

});

if (myCarousel != null) {

  myCarousel.addEventListener("slide.bs.carousel", () => {

    var currentIndex = $('div.active').index() + 1;
    console.log(currentIndex);

    if (currentIndex == 1) {
      showWeatherDataIndex(`Londres`);
    } else if (currentIndex == 2) {
      showWeatherDataIndex(`Tóquio`);
    } else if (currentIndex == 3) {
      showWeatherDataIndex(`Malina`);
    } else if (currentIndex == 4) {
      showWeatherDataIndex(`New York`);
    } else if (currentIndex == 5) {
      showWeatherDataIndex(`Xangai`);
    } else if (currentIndex == 6) {
      showWeatherDataIndex(`Dubai`);
    }

  });
}

const showWeatherDataForeCast = async (city) => {

  const data = await getWeatherForecast(city);

  //tempElement.innerText = parseInt(data.list.main.temp);
  
};

function getinfo(city){
  
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
.then(response => response.json())
.then(data => {

    //Getting the min and max values for each day
    for(i = 0; i<5; i++){
        document.getElementById("dia" + (i+1) + "min").innerHTML = "Min: " + parseInt(data.list[i].main.temp_min - 273.15) + "°";
        //Number(1.3450001).toFixed(2); // 1.35
    }

    for(i = 0; i<5; i++){
        document.getElementById("dia" + (i+1) + "max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
    }
    //------------------------------------------------------------

    
    //------------------------------------------------------------
    console.log(data)


})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}