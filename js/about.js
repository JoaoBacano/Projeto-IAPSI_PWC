const apiKey = "e5ce83158746fe24c83144f9e04b70f7";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

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
const citydetailsElement = document.querySelector("#city-detalhes");
const dataElement = document.querySelector("#data");
const iconElement = document.querySelector("#icon");

const btnFavorites = document.querySelector("#btnfavorites");
const imgFavorites = document.querySelector("#imgfavorites");




const getWeatherData = async (city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    console.log(data);
    return data;
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.setItem('city', cityInput.value);
    location.reload();

});

const showWeatherData = async (city) => {

    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    localStorage.setItem('city', cityElement.innerText );
    console.log(localStorage.getItem('city'));
    tempElement.innerText = parseInt(data.main.temp);
    countryElement.innerText = data.sys.country;
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    highElement.innerText = parseInt(data.main.temp_max);
    lowElement.innerText = parseInt(data.main.temp_min);
    pressureElement.innerText = `${data.main.pressure}mb`;
    visibilityElement.innertext = `${data.visibility}km`;
    citydetailsElement.innerText = data.name;
    dataElement.innerText = getFormattedDate(data.dt);
    iconElement.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
};

function getFormattedDate(date) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date * 1000).toLocaleDateString("pt-PT", options);
  }

btnFavorites.addEventListener('click', () => {
    
    var nome = cityElement.innerHTML.toUpperCase();
    var favorites = JSON.parse(localStorage.getItem("favorites"));

        

    if (!favorites.stores.includes(nome)) {
        console.log("teste");
        favorites.stores.push(nome);
        imgFavorites.src = '../icons/starfavorites.png';
        localStorage.setItem("favorites", JSON.stringify(favorites));

    }

});

document.addEventListener('DOMContentLoaded', () => {

    var favorites = JSON.parse(localStorage.getItem("favorites"));
    //localStorage.clear(favorites);
    const citydefault = 'Caldas da Rainha';
    var city = localStorage.getItem('city');
    if (localStorage.getItem('city')=== null){
        localStorage.setItem('city', citydefault);
        showWeatherData(citydefault);
    }else{
        //city = localStorage.getItem('city');
        showWeatherData(city);
    }
    city = localStorage.getItem('city');
    
    
    console.log(city);
    console.log(favorites);
    if (favorites === null) {
        localStorage.setItem("favorites", JSON.stringify({stores:[]}));
        console.log(favorites);
        imgFavorites.src = '../icons/starnofavorites.png';
    }else{
        console.log(favorites.stores);
        city=city.toUpperCase();
         //favorites.toUpperCase();
        if (favorites.stores.includes(city)) {
            console.log("valido");
            imgFavorites.src = '../icons/starfavorites.png';
        } else {
            imgFavorites.src = '../icons/starnofavorites.png';
        }
    }
   
});