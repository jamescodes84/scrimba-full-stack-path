document.getElementById("app").innerHTML = "<p>Test</p>"
import { OPENAI_API_KEY } from '../../9.1 - AI Engineering Fundamentals/9-1apikey'
// console.log("test")

// let api import.meta.env.VITE_POLYGON_API_KEY );
// console.log( OPENAI_API_KEY )
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, 
    dangerouslyAllowBrowser: true
})
