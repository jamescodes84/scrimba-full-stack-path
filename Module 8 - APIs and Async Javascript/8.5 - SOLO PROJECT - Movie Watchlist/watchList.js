import { CONFIG } from "./api.js"

async function watchList(){
    

    // console.log("on watchlist page")

    //TODO: REWRITE LOOP TO RERUN BOTH QUERIES FOR EACH KEY IN LOCALSTORAGE
    
    let movies = {}
     console.log(localStorage.length)
    // console.log(localStorage.keys())
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let uniqueMovie = JSON.parse(localStorage.getItem(key));
        movies[key] = uniqueMovie
       
        
        let res = await fetch (`http://www.omdbapi.com/?apikey=${CONFIG.OMDB_API_KEY}&i=${uniqueMovie.imdbID}&type=movie&r=json&page=1` , {method: 'GET'})
        let movie = await res.json()
        //         microQueryMap.set(uniqueMovie, movie)
        //         console.log("Micro Result",movie)
        //         console.log(uniqueMoviesMap.get(movie.imdbID))
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
                                <span class="add-button" data-movie=${movie.imdbID}><img src="assets/icons/add.png" alt="add ${movie.Title} to watchlist" class="icon add-button" data-movie="${movie.imdbID}"/>Add to Watchlist</span>
                            </div>
                        
                            <div class="movie-plot">${movie.Plot}</div>
                        </div>
                    </div>
                    
                `
        
    }

}

watchList()
// re-run micro query based on 


// for (let uniqueMovie of  uniqueMovies) {
//             console.log("Unique Result:" , uniqueMovie)
//             let res = await fetch (`http://www.omdbapi.com/?apikey=${CONFIG.OMDB_API_KEY}&i=${uniqueMovie.imdbID}&type=movie&r=json&page=1` , {method: 'GET'})
//             let movie = await res.json()
//             microQueryMap.set(uniqueMovie, movie)
//             console.log("Micro Result",movie)
//             console.log(uniqueMoviesMap.get(movie.imdbID))
//             document.getElementById('output').innerHTML += 
//                     `
//                         <div class="movie-card"> 
//                             <div id="movie-poster-${movie.imdbID}">
//                              <img  class="movie-poster" src="${movie.Poster}">
//                             </div>
//                             <div class="movie-details"> 
//                                 <div class="movie-upper-container"> 
//                                     <span class="movie-title">${movie.Title}</span>
//                                     <span class="movie-year">${movie.Year}</span>
//                                     <span><span class="star-entity">&#9733</span> ${movie.imdbRating}</span>
//                                 </div>
//                                 <div class="movie-subheading-container">
//                                     <span class="movie-runtime">${movie.Runtime}</span>
//                                     <span class="movie-genres">${movie.Genre}</span>
//                                     <span class="add-button" data-movie=${movie.imdbID}><img src="assets/icons/add.png" alt="add ${movie.Title} to watchlist" class="icon add-button" data-movie="${movie.imdbID}"/>Add to Watchlist</span>
//                                 </div>
                               
//                                 <div class="movie-plot">${movie.Plot}</div>
//                             </div>
//                         </div>
                        
//                     `
//         }