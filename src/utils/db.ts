import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../model/schema";
import { environment } from "./environment";

const client = createClient({
  url: environment.database_url,
  authToken: environment.database_api_key,
});

export const database = drizzle(client, { schema });
