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
let query = "Jammin in the Big Easy is a good song"
// getEmbedding(query).then(data => {

// })

async function runQuery(query) {
  const dataObject = await getEmbedding(query)
  // console.log(queryEmbedding)
  console.log(dataObject)
  
  const { data:queryResult , error} = await supabase.rpc('match_documents', {
  query_embedding: dataObject.embedding,
  match_threshold: 0.5,
  match_count: 1
})
  console.log(queryResult)
  

 
}




runQuery(query)