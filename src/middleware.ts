import { defineMiddleware } from "astro/middleware";
import { getAuth } from "firebase-admin/auth";
import { app } from "./utils/firebase/server";
import { PUBLIC_ROUTES } from "./utils/constant";
import { userService } from "./service/user";

export const onRequest = defineMiddleware(async (context, next) => {
  if (PUBLIC_ROUTES.includes(context.url.pathname)) {
    return await next();
  }

  const token = context.cookies.get("session")?.value;

  if (!token) {
    return context.redirect("/");
  }

  const auth = getAuth(app);
  try {
    const decoded = await auth.verifySessionCookie(token);

    const user = await userService.findOrCreateByExternalId(decoded.uid, {
      email: decoded.email as string,
      name: decoded.name as string,
      externalId: decoded.uid,
    });

    context.locals.user = {
      name: user.name ?? "",
      email: user.email,
      id: user.id,
      externalId: user.externalId,
    };

    return next();
  } catch (error) {
    return context.redirect("/");
  }
});
