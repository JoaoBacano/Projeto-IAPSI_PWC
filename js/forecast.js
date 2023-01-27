const apiKey = "e5ce83158746fe24c83144f9e04b70f7";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const tempElement = document.querySelector("#temperature");
const cityElement = document.querySelector("#city");
const countryElement = document.querySelector("#country");
const dataElement = document.querySelector("#data");
const iconElement = document.querySelector("#icon");

const btnFavorites = document.querySelector("#btnfavorites");
const imgFavorites = document.querySelector("#imgfavorites");

//Pega os dados do weather da API de acordo com a cidade enviada
const getWeatherData = async (city) => {

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  console.log(data);
  return data;
};
//Pega os dados do forecast da API de acordo com a cidade enviada
const getWeatherForecast = async (city) => {

  const apiWeatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherForecastURL);
  const data = await res.json();

  console.log(data);
  dayForecast(data);
  hourForeCast(data);

  return data;

}
//Evento para quando clica no searchBtn guardar a cidade inserida no localstorage city
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.setItem('city', cityInput.value);
  location.reload();
});

//mostra os dados 3h do array forecast mas só mostra o numero limitado de espaço do html
function hourForeCast(forecast) {

  for (var i = 0; i < forecast.list.length; i++) {

    document.getElementById("hora" + (i + 1) + "temp").innerHTML = "" + parseInt(forecast.list[i].main.temp) + "°C";
    document.getElementById("hora" + (i + 1)).innerHTML = new Date(forecast.list[i].dt * 1000).toLocaleTimeString(undefined, 'Europa/Portugal').replace(':00', '');
    document.getElementById("hora" + (i + 1) + "icon").src = "http://openweathermap.org/img/w/" +
      forecast.list[i].weather[0].icon
      + ".png";


  }

}

//mostra os dados de cada dia do array forecast passando o array de 8 em 8 elementos pois isso seria um dia(3x8=24).
function dayForecast(forecast) {

  for (var i = 7, j = 1; i < forecast.list.length; i += 8, j++) {
    console.log(forecast.list[i]);
    document.getElementById("dia" + (j) + "data").innerHTML = new Date(forecast.list[i].dt * 1000).toLocaleDateString(undefined, 'Europa/Portugal');
    document.getElementById("dia" + (j) + "name").innerHTML = getFormattedDate(forecast.list[i].dt).substring(0, 3);
    document.getElementById("dia" + (j) + "min").innerHTML = "Min: " + parseInt(forecast.list[i].main.temp_min) + "°C";
    document.getElementById("dia" + (j) + "max").innerHTML = "Max: " + parseInt(forecast.list[i].main.temp_max) + "°C";
    document.getElementById("dia" + (j) + "icon").src = "http://openweathermap.org/img/w/" +
      forecast.list[i].weather[0].icon
      + ".png";

  }
}
//mostra os dados da cidade
const showWeatherData = async (city) => {

  const data = await getWeatherData(city);

  tempElement.innerText = parseInt(data.main.temp);
  cityElement.innerText = data.name;
  countryElement.innerText = data.sys.country;
  dataElement.innerText = getFormattedDate(data.dt);
  iconElement.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";


};

//formata a data
function getFormattedDate(date) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date * 1000).toLocaleDateString("pt-PT", options);
}

//quando clicar no btnFavorites adiciona o nome da cidade ao localstorage favorites
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

//evento para quando da load da pagina mostrar os dados da cidade inserida, mas se não tiver inserido vai mostrar a cidade Caldas da Rainha.
document.addEventListener('DOMContentLoaded', () => {

  var favorites = JSON.parse(localStorage.getItem("favorites"));
  //localStorage.clear(favorites);
  const citydefault = 'Caldas da Rainha';
  var city = localStorage.getItem('city');
  if (localStorage.getItem('city') === null) {
    localStorage.setItem('city', citydefault);
    showWeatherData(citydefault);
    getWeatherForecast(citydefault);
  } else {
    //city = localStorage.getItem('city');
    showWeatherData(city);
    getWeatherForecast(city);
  }
  city = localStorage.getItem('city');

  
  if (favorites === null) {
    localStorage.setItem("favorites", JSON.stringify({ stores: [] }));
    
    imgFavorites.src = '../icons/starnofavorites.png';
  } else {
    
    city = city.toUpperCase();
    //favorites.toUpperCase();
    if (favorites.stores.includes(city)) {
      console.log("valido");
      imgFavorites.src = '../icons/starfavorites.png';
    } else {
      imgFavorites.src = '../icons/starnofavorites.png';
    }
  }
});