let homeScore = 0;
let guestScore = 0;


document.getElementById("home-score-div").innerText = homeScore
document.getElementById("guest-score-div").innerText = guestScore


function addOneHome() {
    homeScore += 1
    document.getElementById("home-score-div").innerText = homeScore
}

function addTwoHome() {
    homeScore += 2
    document.getElementById("home-score-div").innerText = homeScore
}

function addThreeHome() {
    homeScore += 3
    document.getElementById("home-score-div").innerText = homeScore
}

function addOneGuest() {
    guestScore += 1
    document.getElementById("guest-score-div").innerText = guestScore
}

function addTwoGuest() {
    guestScore += 2
    document.getElementById("guest-score-div").innerText = guestScore
}

function addThreeGuest() {
    guestScore += 3
    document.getElementById("guest-score-div").innerText = guestScore
}