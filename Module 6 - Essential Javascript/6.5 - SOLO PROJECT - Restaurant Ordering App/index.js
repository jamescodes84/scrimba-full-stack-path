import { restaurantData } from './data.js'


const outerContainer = document.getElementById("outer-container")
const headerContainer = document.getElementById("header-container")
const cartContainer = document.getElementById("cart-container")

let restaurantChoice = "burger"
let restaurant = {}

let cart = new Map()

function render() {
   renderHeader()
   renderItems()  
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

function renderItems() {
  
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
        console.log(name, details)
        cartHTML += `
        
        <div class="cart-item-name">${name} $${details.price} x ${details.quantity} </div>
        
        `
        subTotal += details.price * details.quantity
    }
    cartHTML += `
    <hr>
    Total: ${subTotal}`
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
                console.log("item already in cart")
             } else {
                cart.set(item.name, {price: item.price, quantity: 1})
                console.log(`${item.name} added to cart`)
             }
        
        }
    })
        renderCart()
   }
   
})   
render(restaurantChoice)