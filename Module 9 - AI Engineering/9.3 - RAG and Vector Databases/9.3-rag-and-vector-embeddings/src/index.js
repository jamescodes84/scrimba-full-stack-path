import { OPENAI_API_KEY } from "./apikeys";

console.log(OPENAI_API_KEY)

import OpenAI from "openai";
const openai = new OpenAI(
    {
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });



// console.log(embedding);
 
/*
  TODO: Challenge: Pair text with its embedding
    - For each text input, create an object with 
      a 'content' and 'embedding' property
    - The value of 'content' should be the text
    - The value of 'embedding' should be the vector embedding for that text
*/
async function getEmbedding(inputText) {
    let returnValues = {}
    const embeddingVector = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: "Your text string goes here",
            encoding_format: "float",
    
        })
        .then(vector => {
          returnValues = {
            content: inputText,
            embedding: vector
          }
        } )
}

console.log(getEmbedding("This is a test"))