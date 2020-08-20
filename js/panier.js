let imax = 0;
let basket = document.getElementById("basket");
var button_more = document.getElementsByClassName("button_more");
var button_less = document.getElementsByClassName("button_less");
var delete_product = document.getElementsByClassName("delete_product");
let quantity = document.getElementsByClassName("quantity");
var form = document.querySelector(".needs-validation");
var form = document.querySelector("form");
let products = [];

var arr_cart = JSON.parse(localStorage.getItem("cart"));
if (!arr_cart) {
    arr_cart = [];
};

arr_cart.forEach(product => {
    basket.innerHTML += `
    <div class="teddy_product">
    <img src= "${product.imageUrl}" class = "teddy_image"></img>
    <div class = "teddy_name">
     Nom: ${product.name} 
    </div>
    <div class = "teddy_price">
     Prix: ${product.price / 100} €
    </div>
    <p class = "quantity">Quantité: ${product.qty}</p>
    <div class="teddy_product_button">
     <button class ="button_more">+</button>
     <button class ="button_less">-</button>
     <button class = "delete_product" data-id-produit="${product._id}">x</button>
    </div>
     </div>
    </div>
    ` ;
});

// imax = button_more.length;


for (let i = 0; i < button_more.length; i++) {
    button_more[i].addEventListener("click", () => {
        arr_cart[i].qty++;
        quantity[i].textContent = "quantité : " + arr_cart[i].qty;
        localStorage.setItem("cart", JSON.stringify(arr_cart));
    })
}

for (let i = 0; i < button_less.length; i++) {
    button_less[i].addEventListener("click", (e) => {
        arr_cart[i].qty--;
        quantity[i].textContent = "quantité : " + arr_cart[i].qty;
        if (arr_cart[i].qty <= 1) {
            arr_cart[i].qty = 2;
        }
        localStorage.setItem("cart", JSON.stringify(arr_cart));
    })
}

for (let i = 0; i < delete_product.length; i++) {
    delete_product[i].addEventListener("click", () => {
        // on recupere l'id du produit a supprimer
        let id_produit_a_supprimer = delete_product[i].getAttribute('data-id-produit')
        // on le supprime cote back 
        imax = arr_cart.length
        for (let i = 0; i < imax; i++) {
            if (id_produit_a_supprimer === arr_cart[i]._id) {
                //on supprime
                delete arr_cart[i];
                localStorage.setItem("cart", JSON.stringify(arr_cart))
                break;
            }
        }
        console.log(arr_cart)
    })
}



// input_nom = document.getElementById("nom");
// console.log(input_nom.value)

//bootstrap validator = pour mettre des conditions sur le type/nombre de caractère à mettre dans les inputs//

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let contact = {
        "firstName": document.getElementById('name').value,
        "lastName": document.getElementById('prenom').value,
        "address": document.getElementById('adresse').value,
        "city": document.getElementById('ville').value,
        "email": document.getElementById('email').value
    }

    imax = arr_cart.length
    for (let i = 0; i < imax; i++) {
        console.log(arr_cart[i].qty)
        products.push(arr_cart[i]._id)
        products.push(arr_cart[i])
    }

    let body = {
        contact,
        products
    }

    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' }
    }).then(function (response) {
        return response.json();
    }).then(function (text) {
        console.log(text);
        let arr_text = text
        // console.log(arr_text)
        localStorage.setItem("text", JSON.stringify(arr_text))
        document.location.href = "confirmation-commande.html";
    }).then(function (error) {
        console.error(error)
    })

})