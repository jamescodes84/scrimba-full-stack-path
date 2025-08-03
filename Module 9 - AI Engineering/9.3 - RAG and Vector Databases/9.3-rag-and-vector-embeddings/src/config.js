import OpenAI from 'openai';

import { OPENAI_API_KEY } from './apikeys';
/** Ensure the OpenAI API key is available and correctly configured */
if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing or invalid.");
}

/** OpenAI! config */
export default new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});