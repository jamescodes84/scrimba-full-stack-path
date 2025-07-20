// Link to Figma File for project https://www.figma.com/design/twasy8Bca4hW7gunLFSLoY/Color-Scheme-Generator?node-id=2-1155


const body = document.getElementById('body')
const colorPickerInput = document.getElementById('color-picker-input')
const schemaDropdown = document.getElementById("schema-dropdown")
const schemaButton = document.getElementById('schema-button')
let hex = colorPickerInput.value
let mode = schemaDropdown.value

let colorsArray = []
colorPickerInput.addEventListener('input', () => {
    console.log("Selected Color:", colorPickerInput.value)
    hex = colorPickerInput.value
})

schemaDropdown.addEventListener('change', () => {
    console.log("Selected Theme:", schemaDropdown.value)
    mode = schemaDropdown.value
})

body.addEventListener('click', (event) => {
    
    if (event.target.id === "schema-button") {
        // console.log("schema button clicked")
        setColors()
    }
    
    if (event.target.classList.contains('color-container')) {
        console.log(`${event.target.id} clicked`)
       
    }

})



function setColors () {
    console.log("setColors()")
    
    console.log("calling api with", hex, mode)
    colorsArray = []
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex.slice(1)}&mode=${mode}&count=5000`, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            

            // change this logic to run once for each color and pick a random color from the array
            for (let i = 0; i < 5; i++) {
                let randomIndex = Math.floor(Math.random() * 5000)
                colorsArray.push(data.colors[randomIndex].hex.clean)
                //generate a random index, push that index color to the array
            }
            updateView()
        })


   
}

function updateView() {
   
     
    let colorIndex = 1
    for (let color of colorsArray) {
        // console.log(color)
        let hexColor = `#${color}`
        document.getElementById(`color-${colorIndex}`).style.backgroundColor = hexColor
        document.getElementById(`color-${colorIndex}-value`).innerHTML = `<p>${hexColor}</p>`
        colorIndex++
    }
  
}
setColors()