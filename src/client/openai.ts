import { OpenAI } from "openai";

export const openai = new OpenAI({
  apiKey: import.meta.env.DEV
    ? import.meta.env.OPEN_AI_API_KEY
    : process.env.OPEN_AI_API_KEY,
});
