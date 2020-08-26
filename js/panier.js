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
    <div class="container_teddy_product">
        <div class="teddy_img">
            <div class="wrap_teddy_image " style="background-image:url('${product.imageUrl}');">
                &nbsp;
            </div>
        </div>
        <div class="teddy_infos">
            <div class="teddy_infos_product">
                <p>Nom: ${product.name}</p>
                <p>Prix: ${product.price / 100} €</p>
            </div>
            <div class="teddy_infos_quantity">
                <div class = "input_quantity">
                    <label for="quantity">Quantité: </label>
                    <input type="number" class = "quantity" value="${product.qty}">
                </div>
                <div class = "button_quantity">
                    <button class ="button_more">+</button>
                    <button class ="button_less">-</button>
                    <button class = "delete_product" data-id-produit="${product._id}">x</button>
                </div>
            </div>
        </div>
    </div>`
});

// arr_cart.forEach(product => {
//     basket.innerHTML += `
//     <div class="teddy_product" data-id-produit="${product._id}">
//         <div class = "row">
//         <div class="wrap_teddy_image " style="background-image:url('${product.imageUrl}');">
//             &nbsp;
//         </div>
//         <div class ="container_teddy_infos d-flex flex-wrap align-content-center flex-grow-1">
//             <div class = "teddy_name col-sm-12">
//                  Nom: ${product.name} 
//             </div>
//             <div class = "teddy_price col-sm-12">
//                 Prix: ${product.price / 100} €
//             </div>
//             <div class = "quantity col-sm-12">
//                 Quantité: ${product.qty}
//             </div>
//         </div>
//         <div class="teddy_product_button ">
//             <button class ="button_more">+</button>
//             <button class ="button_less">-</button>
//             <button class = "delete_product" data-id-produit="${product._id}">x</button>
//         </div>
//     </div>
//     ` ;
// });

// let arr_qty_products = [];
// var somme = 0;

// for (let i = 0; i < arr_cart.length; i++) {
//     arr_qty_products.push(parseInt(arr_cart[i].qty))
//     console.log(arr_qty_products)
// }

// const reducer = (accumulator, currentValue) => accumulator + currentValue;
// somme = arr_qty_products.reduce(reducer)
// console.log(somme)

// console.log(arr_cart.products)

// let somme_qty_teddy = 0;
// let arr_somme_qty_teddy = []
// const reducer = (accumulator, currentValue) => accumulator + currentValue;
// arr_cart.total = 0;
// console.log(arr_cart.total)

// for (let i = 0; i < arr_cart.length; i++) {
//     console.log(arr_cart[i].qty)
//     somme_qty_teddy = arr_cart[i].qty * (arr_cart[i].price / 100)
//     console.log(somme_qty_teddy)
//     arr_cart[i].total.push(somme_qty_teddy)
//     console.log(arr_cart[i].total)
// }


// arr_cart.forEach(product => {
//     basket.innerHTML += `
//     <section class="mt-5 mb-4">
//             <div class="row">
//                 <div class="col-lg-12">
//                     <div class="card wish-list mb-4">
//                         <div class="card-body">
//                             <div class="row mb-4">
//                                 <div class="col-md-5 col-lg-3 col-xl-3">
//                                     <div class="mb-3 mb-md-0">
//                                         <img class ="img-fluid w-100" src ="${product.imageUrl}">
//                                     </div>
//                                 </div>
//                                 <div class="col-md-7 col-lg-9 col-xl-9 container_teddy_info_cart">
//                                     <div class = "d-flex teddy_info_cart">
//                                         <div class="d-flex justify-content-between infos_teddy">
//                                             <div>
//                                                 <p class = "mb-3 text-muted text-uppercase small">Nom&nbsp:&nbsp${product.name}</p>
//                                                 <p class = "mb-3 text-muted text-uppercase small">Prix&nbsp:&nbsp${product.price / 100}€</p>
//                                                 <p class = "mb-3 text-muted text-uppercase small">Prix&nbsptotal&nbsp:&nbsp${product.price / 100}€</p>
//                                             </div>
//                                         </div>
//                                         <div class="teddy_product_button">
//                                             <div>
//                                                 <button class ="button_more">+</button>
//                                                 <button class ="button_less">-</button>
//                                                 <button class = "delete_product" data-id-produit="${product._id}">x</button>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <div class = "teddy_quantity">
//                                                 <label for="quantity">
//                                                     <h4>Quantité : </h4>     
//                                                 </label>
//                                             <input id ="quantity" type="number" value="${product.qty}" class="quantity form-control quantity-input" style = "width: 8rem">
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>`
// });

for (let i = 0; i < button_more.length; i++) {
    button_more[i].addEventListener("click", () => {
        arr_cart[i].qty++;
        // quantity[i].textContent = "quantité : " + arr_cart[i].qty;
        quantity[i].value = arr_cart[i].qty;
        localStorage.setItem("cart", JSON.stringify(arr_cart));
    })
}

for (let i = 0; i < button_less.length; i++) {
    button_less[i].addEventListener("click", (e) => {
        arr_cart[i].qty--;
        // quantity[i].textContent = "quantité : " + arr_cart[i].qty;
        quantity[i].value = arr_cart[i].qty;
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
// console.log(form_input_adress)

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
    // console.log(arr_cart[i])
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
        // console.log(arr_cart[i].qty)
        // products.push(arr_cart[i]._id)
        products.push(arr_cart[i])
        // console.log(arr_cart[i])
        // products.push(JSON.stringify(somme))
    }

    // console.log('AAAAAAAAAAAAAAA')
    // console.log(products)
    // console.log('ZZZZZZZZZZZZZZZ')

    let obj_body = {
        contact,
        products
    }

    // console.log(obj_body)

    var lasagne = {
        method: "POST",
        body: JSON.stringify(obj_body),
        headers: { 'content-type': 'application/json' }
    };
    // console.log(lasagne)

    /*
    - mettre tous les js en bas avant la fermeture de la balise body 
    - recopier à partir d'une page qui fonctionne le même CDN de bootstrap
    - prendre lasagne, appliquer .json() pour vérifier s'il n'y a un problème de passage stringify, pour essayer de retrouver la qty 
    */


    fetch("http://localhost:3000/api/teddies/order", lasagne).then(function (response) {
        console.log(response.json())

        // return response.json();
    }).then(function (text) {
        // console.log(text);
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        let arr_text = text
        // console.log(arr_text)
        localStorage.setItem("text", JSON.stringify(arr_text))
        // document.location.href = "confirmation-commande.html";
    }).then(function (error) {
        console.error(error)
    })



    // fetch("http://localhost:3000/api/teddies/order", {
    //     method: "POST",
    //     body: JSON.stringify(obj_body),
    //     headers: { 'content-type': 'application/json' }
    // }).then(function (response) {
    //     return response.json();
    // }).then(function (text) {
    //     console.log(text);
    //     let arr_text = text
    //     // console.log(arr_text)
    //     localStorage.setItem("text", JSON.stringify(arr_text))
    //     document.location.href = "confirmation-commande.html";
    // }).then(function (error) {
    //     console.error(error)
    // })

})