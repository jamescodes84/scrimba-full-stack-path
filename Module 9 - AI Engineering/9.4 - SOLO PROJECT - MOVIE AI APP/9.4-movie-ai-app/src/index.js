import { openai, supabase } from './config.js';

const letsGoButton = document.getElementById('lets-go-button')
const favoriteMovieInput = document.getElementById('favorite-movie')
const newOrOldInput = document.getElementById('new-or-old')
const funnyOrSeriousInput = document.getElementById('funny-or-serious')
letsGoButton.addEventListener('click', (event) => {
    event.preventDefault()
    const favMovie = favoriteMovieInput.value
    const funnyOrSerious = funnyOrSeriousInput.value
    const newOrOld = newOrOldInput.value

    const inputJSON = 
    {
        favMovie: favMovie,
        funnyOrSerious: funnyOrSerious,
        newOrOld: newOrOld
    }
    console.log(inputJSON)
})