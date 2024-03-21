import { OpenAI } from "openai";
import { environment } from "../utils/environment";

export const openai = new OpenAI({
  apiKey: environment.open_ai_api_key,
});
