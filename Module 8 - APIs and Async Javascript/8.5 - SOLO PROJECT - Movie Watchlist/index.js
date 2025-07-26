// require('dotenv').config();
// const apiKey = import.meta.env.OMDB_API_KEY;
import { CONFIG } from "./api.js"
let outermostContainer = document.getElementById('outermost-container')
let watchListButton = document.getElementById('watchlist-button')
let searchText = document.getElementById('search-text')
let searchButton = document.getElementById('search-button')
const uniqueMoviesMap = new Map();
const microQueryMap = new Map();
const watchList = new Map()

if (localStorage.getItem("watchList")) {
    console.log("there is a watchlist")
}
outermostContainer.addEventListener("click", (event) => {

    if (event.target.id ==="watchlist-button") {
        console.log("watchlist button clicked")
    }

    if (event.target.id ==="search-button") {
        console.log("search button clicked")
        console.log(`${searchText.value}`)

        search(searchText.value)
    }

    if (event.target.classList.contains('add-button')){

        
       
        let movieId = event.target.dataset.movie
        let uniqueMovie = uniqueMoviesMap.get(movieId)
       
        
        let microQueryMovie = microQueryMap.get(uniqueMovie)
        let shortMovieObjectString = JSON.stringify(uniqueMovie)
        let bigMovieObjectString = JSON.stringify(microQueryMovie)
        // console.log(movieString)
        // console.log(watchList.keys())
        localStorage.setItem(shortMovieObjectString, bigMovieObjectString)
         

        // document.getElementById("watchlist").innerHTML ="<p>test</p>" 

            // `
            //          <div class="movie-card"> 
            //                 <div id="movie-poster-${microQueryMovie.imdbID}">
            //                  <img  class="movie-poster" src="${microQueryMovie.Poster}">
            //                 </div>
            //                 <div class="movie-details"> 
            //                     <div class="movie-upper-container"> 
            //                         <span class="movie-title">${microQueryMovie.Title}</span>
            //                         <span class="movie-year">${microQueryMovie.Year}</span>
            //                         <span><span class="star-entity">&#9733</span> ${microQueryMovie.imdbRating}</span>
            //                     </div>
            //                     <div class="movie-subheading-container">
            //                         <span class="movie-runtime">${microQueryMovie.Runtime}</span>
            //                         <span class="movie-genres">${microQueryMovie.Genre}</span>
            //                         <span class="add-button" data-movie=${microQueryMovie.imdbID}><img src="assets/icons/add.png" alt="add ${microQueryMovie.Title} to watchlist" class="icon add-button" data-movie="${microQueryMovie.imdbID}"/>Add to Watchlist</span>
            //                     </div>
                               
            //                     <div class="movie-plot">${microQueryMovie.Plot}</div>
            //                 </div>
            //             </div>
            
            // `
        
    }
})


async function search() {
    document.getElementById('output').innerHTML ="" 
    // perform macro query
    let res = await fetch (`http://www.omdbapi.com/?apikey=${CONFIG.OMDB_API_KEY}&s=${searchText.value}&type=movie&r=json&page=1` , {method: 'GET'})
    let data = await res.json()
    //perform micro query to retrieve plots for each movie
    

    // sort the movies array by year
   
    
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
            console.log("Unique Result:" , uniqueMovie)
            let res = await fetch (`http://www.omdbapi.com/?apikey=${CONFIG.OMDB_API_KEY}&i=${uniqueMovie.imdbID}&type=movie&r=json&page=1` , {method: 'GET'})
            let movie = await res.json()
            microQueryMap.set(uniqueMovie, movie)
            console.log("Micro Result",movie)
            console.log(uniqueMoviesMap.get(movie.imdbID))
            document.getElementById('output').innerHTML += 
            `
                <div class="movie-card"> 
                    <div id="movie-poster-${movie.imdbID}">
                        <img  class="movie-poster" src="${movie.Poster}">
                    </div>
                    <div class="movie-details"> 
                        <div class="movie-upper-container"> 
                            <span class="movie-title">${movie.Title}</span>
                            <span class="movie-year">${movie.Year}</span>
                            <span><span class="star-entity">&#9733</span> ${movie.imdbRating}</span>
                        </div>
                        <div class="movie-subheading-container">
                            <span class="movie-runtime">${movie.Runtime}</span>
                            <span class="movie-genres">${movie.Genre}</span>
                            <span class="add-button" data-movie=${movie.imdbID}><img src="assets/icons/add.png" alt="add ${movie.Title} to watchlist" class="icon add-button" data-movie="${movie.imdbID}"/>Add to Watchlist</span>
                        </div>
                        
                        <div class="movie-plot">${movie.Plot}</div>
                    </div>
                </div>
                
            `
        }

    } else {
         document.getElementById('test-output').innerHTML =  `<br>Error: ${data.Error}`
    }
      
   
   
   
}