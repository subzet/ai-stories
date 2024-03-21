import { openai } from "../client/openai";
import { userService } from "./user";
import { database } from "../utils/db";
import { story, type Story } from "../model/story";
import { and, eq, isNull } from "drizzle-orm";

interface CreateStoryParameters {
  age: number;
  characters: string[];
  values: string[];
  mainCharacterName?: string;
}

interface StoryResponse {
  title: string;
  text: string;
}

class StoryCreator {
  private async createStory(
    params: CreateStoryParameters,
  ): Promise<StoryResponse> {
    let prompt = `Crea un cuento corto para dormir para un niño de ${params.age} años que incluya los siguientes personajes: ${params.characters.join(", ")}. El cuento debe transmitir los siguientes valores: ${params.values.join(", ")}. `;
    if (params.mainCharacterName) {
      prompt += `El nombre del personaje principal debe ser ${params.mainCharacterName}. `;
    }
    try {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that is writing a story for a kid to sleep in spanish. The story should be warm, engaging, and age-appropriate. The story should be around 600 words long and have a clear beginning, middle, and end, with a simple but meaningful lesson or moral. Please format the story in one or more readable paragraphs, separated by line breaks. The response format should be a JSON object with two fields: title and text. Title is a string and text is an array of strings. The title should be the title of the story, and the text should be the paragraphs of the story. The story should be written in the past tense. The story should be written in Spanish.",
          },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });

      if (!response.choices[0].message.content) {
        throw new Error("No content found in response");
      }

      const story = JSON.parse(response.choices[0].message.content);

      return {
        title: story.title,
        text: story.text.join("\n"),
      };
    } catch (error) {
      throw error;
    }
  }

  public async getNewStory(
    userId: string,
    params: CreateStoryParameters,
  ): Promise<Story> {
    const [createdStory, user] = await Promise.all([
      this.createStory(params),
      userService.findById(userId),
    ]);

    if (!user) {
      throw new Error("User not found");
    }

    return database
      .insert(story)
      .values({
        title: createdStory.title,
        content: createdStory.text,
        authorId: user.id,
        parameters: JSON.stringify(params),
      })
      .returning()
      .get();
  }

  public async getAllStories(userId: string): Promise<Story[]> {
    return database.query.story.findMany({
      where: and(eq(story.authorId, userId), isNull(story.deletedAt)),
    });
  }

  public async getStoryById(storyId: string): Promise<Story> {
    const foundStory = await database.query.story.findFirst({
      where: and(eq(story.id, storyId), isNull(story.deletedAt)),
    });

    if (!foundStory) {
      throw new Error("Story not found");
    }

    return foundStory;
  }
}

export const storyCreator = new StoryCreator();
