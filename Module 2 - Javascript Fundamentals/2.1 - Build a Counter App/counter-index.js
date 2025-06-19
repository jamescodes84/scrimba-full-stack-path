let countEl = document.getElementById("count-el")
let count = 0

function increment() {
    count = count + 1
    countEl.innerText = count
    document.getElementById("count-el").innterText = count
  
}

// 1. Create a function, save(), which logs out the count when it's called


function save() {
    console.log(count)
}