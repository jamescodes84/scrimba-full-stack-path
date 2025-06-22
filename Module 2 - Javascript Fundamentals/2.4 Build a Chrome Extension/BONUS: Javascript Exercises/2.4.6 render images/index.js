// Create a function that renders the three team images
// Use a for loop, template strings (``), plus equals (+=)
// .innerHTML to solve the challenge.

const imgs = [
    "images/hip1.jpg",
    "images/hip2.jpg",
    "images/hip3.jpg"
]

container = document.getElementById("container")
let imageList = ""
for (let i = 0; i < imgs.length; i++){
   
    imageList += `<img class = "team-img" src="${imgs[i]}" />`
}
console.log(imageList)
container.innerHTML = imageList