import { openai, supabase } from './config.js';
// import data from 'content.js'
import {movies} from './content.js'

const letsGoButton = document.getElementById('lets-go-button')
const favoriteMovieInput = document.getElementById('favorite-movie')
const newOrOldInput = document.getElementById('new-or-old')
const funnyOrSeriousInput = document.getElementById('funny-or-serious')


// document.getElementById('content-container').innerHTML =
// `
// <div id="movie-suggestion">
//     <div>
//     Based on your love for Star Wars and your preference for something newer and funny, I would recommend "Everything Everywhere All at Once." 
//     This film is an action-packed adventure comedy that was released in 2022. It's directed by Daniel Kwan and Daniel Scheinert, the same duo 
//     behind the unique and quirky film "Swiss Army Man." "Everything Everywhere All at Once" stars Michelle Yeoh, who you may know from "Crouching 
//     Tiger, Hidden Dragon" or "Crazy Rich Asians." She plays a middle-aged Chinese immigrant who embarks on an insane adventure where she alone 
//     can save existence by exploring other universes and connecting with the lives she could have led. It's a wild ride with lots of humor, but 
//     also some deep themes about identity and the choices we make in life. Plus, if you're a Star Wars fan, you'll probably enjoy the multi-universe 
//     aspect of the story. It's rated 7.8 on IMDB, which is pretty solid.
//     </div>
// </div>
// `

letsGoButton.addEventListener('click', async (event) => {
    event.preventDefault()
    const favoriteMovie = favoriteMovieInput.value
    const funnyOrSerious = funnyOrSeriousInput.value
    const newOrOld = newOrOldInput.value

    const inputJSON = {
            favoriteMovie: favoriteMovie,
            mood: funnyOrSerious,
            genre: newOrOld
        }
    let movieSuggestion = await rag(inputJSON)
    document.getElementById('content-container').innerHTML = `<div id="movie-suggestion">${movieSuggestion}</div>`
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

                Your main job is to formulate a movie recommendation based on provided context. 
                Your output will be JSON in the following format:
                {
                    "title": MOVIE TITLE GOES HERE,
                    "year": YEAR GOES HERE
                    "suggestion": SUGGESTION TEXT GOES HERE
                }
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
  return response.choices[0].message.content
  
}

let favoriteMovie = "My favorite Movie is The Fast and the Furious I love watching the scene where Toretto runs from the cops"
let mood = "I want movies that were released after 2000s"
let genre = "I want to watch something silly and quotable"


async function rag(userInput) {
    let {favoriteMovie , mood , genre } = userInput
    let queryString = "1) " + favoriteMovie + " 2) " + mood + " 3) " + genre
    let movieResult =  await semanticSearch(queryString)
    let responseFromAI = getChatCompletion(queryString, movieResult[0].content)
    return responseFromAI
}

