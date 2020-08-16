let imax = 0;
let url = window.location.href;
let urlObject = new URL(url);
let id = urlObject.searchParams.get("id");


var arr_cart = JSON.parse(localStorage.getItem("cart"));
if (!arr_cart) {
    arr_cart = [];
};

fetch("http://localhost:3000/api/teddies/" + id).then(function (response) {
    return response.json();
}).then(function (data) {
    let info_product = document.querySelector(".info_product")
    document.querySelector(".image_product").innerHTML += `<img src="${data.imageUrl}" class="img-thumbnail"></img>`
    info_product.innerHTML += `<p> NOM : ${data.name}</p>`
    info_product.innerHTML += `<p> DESCRIPTION : ${data.description}</p>`
    info_product.innerHTML += `<p> PRIX : ${data.price}</p>`
    console.log(data.imageUrl)
    console.log(data.description)
});

// console.log(document.querySelectorAll("iframe[data-image_product]"))
// console.log(document.getAttribute("data-image_product"))