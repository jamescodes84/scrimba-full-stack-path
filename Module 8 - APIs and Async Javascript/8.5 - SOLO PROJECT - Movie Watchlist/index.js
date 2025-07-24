// require('dotenv').config();
const apiKey = import.meta.env.OMDB_API_KEY;
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
console.log(OMDB_API_KEY)
async function search() {
    // let res = await fetch (`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&` , {method: 'GET'})
}