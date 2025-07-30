import OpenAI from "openai"
import { OPENAI_API_KEY, POLYGON_API_KEY } from "./apikeys2"
const textToTranslate = document.getElementById("text-to-translate")
const languagesForm  = document.getElementById('languages-form')

textToTranslate.addEventListener("keydown", (event) => {
    if (event.key ==="Enter") {
        console.log(textToTranslate.value)
    }
})

languagesForm.addEventListener("click", (event) => {
    const selectedLanguage = document.querySelector('input[name="language"]:checked');
    if (event.target.id === "translate-button") {
        console.log("text to translate: " , textToTranslate.value)
        event.preventDefault()
        translate(textToTranslate.value , selectedLanguage.value)
    }

    
     
    
})

async function translate(text , language){
     const openai = new OpenAI({
        apiKey: OPENAI_API_KEY, 
        dangerouslyAllowBrowser: true
    })


    const messages = [
        {
            role: 'system',
            content: `You are an absolute expert in translating English into ${language}. You are masterful at the subtleties involved in evoking similar ideas when translating, and you keep aligned with cultural concerns with respect to dialect, syntax, etymology, etc.`
        }, 
        {
            role: 'user',
            content: `${textToTranslate.value}`
        }
    ]
    console.log(messages)
    const response = await openai.chat.completions.create( {
        model: 'gpt-4.1',
        messages: messages,
        temperature: 1

    })

   let translation = response.choices[0].message.content
    console.log(translation)
    // renderReport(report)
}