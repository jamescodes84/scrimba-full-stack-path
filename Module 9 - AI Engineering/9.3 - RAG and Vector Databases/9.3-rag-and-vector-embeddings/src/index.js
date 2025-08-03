import { SUPABASE_API_KEY } from './apikeys.js';
import {openai , supabase } from './config.js';

const content = [
  "Beyond Mars: speculating life on distant planets.",
  "Jazz under stars: a night in New Orleans' music scene.",
  "Mysteries of the deep: exploring uncharted ocean caves.",
  "Rediscovering lost melodies: the rebirth of vinyl culture.",
  "Tales from the tech frontier: decoding AI ethics.",
]; 

/*
  Challenge: Pair text with its embedding
    - For each text input, create an object with 
      a 'content' and 'embedding' property
    - The value of 'content' should be the text
    - The value of 'embedding' should be the vector embedding for that text
*/

async function getEmbedding(data) {
  const embeddings = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: data,
  });
  // embedding.data.map(dataElemet =>console.log(dataE , content))
  // console.log(embeddings)
  const dataObjects = embeddings.data.map(embeddingObject => {
    return {
      content: data,
      embedding: embeddingObject.embedding
    }
  })
  // console.log(dataObjects)
  return dataObjects[0]
}


// main();
// console.log(dataObjects)

async function insertData(data) {
  await supabase.from('documents').insert(data)
  console.log('Embedding and storing complete')

}

// DO NOT RUN THIS QUERY AGAIN
// getEmbeddings().then(data => insertData(data))
// getEmbedding(query).then(data => {

// })

async function runQuery(query) {
  const dataObject = await getEmbedding(query)
  
  const { data:queryResult , error} = await supabase.rpc('match_documents', {
  query_embedding: dataObject.embedding,
  match_threshold: 0.5,
  match_count: 1
})
  console.log(queryResult)
  
return queryResult
 
}








// Use OpenAI to make the response conversational
const chatMessages = [{
    role: 'system',
    content: `You are an enthusiastic podcast expert who loves recommending podcasts to people. You will be given two pieces of information - some context about podcasts episodes and a question. Your main job is to formulate a short answer to the question using the provided context. Please do not make up the answer.Do not refuse to answer.` 
}];

async function getChatCompletion(text, query) {
  console.log(text)
  chatMessages.push({
    role: 'user',
    content: `Context: ${text} Question: ${query}`
  });
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: chatMessages,
    temperature: 0.0,
    frequency_penalty: 0.0
  });
  console.log(response)
  console.log(response.choices[0].message.content);
}

let query = "silence"
let queryResult = await runQuery(query).then(result => {
  getChatCompletion(result, query)
}
)

