import type { APIRoute } from "astro";
import { app } from "../../../utils/firebase/server";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { userService } from "../../../service/user";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token provided", { status: 401 });
  }

  try {
    const decoded = await auth.verifyIdToken(idToken);

    await userService.findOrCreateByExternalId(decoded.uid, {
      email: decoded.email as string,
      name: decoded.name as string,
      externalId: decoded.uid,
    });

    const fiveDays = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: fiveDays,
    });

    cookies.set("session", sessionCookie, {
      path: "/",
    });

    return redirect("/");
  } catch (error) {
    return new Response("Invalid token", { status: 401 });
  }
};
