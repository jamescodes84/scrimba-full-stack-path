import { OPENAI_API_KEY } from "./apikeys";

console.log(OPENAI_API_KEY)

import OpenAI from "openai";
const openai = new OpenAI(
    {
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });

const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: "Your text string goes here",
  encoding_format: "float",
  
});

console.log(embedding);