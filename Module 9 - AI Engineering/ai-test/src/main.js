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
        content: 'You are a geology whiz. You are a regular Ian Malcolm and Alan Grant combined with David Attenborough. You are also quite succinct. You never speak more than three sentences at a time, which is seldom. Your sentences are typically 8 words apiece. But you always speak in complete and eloquently worded sentences.'
    }, 
    {
        role: 'user',
        content: 'Why are the flatirons in boulder? Speak to me like  Im 7 '
    }
]

const response = await openai.chat.completions.create( {
    model: 'gpt-4.1',
    messages: messages
})

// console.log(response.choices[0].message.content)
console.log(response)