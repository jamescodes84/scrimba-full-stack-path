/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const lengthOutput = document.getElementById("length-output-div")
const volumeOutput = document.getElementById("volume-output-div")
const massOutput = document.getElementById("mass-output-div")
const volumeLeft = document.getElementById("volume-left")
const volumeRight = document.getElementById("volume-right")
const massLeft = document.getElementById("massLeft")
const massRight = document.getElementById("mass-right")
const numInput = document.getElementById("num-input")
const convertButton = document.getElementById("convert-btn")
let numberToConvert = 0
let units = {
    "feetToMeters" : "",
    "metersToFeet" : "",
    "litersToGallons" : "",
    "gallonsToLiters" : ""
}



convertButton.addEventListener("click", () => {
    numberToConvert = Number(numInput.value)
    
    convertUnits(numberToConvert)
    updateView()
})



/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/
function convertUnits(value){
    units.metersToFeet = (3.281 * value).toFixed(3)
    units.feetToMeters =(value / 3.281).toFixed(3)
    units.litersToGallons = (0.264 * (value)).toFixed(3)
    units.gallonsToLiters =(value / 0.264).toFixed(3)
    units.kilogramsToPounds = (2.204 * value).toFixed(3)
    units.poundsToKilograms = (value / 2.204).toFixed(3)
    
   
}

function updateView(value) {
 
  lengthOutput.innerHTML = ` ${numberToConvert} meters = ${units.metersToFeet} feet | ${numberToConvert} feet = ${units.feetToMeters} meters  ` 
  
  volumeOutput.innerHTML = ` ${numberToConvert} liters = ${units.litersToGallons} gallons | ${numberToConvert} gallons = ${units.gallonsToLiters} liters  ` 
  
  massOutput.innerHTML = ` ${numberToConvert} kilos = ${units.kilogramsToPounds} pounds | ${numberToConvert} pounds = ${units.poundsToKilograms} kilos  ` 
  
}
