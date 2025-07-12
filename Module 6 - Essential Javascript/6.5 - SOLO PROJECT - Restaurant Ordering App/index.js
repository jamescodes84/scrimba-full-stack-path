import { restaurantData } from './data.js'

let restaurantChoice = "burger"
let outerContainer = document.getElementById("outer-container")
let restaurant = {}
const headerContainer = document.getElementById("header-container")
const cartContainer = document.getElementById("cart-container")


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

switch (restaurantChoice) {
        case "burger":
            restaurant = restaurantData[0]
            // console.log(restaurant)
    }
    
    
outerContainer.addEventListener("click", (event) => {
    
   if (event.target.type === "submit") {
    // console.log('button clicked')
    // console.log(restaurant.itemsArray)
    
    restaurant.itemsArray.filter((item) => {
        if (item.name === event.target.id) {
             cartContainer.innerHTML += `
                ${event.target.id} button clicked<br>
             `
            
        }
    })
    
   }
   
})   
render(restaurantChoice)