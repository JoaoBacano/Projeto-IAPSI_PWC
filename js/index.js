const apiKey = "e5ce83158746fe24c83144f9e04b70f7";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
var myCarousel = document.querySelector("#carouselExampleIndicators");

const tempElement = document.querySelector("#temperature");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");

//Pega os dados do weather da API de acordo com a cidade enviada
const getWeatherData = async (city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    console.log(data);
    return data;
};
//Evento para quando clica no searchBtn guardar a cidade inserida no localstorage city e a pagina about é aberta
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.setItem('city', cityInput.value);
    window.location.replace("pages/about.html");
});

//mostra os dados da cidade
const showWeatherDataIndex = async (city) => {

    const data = await getWeatherData(city);

    tempElement.innerText = `${parseInt(data.main.temp)}ºC`;
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

};

//evento para quando da load aperece logo os dados de dubai
document.addEventListener('DOMContentLoaded', () => {

    showWeatherDataIndex(`Dubai`);
});

//toda vez que o carousel roda os dados mudam de acordo com a cidade correspondente
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