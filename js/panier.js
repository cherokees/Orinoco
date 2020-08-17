let imax = 0


var arr_cart = JSON.parse(localStorage.getItem("cart"));
if (!arr_cart) {
    arr_cart = [];
};

let basket = document.getElementById("basket")
arr_cart.forEach(product => {
    basket.innerHTML += `
    <div class = "productNameAndClass" >
     name: ${product.name} price: ${product.price} 
     <button class ="btnMore">+</button>
     <button class ="btnLess">-</button>
     <button class = "delete_product" data-id-produit="${product._id}">x</button>
    <p class = "qte">quantité: ${product.qte}</p>
    </div>
    ` ;
});

// fetch("http://localhost:3000/api/teddies/order", {
//     method: "POST",
//     body: JSON.stringify(body),
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
