//const apiKey = "e5ce83158746fe24c83144f9e04b70f7";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

var myCarousel = document.querySelector('#myCarousel')
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


const getWeatherData = async (city) => {

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  console.log(data);
  return data;
};

const showWeatherData = async (city) => {
  
  city = localStorage.getItem("city");
  console.log(city);
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  countryElement.innerText = data.sys.country;
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;
  highElement.innerText = parseInt(data.temp_max);
  lowElement.innerText = parseInt(data.temp_min);
  pressureElement.innerText = `${data.main.pressure}mb`;
  visibilityElement.innertext = `${data.visibility}km`;
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  const city = cityInput.value;
  localStorage.getItem("city", city);
  
  showWeatherData(city);

});

const showWeatherDataIndex = async (city) => {
  
  const data = await getWeatherData(city);

  tempElement.innerText = parseInt(data.main.temp);
  humidityElement.innerText = `${data.main.humidity}%`;
  //windElement.innerText = `${data.wind.speed}km/h`;

};

myCarousel.addEventListener("DOMContentLoaded", () => {

  console.log(`hello`);
  if(carouselDubai){
    showWeatherDataIndex(`Dubai`);
  }else if(carouselLondres){
   showWeatherDataIndex(`Londres`);
  }else if(carouselToquio){
    showWeatherDataIndex(`Tóquio`);
 }
  
});

