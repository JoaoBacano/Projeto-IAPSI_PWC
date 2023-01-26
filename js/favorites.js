var cardsElement = document.querySelector('#cards');
const removefavoritesElement = document.querySelector('#btnremovefavorites')


document.addEventListener('DOMContentLoaded', () => {

    if (favorites !== null) {
        var favorites = JSON.parse(localStorage.getItem("favorites"));
        cardFavoritos(favorites);
        console.log(favorites.stores.length);
    }
});

 function cardFavoritos(favorites) {

    for (let i = 0; i < favorites.stores.length; i++) {
        cardsElement.innerHTML += '<div class="col"><div class="card"><img src="../img/background.jpg" class="card-img-top" alt="..."><div class="card-body">' +
            '<h5 class="card-title">' + favorites.stores[i] + '</h5> <button id="btnremovefavorites" class="btn btnremovefavorites" onclick='+ '><img src="../icons/removefavorites.png" id="imgremoveffavorites"alt="" class="img-fluid"> </button>' +
            '<p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p></div></div></div>';
        
    }
}

function removefavorites(arr, position) {


    arr.splice(position, 1);


}



