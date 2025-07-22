/**
 Challenge: Add a button that, when clicked, gets a new deck of cards from the deckofcards API
 
 URL: https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
 
 Log the whole response to the console
 */

const getCardButton = document.getElementById('get-card-button')


getCardButton.addEventListener("click", () => {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", {method:'GET'})
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
})