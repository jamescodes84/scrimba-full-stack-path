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


async function search() {
    document.getElementById('test-output').innerHTML ="" 
    // perform macro query
    let res = await fetch (`http://www.omdbapi.com/?apikey=${CONFIG.OMDB_API_KEY}&s=${searchText.value}&type=movie&r=json&page=1` , {method: 'GET'})
    let data = await res.json()
    //perform micro query to retrieve plots for each movie
    

    // sort the movies array by year
   
    const uniqueMoviesMap = new Map();
    let uniqueMovies = null
    // console.log(movies)
    // console.log(data[0])
    if (!data.Error){
        if (Array.isArray(data.Search)) {
            // Step 1: Remove duplicates
            
            for (let movie of data.Search) {
                // Use imdbID as a unique identifier (recommended)
                if (!uniqueMoviesMap.has(movie.imdbID)) {
                    uniqueMoviesMap.set(movie.imdbID, movie);
                }
            }

            // Step 2: Convert map back to array
            uniqueMovies = Array.from(uniqueMoviesMap.values());

            // Step 3: Sort by year
            uniqueMovies.sort((a, b) =>  parseInt(b.Year) - parseInt(a.Year));

        }
        

        for (let uniqueMovie of  uniqueMovies) {
            console.log("Unique Result:" , uniqueMovie.imdbID)
            let res = await fetch (`http://www.omdbapi.com/?apikey=${CONFIG.OMDB_API_KEY}&i=${uniqueMovie.imdbID}&type=movie&r=json&page=1` , {method: 'GET'})
            let movie = await res.json()
            console.log("Micro Result",movie)
            document.getElementById('test-output').innerHTML += 
                    `
                        <div class="output">   
                                                Title: ${ movie.Title}<br>
                                                Year: ${movie.Year}<br>
                                                Plot: ${movie.Plot}
                        </div>
                        <br>
                    `
        }

    } else {
         document.getElementById('test-output').innerHTML =  `Error: ${data.Error}`
    }
      
   
   
   
}