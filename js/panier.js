let imax = 0;
let basket = document.getElementById("basket");
var button_more = document.getElementsByClassName("button_more");
var button_less = document.getElementsByClassName("button_less");
var delete_product = document.getElementsByClassName("delete_product");
let quantity = document.getElementsByClassName("quantity");
var form = document.querySelector(".needs-validation");
var form = document.querySelector("form");
let products = [];

// var arr_cart = JSON.parse(localStorage.getItem("cart"));
// if (!arr_cart) {
//     arr_cart = [];
// };

//<img src= "${product.imageUrl}" class = "teddy_image">
// ${product.imageUrl}

arr_cart.forEach(product => {
    basket.innerHTML += `
    <div class="teddy_product" data-id-produit="${product._id}">
        <div class="wrap_teddy_image" style="background-image:url('${product.imageUrl}');">
            &nbsp;
        </div>
        <div class ="container_teddy_infos d-flex flex-wrap align-content-center flex-grow-1">
            <div class = "teddy_name col-sm-12">
                 Nom: ${product.name} 
            </div>
            <div class = "teddy_price col-sm-12">
                Prix: ${product.price / 100} €
            </div>
            <div class = "quantity col-sm-12">
                Quantité: ${product.qty}
            </div>
        </div>
        <div class="teddy_product_button d-flex justify-content-end">
            <button class ="button_more">+</button>
            <button class ="button_less">-</button>
            <button class = "delete_product" data-id-produit="${product._id}">x</button>
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
                //supprimer le parentNode du parentNode du bouton delete dans le dom

                // on enleve les noeuds vides du tableaux (en l'occurrence, les produits qu'on a supprimé via la page panier.html)
                arr_cart = arr_cart.filter(function (element) {
                    return element != null;
                });

                localStorage.setItem("cart", JSON.stringify(arr_cart))
                break;
            }
        }
        // on rafraichit le panier
        refresh_nav_basket();

        // on supprime le noeud dans DOM 
        var noeud_a_supprimer = document.querySelector(`.teddy_product[data-id-produit="${id_produit_a_supprimer}"]`);
        noeud_a_supprimer.remove();

    })
}

let arr_qty_products = [];

for (let i = 0; i < arr_cart.length; i++) {
    arr_qty_products.push(parseInt(arr_cart[i].qty))
    console.log(arr_qty_products)
}

for (let i = 0; i < arr_qty_products; i++) {
    var somme = 0;
    somme += arr_qty_products[i];
    console.log(somme)
}

console.log(somme)

// for (let i = 0; i < arr_cart.length; i++) {
//     let quantity_product_number = parseInt(arr_cart[i].qty)
//     console.log(quantity_product_number)
//     let quantity_product += quantity_product_number
//     console.log(quantity_product)
// }

let container_form_email = document.getElementById("container_form_email");
let form_input_email = document.getElementById("email");

form_input_email.addEventListener("click", () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value)) {
        return container_form_email.innerHTML += `<div class="valid-feedback">Valide</div>`
    }
    return container_form_email.innerHTML += `<div class="invalid-feedback">Veuillez écrire un email valide</div>`
})

let container_form_adress = document.getElementById("container_form_adress");
let form_input_adress = document.getElementById("adress");
console.log(form_input_adress)

form_input_adress.addEventListener("click", () => {
    if (/^[a-zA-Z\s\d\/]*\d[a-zA-Z\s\d\/]*$/.test(form.adress.value)) {
        return container_form_adress.innerHTML += `<div class="valid-feedback">Valide</div>`
    }
    return container_form_adress.innerHTML += `<div class="invalid-feedback">Veuillez écrire un email valide</div>`
})

let regex_code_postal = /[0-9]{5}/g
let container_form_postal_code = document.getElementById("container_form_postal_code");
let form_input_postal_code = document.getElementById("postal_code");

form_input_postal_code.addEventListener("click", () => {
    if (regex_code_postal.test(form.postal_code.value)) {
        return container_form_postal_code.innerHTML += `<div class="valid-feedback">Valide</div>`
    }
    return container_form_postal_code.innerHTML += `<div class="invalid-feedback">Veuillez écrire un email valide</div>`
})




// input_nom = document.getElementById("nom");
// console.log(input_nom.value)

//bootstrap validator = pour mettre des conditions sur le type/nombre de caractère à mettre dans les inputs//

for (let i = 0; i < arr_cart.length; i++) {
    console.log(arr_cart[i])
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    let contact = {
        "firstName": document.getElementById('name').value,
        "lastName": document.getElementById('prenom').value,
        "address": document.getElementById('adress').value,
        "city": document.getElementById('ville').value,
        "email": document.getElementById('email').value
    }

    imax = arr_cart.length
    for (let i = 0; i < imax; i++) {
        console.log(arr_cart[i].qty)
        // products.push(arr_cart[i]._id)
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