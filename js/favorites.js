var cardsElement = document.querySelector('#cards');
var removefavoritesElement = document.querySelector('#btnremovefavorites')

//evento para quando da load da pagina pegar os dados do localstorage favorites e colocar na variavel favorites.
document.addEventListener('DOMContentLoaded', () => {

    if (favorites !== null) {
        var favorites = JSON.parse(localStorage.getItem("favorites"));
        cardFavoritos(favorites);
        console.log(favorites.stores.length);
    }
});

//cria um card para cada cidade do array favorites
function cardFavoritos(favorites) {

    for (let i = 0; i < favorites.stores.length; i++) {
        cardsElement.innerHTML += '<div class="col"><div class="card"><img src="../img/background.jpg" class="card-img-top" alt="..."><div class="card-body">' +
            '<h5 class="card-title">' + favorites.stores[i] + '</h5> <button id="btnremovefavorites" class="btn btnremovefavorites"><img src="" id="imgremoveffavorites"alt="" class="img-fluid"> </button>' +
            '<p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p></div></div></div>';


       /*  removefavoritesElement.addEventListener('click', () => {

            delete favorites.stores[i];

        }); 
 */

    }
}




