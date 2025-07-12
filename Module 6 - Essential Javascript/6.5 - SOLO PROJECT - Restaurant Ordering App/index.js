import { menuArray, restaurantData} from './data.js'

let restaurant = "burger"
const headerContainer = document.getElementById("header-container")

function render(restaurant) {
    console.log("header rendering")
    switch (restaurant) {
        case "burger":
            let restaurant = restaurantData[0]
            
            headerContainer.style.backgroundImage = `url("./assets/${restaurant.image}")`
            
            headerContainer.innerHTML = `
            <h1 id="header-h1">${restaurant.headline}</h1>
            <h2 id="header-h2">${restaurant.subText}</h2>
            `
            
    }
    console.log("header rendered")
    
}

render(restaurant)