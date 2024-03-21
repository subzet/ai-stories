//import axios from "axios";
// import { openai } from "../client/openai";
// import { claudeApi } from "../client/claude";
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
    let prompt = `Create a short bedtime story for a ${params.age} year old child that features the following characters: ${params.characters.join(", ")}. The story should convey the following values: ${params.values.join(", ")}. `;
    if (params.mainCharacterName) {
      prompt += `The main character's name should be ${params.mainCharacterName}. `;
    }
    prompt +=
      "The tone of the story should be warm, engaging, and age-appropriate. The story should be around 300 words long and have a clear beginning, middle, and end with a simple yet meaningful lesson or moral. Please return the story in JSON format, with two keys: title & text.";

    try {
      // const response = await openai.chat.completions.create({
      //   messages: [
      //     {
      //       role: "system",
      //       content: "You are a helpful assistant designed to output JSON.",
      //     },
      //     { role: "user", content: prompt },
      //   ],
      //   model: "gpt-3.5-turbo",
      //   response_format: { type: "json_object" },
      // });

      // const response = await claudeApi.createMessage({
      //   model: "claude-3-opus-20240229",
      //   max_tokens: 300,
      //   messages: [
      //     {
      //       role: "user",
      //       content: prompt,
      //     },
      //   ],
      // });

      return {
        title: "The Magical Adventure",
        text: [
          "Once upon a time, in a kingdom where the sun always shone a bit brighter, there lived a young prince named Sam. Sam had a heart as big as the castle and a spirit as brave as the knights who protected it. One day, King Dad announced a quest: to find the Great Dragon that lived in the forest and ask it to share its wisdom. Princess Sibling, Sam's adventurous sister, wanted to come too.\n",
          'As they ventured into the forest, they found the Great Dragon looking sad. "Why are you sad?" asked Sam with a gentle voice. The dragon explained that people feared him because he was different, and he felt very lonely. Sam, showing great courage, approached the dragon and said, "We\'re here to be your friends. Everyone is unique, and that\'s what makes the world so interesting!"\n',
          "Princess Sibling, initially hesitant, saw Sam's honesty and bravery and decided to join in. They spent the day talking and laughing, learning about each other's worlds. The dragon shared tales of ancient magic, and in return, Sam and the princess told him about life in the kingdom.\n",
          "When it was time to return home, the dragon gifted Sam a small, shimmering scale as a token of their newfound friendship. King Dad was amazed by their courage and honesty. Sam explained, \"We learned that being different isn't scary. It's an opportunity to learn and grow. We should all be tolerant and kind to everyone we meet.\"\n",
          "The kingdom celebrated their return with a grand feast, and from that day on, the Great Dragon was no longer feared but revered as a wise and gentle friend. Sam and Princess Sibling became heroes, not for slaying a dragon, but for bridging two worlds with courage, honesty, and tolerance.\n",
          "And so, the kingdom grew kinder, teaching generations that true bravery comes from understanding and accepting others, no matter how different they may seem.",
          "Once upon a time, in a kingdom where the sun always shone a bit brighter, there lived a young prince named Sam. Sam had a heart as big as the castle and a spirit as brave as the knights who protected it. One day, King Dad announced a quest: to find the Great Dragon that lived in the forest and ask it to share its wisdom. Princess Sibling, Sam's adventurous sister, wanted to come too.\n",
          'As they ventured into the forest, they found the Great Dragon looking sad. "Why are you sad?" asked Sam with a gentle voice. The dragon explained that people feared him because he was different, and he felt very lonely. Sam, showing great courage, approached the dragon and said, "We\'re here to be your friends. Everyone is unique, and that\'s what makes the world so interesting!"\n',
          "Princess Sibling, initially hesitant, saw Sam's honesty and bravery and decided to join in. They spent the day talking and laughing, learning about each other's worlds. The dragon shared tales of ancient magic, and in return, Sam and the princess told him about life in the kingdom.\n",
          "When it was time to return home, the dragon gifted Sam a small, shimmering scale as a token of their newfound friendship. King Dad was amazed by their courage and honesty. Sam explained, \"We learned that being different isn't scary. It's an opportunity to learn and grow. We should all be tolerant and kind to everyone we meet.\"\n",
          "The kingdom celebrated their return with a grand feast, and from that day on, the Great Dragon was no longer feared but revered as a wise and gentle friend. Sam and Princess Sibling became heroes, not for slaying a dragon, but for bridging two worlds with courage, honesty, and tolerance.\n",
          "And so, the kingdom grew kinder, teaching generations that true bravery comes from understanding and accepting others, no matter how different they may seem.",
        ].join("\n"),
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
