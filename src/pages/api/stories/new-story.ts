import type { APIRoute } from "astro";
import { app } from "../../../utils/firebase/server";
import { getAuth } from "firebase-admin/auth";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  const idToken = cookies.get("session");

  if (!idToken) {
    return new Response(
      "No token provided",
      { status: 401 }
    );
  }

  try {
    await auth.verifyIdToken(idToken.value);
  } catch (error) {
    return new Response(
      "Invalid token",
      { status: 401 }
    );
  }

  


  return redirect("/");
};