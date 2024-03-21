import type { APIRoute } from "astro";
import { storyCreator } from "../../../service/story-creator";

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const data = await request.formData();

  const age = Number(data.get("age") as string);
  const characters = data.getAll("characters") as string[];
  const values = data.getAll("values") as string[];
  const mainCharacterName = data.get("name") as string | undefined;

  const story = await storyCreator.getNewStory(locals.user.id, {
    age,
    characters,
    values,
    mainCharacterName,
  });

  return redirect("/story/" + story.id);
};
