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

const btnFavorites = document.querySelector("#btnfavorites");
const imgFavorites = document.querySelector("#imgfavorites");

var adicionarcard = document.querySelector("#cards");

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

  tempElement.innerText = `${parseInt(data.main.temp)}ºC`;
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

};

document.addEventListener('DOMContentLoaded', () => {

  var favorites = localStorage.getItem("favorites");
  const link = window.location.href;

  if (link.includes("index.html")) {
    showWeatherDataIndex(`Dubai`);
  } else if (link.includes("about.html")) {
    var city = localStorage.getItem("city");
    var nome = cityElement.innerHTML;
    var favorites = localStorage.getItem("favorites");
    console.log(city);
    showWeatherData(city);
  } else if (link.includes("forecast.html")) {
    //showWeatherDataForeCast(city);´
    
    var city = localStorage.getItem("city");
    var nome = cityElement.innerHTML;
    showWeatherDataForeCast(city) ;

  } else if (link.includes("favorites.html")) {
    
    cardfavorito(favorites);
  }

  // if (favorites.includes(nome)) {
    
  //   imgFavorites.src = '../icons/starfavorites.png';
  // } else {
  //   imgFavorites.src = '../icons/starnofavorites.png';
  // }
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

function showWeatherDataForeCast(city) {

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {


      // for (i = 0; i < 5; i++) {
      //   document.getElementById("dia" + (i + 1)).innerHTML = getFormattedDate(data.list[i].dt).substring(0,3);
        
      // }
      //Getting the min and max values for each day
      for (i = 0; i < 5; i++) {
        document.getElementById("dia" + (i + 1) + "min").innerHTML = "Min: " + parseInt(data.list[i].main.temp_min - 273.15) + "°";
        //Number(1.3450001).toFixed(2); // 1.35
      }

      for (i = 0; i < 5; i++) {
        document.getElementById("dia" + (i + 1) + "max").innerHTML = "Max: " + parseInt(data.list[i].main.temp_max - 273.15) + "°";
      }
      //------------------------------------------------------------


      //------------------------------------------------------------
      console.log(data)


    });

}
if(btnFavorites != null){

  btnFavorites.addEventListener('click', () => {
  var favorites = localStorage.getItem("favorites");
  var nome = cityElement.innerHTML;
  console.log(nome);
  if (!favorites) {
    localStorage.setItem("favorites", JSON.stringify({ stores: [] }));
    favorites = JSON.parse(localStorage.getItem("favorites"));
  } else {
    favorites = JSON.parse(favorites);
  }

  if (imgFavorites.src == '../icons/starfavorites.png') {
    
    favorites.stores.pop(nome);
    imgFavorites.src = '../icons/starnofavorites.png';
  } else {
    favorites.stores.push(nome);
    imgFavorites.src = '../icons/starfavorites.png';
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
  favorites.stores.push(nome);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  

});
}

function getFormattedDate(date){
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date * 1000).toLocaleDateString("pt-PT",options);
}

function cardfavorito(favorites){
  for (let index = 0; index < 3; index++) {
    row.innerHTML = '<div class="col"> <div class="card"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">Card title</h5> <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p></div></div> </div>';
    
  }
}