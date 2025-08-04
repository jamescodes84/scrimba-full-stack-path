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


async function semanticSearch(query) {
  const dataObject = await getEmbedding(query)
  
  const { data:queryResult , error} = await supabase.rpc('match_movies', {
  query_embedding: dataObject.embedding,
  match_threshold: 0.5,
  match_count: 1
})

return queryResult
 
}

const chatMessages = [{
    role: 'system',
    content: `You are a relentless movie buff who knows everything there is to know about film.
               You love telling your friends and family about the best movies they should watch based on what they tell you they like.
                The user will be providing you with the answers to the following three questions: 
                1) What's your favorite movie and why? 
                2) Are you in the mood for something new or a classic?
                3) Do you want to watch something more funny or more serious?

                The answers will be numbered accordingly. You will also be provided with a recommended movie.

    //          Your main job is to formulate a movie recommendation based on provided context. 
               You never lie to somebody about a movie, if you don't have good information on a movie, politely ask for more context .`

    // content:   `You are an enthusiastic podcast expert who loves recommending podcasts to people. 
    //             You will be given two pieces of information - some context about podcasts episodes and a question. 
    //             Your main job is to formulate a short answer to the question using the provided context. Please do not make up the answer.
    //             Do not refuse to answer.` 
}];

async function getChatCompletion(query, context) {

//   console.log(text[0])

  chatMessages.push({
    role: 'user',
    content: `Context: ${context} Question: ${query}`
  });
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: chatMessages,
    temperature: 0.3,
    frequency_penalty: 0.3
  });

  console.log(response)
  console.log(response.choices[0].message.content);
}

let favoriteMovie = "My favorite Movie is The Fast and the Furious I love watching the scene where Toretto runs from the cops"
let mood = "I want movies that were released after 2000s"
let genre = "I want to watch something silly and quotable"

let queryString = "1) " + favoriteMovie + " 2) " + mood + " 3) " + genre
console.log(queryString)
let movieResult =  await semanticSearch(queryString)

getChatCompletion(queryString, movieResult[0].content)