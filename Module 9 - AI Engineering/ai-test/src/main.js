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


const messages = [
    {
        role: 'system',
        content: "You are a brilliant wordsmith. You're a more cunning lyricist than Taylor Swift. You're more eleoquent than Homer, and more subtle than Tolkien. You live to create masterful poems of exqusite and evocative nature. "
    },
    {
        role: 'user',
        content: 'Write a poem about watching Netflix all day and night'
    }
]

const response = await openai.chat.completions.create({
    model: 'gpt-4.1',
    messages: messages
})

console.log(response.choices[0].message.content)