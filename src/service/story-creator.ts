import axios from "axios";

class StoryCreator {
  private openAIUrl: string =
    "https://api.openai.com/v1/engines/davinci/completions";
  private apiKey: string = import.meta.env.OPEN_AI_API_KEY;

  public async createStory(
    age: number,
    characters: string[],
    values: string[],
    mainCharacterName?: string,
  ): Promise<any> {
    let prompt = `Create a short bedtime story for a ${age} year old child that features the following characters: ${characters.join(", ")}. The story should convey the following values: ${values.join(", ")}. `;
    if (mainCharacterName) {
      prompt += `The main character's name should be ${mainCharacterName}. `;
    }
    prompt +=
      "The tone of the story should be warm, engaging, and age-appropriate. The story should be around 300 words long and have a clear beginning, middle, and end with a simple yet meaningful lesson or moral. Please return the story in JSON format, with two keys: title & text.";

    try {
      const response = await this.sendRequestToOpenAI(prompt);
      return response.data;
    } catch (error) {
      console.error("Error creating story:", error);
      throw error;
    }
  }

  private async sendRequestToOpenAI(prompt: string): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };

    const data = {
      prompt: prompt,
      max_tokens: 300,
      n: 1,
      stop: null,
      temperature: 0.7,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      return_prompt: false,
      format: "json",
    };

    return axios.post(this.openAIUrl, data, { headers: headers });
  }
}

// Export the singleton instance
export const storyCreator = new StoryCreator();
