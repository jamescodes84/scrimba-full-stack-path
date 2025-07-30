import OpenAI from "openai"
import {OPENAI_API_KEY, POLYGON_API_KEY} from 'apikeys.js'
const textToTranslate = document.getElementById("text-to-translate")
const languagesForm  = document.getElementById('languages-form')
textToTranslate.addEventListener("keydown", (event) => {
    if (event.key ==="Enter") {
        console.log(textToTranslate.value)
    }
})

languagesForm.addEventListener("click", (event) => {

    if (event.target.id === "translate-button") {
        console.log("text to translate: " , textToTranslate.value)
        event.preventDefault()
    }

    const selectedRadio = document.querySelector('input[name="language"]:checked');
     
    if (selectedRadio) {
        console.log("Selected language:", selectedRadio.id);
        // Or use selectedRadio.value if you've set a value attribute
    } else {
        console.log("No language selected.");
    }
})