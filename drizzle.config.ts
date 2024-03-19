import type { Config } from "drizzle-kit";

export default {
  schema: "./src/model/schema.ts",
  out: "./src/model/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
} satisfies Config;
