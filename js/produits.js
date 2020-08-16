// on vérifie si c'est un entier et s'il est >= 1, sinon on le transforme en 1
function filter_qty(para_int) {
    //https://delicious-insights.com/fr/articles/convertir-un-nombre-en-texte-en-javascript/#la-m-thode-hack-ultra-performante-mais-peu-lisible-et-non-sans-limites
    let result = parseInt(para_int | 0);
    if (result < 1) result = 1; // la quantitee doit obligatoirement etre 1 ou +
    //si ele resultat est >= 1 il reste le même, par exemple 5 restera 5
    return result;
}

let imax = 0;
let url = window.location.href;
let urlObject = new URL(url);
let id = urlObject.searchParams.get("id");
let bool_new_product = true;
let button_more = document.getElementById("button_more");
console.log(button_more)
let button_less = document.getElementById("button_less");
let input_qty = document.getElementById("qty");
let quantity_product = document.getElementById("quantity_product")
let qty = 1;

var arr_cart = JSON.parse(localStorage.getItem("cart"));
if (!arr_cart) {
    arr_cart = [];
};

fetch("http://localhost:3000/api/teddies/" + id).then(function (response) {
    return response.json();
}).then(function (data) {
    let info_product = document.querySelector(".info_product");
    document.querySelector(".image_product").innerHTML += `<img src="${data.imageUrl}" class="img-thumbnail"></img>`;
    info_product.innerHTML += `<p> NOM : ${data.name}</p>`;
    info_product.innerHTML += `<p> DESCRIPTION : ${data.description}</p>`;
    info_product.innerHTML += `<p> PRIX : ${data.price}</p>`;

    let add_basket = document.querySelector(".add_basket");
    add_basket.addEventListener("click", () => {
        // console.log(data.imageUrl)
        // console.log(data.description)
        id_element_click = data._id;
        imax = arr_cart.length;
        for (var i = 0; i < imax; i++) {
            id_element_temporary = arr_cart[i]._id;
            if (id_element_click == id_element_temporary) {
                bool_new_product = false;
                break;
            }
        }
        if (bool_new_product) {
            qty = filter_qty(input_qty.value);
            data.qty = qty;
            arr_cart.push(data);
        }
        else {
            imax = arr_cart.length;
            for (var i = 0; i < imax; i++) {
                id_element_temporary = arr_cart[i]._id;
                if (id_element_temporary == id_element_click) {
                    qty = arr_cart[i].qty;
                    qty += filter_qty(input_qty.value);
                    arr_cart[i].qty = qty;
                }
            }
        }
        localStorage.setItem("cart", JSON.stringify(arr_cart));
    });
});
console.log(button_more)
button_more.addEventListener('click', () => {
    input_qty.value = filter_qty(input_qty.value) + 1;
})
button_less.addEventListener('click', () => {
    input_qty.value = filter_qty(filter_qty(input_qty.value) - 1);
})
input_qty.addEventListener('change', () => {
    input_qty.value = filter_qty(input_qty.value);
})


// console.log(document.querySelectorAll("iframe[data-image_product]"))
// console.log(document.getAttribute("data-image_product"))