import { restaurantData } from './data.js'


const outerContainer = document.getElementById("outer-container")
const headerContainer = document.getElementById("header-container")
const cartContainer = document.getElementById("cart-container")

let restaurantChoice = "burger"
let restaurant = {}

let cart = new Map()

function render() {
   renderHeader()
   renderItemsAvailable()  
}

function renderHeader() {
     switch (restaurantChoice) {
        case "burger":
            
            
            headerContainer.style.backgroundImage = `url("./assets/${restaurant.image}")`
            
            headerContainer.innerHTML = `
            <h1 id="header-h1">${restaurant.headline}</h1>
            <h2 id="header-h2">${restaurant.subText}</h2>
            `
            
    }
}

function renderItemsAvailable() {
  
    let itemsList = ``
    let itemsContainer = document.getElementById("items-container")
    for (let item of restaurant.itemsArray){
        itemsContainer.innerHTML +=
            `
                <div class="item-outer-container">
                    <h1 class="item-emoji">${item.emoji}</h1>
                    <div class="item-inner-container">
                        <h1 class="item-name-h1">${item.name}</h1>
                        <h2 class="item-ingredients-h2">${item.ingredients.join(" ")}</h2>
                        <h2 class="item-price-h2">$${item.price}</h2>
                        
                    </div>
                    <button class="item-add-button" id="${item.name}">+</button>
                </div>
            `
    }
}


function renderCart() {
    let subTotal = 0
    let cartHTML = `<div id="cart-h1-container"><h1 id="cart-h1">Your Order</h1></div>`
   
    for ( const [name , details] of cart) {
        // console.log(name, details)
        cartHTML += `
        
        <div class="cart-item-details"><span class="cart-remove-span">
            ${name}
            <button class="cart-remove-button" id="${name}-remove-button" data-item=${name}>remove 1 ${name}</button></span> <div>$${details.price} x ${details.quantity}</div> </div>
        
        `
        subTotal += details.price * details.quantity
    }
    
    // for (let lineBreaks = 0; lineBreaks < (restaurantData.itemsArray.length - cart.size); lineBreaks ++){
    //     cartHTML += `<br>`
    // }
    let lineBreaks = restaurant.itemsArray.length - cart.size
    // console.log(lineBreaks)
    for (let i = 0; i < lineBreaks; i++){
        cartHTML += `<div class="line-break-div"></div>`
    }
    cartHTML += `
    <hr>
    <div class="cart-total-details">
   <span> Total:</span><span>${subTotal}</span>
    </div>
    <div id="checkout-button-container">
    <button id="complete-order-button">Complete Order</button>
    </div>
    `
    cartContainer.innerHTML = cartHTML
}

switch (restaurantChoice) {
        case "burger":
            restaurant = restaurantData[0]
            // console.log(restaurant)
    }
    
    
outerContainer.addEventListener("click", (event) => {
    
   if (event.target.type === "submit") {
    // console.log('button clicked')
    // console.log(restaurant.itemsArray)
    
    // add selected item to cart array or increase quantity
    restaurant.itemsArray.filter((item) => {
        if (item.name === event.target.id) {
             
             if (cart.has(item.name)) {
                cart.set(item.name, {price: item.price, quantity: cart.get(item.name).quantity += 1})
                // console.log("item already in cart")
             } else {
                cart.set(item.name, {price: item.price, quantity: 1})
                // console.log(`${item.name} added to cart`)
             }
        
        }
    })
    if (event.target.classList.contains("cart-remove-button")) {
        const event = document.querySelector('.cart-remove-button')
        console.log("item removed")
        console.log(event.dataset.item)
        
    }
        renderCart()
    
   }
   
})   
render(restaurantChoice)