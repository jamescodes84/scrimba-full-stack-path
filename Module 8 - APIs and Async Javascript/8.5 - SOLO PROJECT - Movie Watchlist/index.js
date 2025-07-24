// require('dotenv').config();
// const apiKey = import.meta.env.OMDB_API_KEY;
import { CONFIG } from "./api.js"
let outermostContainer = document.getElementById('outermost-container')
let watchListButton = document.getElementById('watchlist-button')
let searchText = document.getElementById('search-text')
let searchButton = document.getElementById('search-button')


outermostContainer.addEventListener("click", (event) => {

    if (event.target.id ==="watchlist-button") {
        console.log("watchlist button clicked")
    }

    if (event.target.id ==="search-button") {
        console.log("search button clicked")
        console.log(`${searchText.value}`)

        search(searchText.value)
    }
})

console.log(CONFIG.OMDB_API_KEY)
async function search() {
    let res = await fetch (`http://www.omdbapi.com/?apikey=${CONFIG.OMDB_API_KEY}&t=${searchText.value}&type=movie&r=json&plot=full` , {method: 'GET'})
    let data = await res.json()
    console.log(data)
    document.getElementById('test-output').innerHTML = 
    `<div class="output">Title: ${ data.Title}<br> Plot:${data.Plot}</div>`
}