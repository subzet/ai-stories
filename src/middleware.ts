import { defineMiddleware } from "astro/middleware";
import { getAuth } from "firebase-admin/auth";
import { app } from "./utils/firebase/server";
import { PUBLIC_ROUTES } from "./utils/constant";

export const onRequest = defineMiddleware(async (context, next) => {
  if (PUBLIC_ROUTES.includes(context.url.pathname)) {
    return await next();
  }

  const token = context.cookies.get("session")?.value;

  if (!token) {
    return context.redirect("/");
  }

  const auth = getAuth(app);

  await auth.verifyIdToken(token).catch((error) => {
    return context.redirect("/");
  });

  return next();
});
