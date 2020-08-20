var arr_cart = JSON.parse(localStorage.getItem("cart"));
if (!arr_cart) {
    arr_cart = [];
};

fetch("http://localhost:3000/api/teddies").then(function (response) {
    return response.json();
})
    .then(function (data) {
        let card = document.getElementsByClassName("card");
        let card_body = document.getElementsByClassName("card-body");
        let card_title = document.getElementsByClassName("card-title");
        let imax = card.length;
        console.log(imax)
        for (let i = 0; i < imax; i++) {
            card[i].innerHTML += `<a href="produits.html?id=${data[i]._id}"><img src="${data[i].imageUrl}"class="card-img-top" alt=""></img></a>`
            card_body[i].innerHTML += `<p class="card-text">${data[i].description}</p>`
            card_title[i].textContent = `${data[i].name}`
            card_body[i].innerHTML += `<p class="card-text">prix : ${data[i].price / 100} €</p>`

        }
        // card.innerHTML += `<img class="card-img-top" src="${data.imageUrl}" alt="Card image cap">`
        console.log(data)
        console.log(card)
    })

let nav_qty_basket = document.querySelector(".nav_qty_basket");
console.log(nav_qty_basket)

let qty_basket = parseInt(arr_cart.length);

nav_qty_basket.innerHTML = qty_basket;