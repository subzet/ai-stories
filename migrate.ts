import { createClient } from "@libsql/client";

import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

export const client = createClient({
  url: process.env.DATABASE_URL as string,
  authToken: process.env.DATABASE_AUTH_TOKEN as string,
});

export const database = drizzle(client);

async function main() {
  try {
    await migrate(database, {
      migrationsFolder: "./src/model/migrations",
    });
    console.log("Tables migrated!");
  } catch (error) {
    console.error("Error performing migration:", error);
  }
}

await main();
