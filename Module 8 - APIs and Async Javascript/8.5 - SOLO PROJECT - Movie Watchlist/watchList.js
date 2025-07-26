import { CONFIG } from "./api.js"

let movies = new Map()
let keysArray = []
async function watchList(){
    
    
    //  console.log(localStorage.length)
    // console.log(localStorage.keys())
    for (let i = 0; i < localStorage.length; i++) {

        let key = JSON.parse(localStorage.key(i)).imdbID
        keysArray.push(JSON.parse(localStorage.key(i)))
        console.log(key)
        let uniqueMovie = JSON.parse(localStorage.getItem(localStorage.key(i)));
        movies[key] = uniqueMovie
       
        let movie = uniqueMovie
      
        document.getElementById('watchlist').innerHTML += 
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
                                <span class="remove-button" data-movie=${movie.imdbID}><img src="assets/icons/minus.png" alt="remove ${movie.Title} from watchlist" class="icon remove-button" data-movie="${movie.imdbID}"/>Remove from Watchlist</span>
                            </div>
                        
                            <div class="movie-plot">${movie.Plot}</div>
                        </div>
                    </div>
                    
                `
        
    }

}

watchList()

document.getElementById("outermost-container").addEventListener("click" , (event) => {
     if (event.target.classList.contains('remove-button')){
        let removedMovieId = event.target.dataset.movie
        for (let key of keysArray){
            console.log(key)
            if (key.imdbID === removedMovieId) {
                localStorage.removeItem(JSON.stringify(key))
            }
        }
       
        // console.log("remove button clicked: ", event.target)
        // console.log(movies.keys())
        // clear watchlist html so it can be rebuilt
        document.getElementById('watchlist').innerHTML =""
       
        let movieObjectToRemove = movies[removedMovieId]
        // console.log("movie to remove",JSON.stringify(movies[removedMovieId]))
       
        localStorage.removeItem(movies[removedMovieId])
        
        watchList()
    }
})