import openai from './config.js';

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

async function main() {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: content,
  });
  // embedding.data.map(dataElemet =>console.log(dataE , content))
  console.log(embedding)
  const dataObjects = embedding.data.map(embeddingObject => {
    return {
      content: content[embeddingObject.index],
      embedding: embeddingObject.embedding
    }
  })
  console.log(dataObjects)
}


main();
// console.log(dataObjects)