import { openai, supabase } from './config.js';
// import data from 'content.js'
import {movies} from './content.js'


const letsGoButton = document.getElementById('lets-go-button')
const favoriteMovieInput = document.getElementById('favorite-movie')
const newOrOldInput = document.getElementById('new-or-old')
const funnyOrSeriousInput = document.getElementById('funny-or-serious')


letsGoButton.addEventListener('click', (event) => {
    event.preventDefault()
    const favoriteMovie = favoriteMovieInput.value
    const funnyOrSerious = funnyOrSeriousInput.value
    const newOrOld = newOrOldInput.value

    const inputJSON = {
            favoriteMovie: favoriteMovie,
            funnyOrSerious: funnyOrSerious,
            newOrOld: newOrOld
        }
    console.log(inputJSON)
})

// https://supabase.com/blog/openai-embeddings-postgres-vector

async function getEmbedding(data) {
  const embeddings = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: data,
  });
  
  const dataObjects = embeddings.data.map(embeddingObject => {
    return {
      content: data,
      embedding: embeddingObject.embedding
    }
  })
  
  return dataObjects[0]
}

// don't run this query again
// movies.map(movie => {
//     getEmbedding(movie.content).then(data => insertData(data))
// })




async function insertData(data) {
  await supabase.from('movies').insert(data)
  console.log('Embedding and storing complete')

}



async function runQuery(query) {
  const dataObject = await getEmbedding(query)
  
  const { data:queryResult , error} = await supabase.rpc('match_documents', {
  query_embedding: dataObject.embedding,
  match_threshold: 0.5,
  match_count: 1
})
  
return queryResult
 
}

