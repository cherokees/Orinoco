let imax = 0;
let basket = document.getElementById("basket");
var button_more = document.getElementsByClassName("button_more");
var button_less = document.getElementsByClassName("button_less");
var delete_product = document.getElementsByClassName("delete_product");
let quantity = document.getElementsByClassName("quantity");
var form = document.querySelector(".needs-validation");
var form = document.querySelector("form");
let products = [];
let prix_de_groupe = 0;

//Les écouteurs d'événements sont créé au chargement de la page 
//par la suite on modifie le DOM, il faudrait également modifier les écouteurs.
//utilisation des événements au sein des attributs HTML (onclick) permet de faire une pierre deux coups.

function maj_vue_prix_total() {
    let prix_total = 0;
    let imax = arr_cart.length;
    for (let i = 0; i < imax; i++) {
        prix_total += arr_cart[i].qty * arr_cart[i].price;
    }
    prix_total /= 100;
    document.getElementById('price_total').innerHTML = prix_total;
}
function maj_vue_prix_groupe(para_key_array_cart) {
    let prix_de_groupe = (arr_cart[para_key_array_cart].price * arr_cart[para_key_array_cart].qty) / 100;
    document.querySelector('.prix_de_groupe[data-id-produit="' + arr_cart[para_key_array_cart]._id + '"]').innerHTML = prix_de_groupe;
}
function fct_delete_product(id_produit_a_supprimer) {
    var noeud_a_supprimer = document.querySelector(`.container_teddy_product[data-id-produit="${id_produit_a_supprimer}"]`);
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
    noeud_a_supprimer.remove();

    // on met a jour le prix total 
    maj_vue_prix_total();
}
// BOUTON PLUS
function fct_more_qty_product(id_produit_a_incrementer) {
    imax = arr_cart.length
    for (let i = 0; i < imax; i++) {
        if (id_produit_a_incrementer === arr_cart[i]._id) {
            arr_cart[i].qty++;
            // maj localstorage 
            localStorage.setItem("cart", JSON.stringify(arr_cart));

            // mettre à jour de la quantite dans l'input de quantite
            document.querySelector('input.quantity[data-id-produit="' + id_produit_a_incrementer + '" ]').value = arr_cart[i].qty;

            // maj des prix
            maj_vue_prix_groupe(i);
            maj_vue_prix_total();

            // on rafraichit le panier
            refresh_nav_basket();
            break;
        }
    }
}
// BOUTON MOINS
function fct_less_qty_product(id_produit_a_incrementer) {
    imax = arr_cart.length
    for (let i = 0; i < imax; i++) {
        if (id_produit_a_incrementer === arr_cart[i]._id) {
            if (arr_cart[i].qty > 1) {
                arr_cart[i].qty--;
            } else {
                arr_cart[i].qty = 1;
            }
            // maj localstorage 
            localStorage.setItem("cart", JSON.stringify(arr_cart));

            // mettre à jour de la quantite dans l'input de quantite
            document.querySelector('input.quantity[data-id-produit="' + id_produit_a_incrementer + '" ]').value = arr_cart[i].qty;

            // maj des prix
            maj_vue_prix_groupe(i);
            maj_vue_prix_total();

            // on rafraichit le panier
            refresh_nav_basket();
            break;
        }
    }
}

arr_cart.forEach(product => {

    let prix_de_groupe = (product.price * product.qty) / 100;

    basket.innerHTML += `
    <div class="container_teddy_product" data-id-produit="${product._id}"> <!-- WARNING element utile pour supprimer le noeud -->
        <div class="teddy_img">
            <div class="wrap_teddy_image " style="background-image:url('${product.imageUrl}');">
                &nbsp;
            </div>
        </div>
        <div class="teddy_infos">
            <div class="teddy_infos_product">
                <p>Nom&nbsp;: ${product.name}</p>
                <p>Prix individuel&nbsp;: ${product.price / 100} €</p>
                <p>Prix de groupe&nbsp;: <span class="prix_de_groupe" data-id-produit="${product._id}">${prix_de_groupe}</span> €</p>
            </div>
            <div class="teddy_infos_quantity">
                <div class = "input_quantity">
                    <label for="quantity">Quantité&nbsp;: </label>
                    <input type="number" class = "quantity" value="${product.qty}" data-id-produit="${product._id}" readonly>
                </div>
                <div class = "button_quantity">
                    <button class ="button_more" onclick="fct_more_qty_product('${product._id}');">+</button>
                    <button class ="button_less" onclick="fct_less_qty_product('${product._id}');">-</button>
                    <button class = "delete_product" onclick="fct_delete_product('${product._id}');">x</button>
                </div>
            </div>
        </div>
    </div>`;
});

maj_vue_prix_total();

// FORMULAIRE

let container_form_email = document.getElementById("container_form_email");
let form_input_email = document.getElementById("email");

form_input_email.addEventListener("click", () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value)) {
        return container_form_email.innerHTML += `<div class="valid-feedback">Valide</div>`
    }
    return container_form_email.innerHTML += `<div class="invalid-feedback">Veuillez écrire un email valide ( exemple : aaa@aaa.aaa)</div>`
})

let container_form_adress = document.getElementById("container_form_adress");
let form_input_adress = document.getElementById("adress");

form_input_adress.addEventListener("click", () => {
    if (/^[a-zA-Z\s\d\/]*\d[a-zA-Z\s\d\/]*$/.test(form.adress.value)) {
        return container_form_adress.innerHTML += `<div class="valid-feedback">Valide</div>`
    }
    return container_form_adress.innerHTML += `<div class="invalid-feedback">Veuillez écrire une adresse valide (minimum 4 lettres)</div>`
})

//REQUETE FETCH

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
        products.push(arr_cart[i])
    }

    let obj_body = {
        contact,
        products
    }

    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",

        body: JSON.stringify(obj_body),
        headers: { 'content-type': 'application/json' }
    }).then(function (response) {
        return response.json();
    }).then(function (text) {
        let arr_text = text
        localStorage.setItem("text", JSON.stringify(arr_text))
        document.location.href = "confirmation-commande.html";
    }).then(function (error) {
        console.error(error)
    })
})


