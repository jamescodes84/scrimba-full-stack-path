import { restaurantData } from './data.js'


const outerContainer = document.getElementById("outer-container")
const headerContainer = document.getElementById("header-container")
const cartContainer = document.getElementById("cart-container")
const paymentModal = document.getElementById("payment-modal-div")
let restaurantChoice = "burger"
let restaurant = {}

let cart = new Map()

function initialRender() {
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
    let zeroQuantItemCount = 0
    //check if cart is empty
     for ( const [name , details] of cart) {
        if (cart.get(name).quantity === 0) {
            zeroQuantItemCount += 1
        }
    }
    if (zeroQuantItemCount === cart.size) {
        cartContainer.innerHTML = ``
        return
    }
    let subTotal = 0
    let cartHTML = `<div id="cart-h1-container"><h1 id="cart-h1">Your Order</h1></div>`
    
    for ( const [name , details] of cart) {
        // console.log(name, details)
       if (cart.get(name).quantity > 0){
        cartHTML += `
        
        <div class="cart-item-details"><span class="cart-remove-span font-size-28">
            ${name}
            <button class="cart-remove-button" id="${name}-remove-button" data-item=${name}>remove 1 ${name}</button></span> <div>$${details.price} x ${details.quantity}</div></div>
        
        `
        subTotal += details.price * details.quantity
       }
    }
    
   
    let lineBreaks = restaurant.itemsArray.length - cart.size

    for (let i = 0; i < lineBreaks; i++){
        cartHTML += `<div class="line-break-div"></div>`
    }
    cartHTML += `
    <hr>
    <div class="cart-total-details ">
   <span class="font-size-28"> Total:</span><span class="font-size-20">$${subTotal}</span>
    </div>
    <div id="checkout-button-container">
    <button id="complete-order-button" class="complete-order-button">Complete Order</button>
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
    
    
    // add selected item to cart array or increase quantity
    restaurant.itemsArray.filter((item) => {
       
        if (item.name === event.target.id) {
            
             if (cart.has(item.name)) {
               cart.set(item.name, {price: item.price, quantity: cart.get(item.name).quantity += 1})
           } else {
               cart.set(item.name, {price: item.price, quantity: 1})
                
             }
        
         }
     })
     
    if (event.target.classList.contains("cart-remove-button")) {
        let itemToRemove = cart.get(event.target.dataset.item)
        let quantity = itemToRemove.quantity
        
        if (quantity > 0) {
            let newCartValue = {...itemToRemove, quantity: itemToRemove.quantity -=1}
            cart.delete(itemToRemove)
             for ( const [name , details] of cart) {
                console.log(name, cart.get(name))
            }
          //  cart.set(itemToRemove, newCartValue)
            
            
        } 
    
    }
    
     if (event.target.classList.contains("complete-order-button")) {
        console.log("checkout button")
        paymentModal.classList.remove("modal-hidden")
     }   
    
    
        renderCart()
    
   }
   
})   

initialRender(restaurantChoice)