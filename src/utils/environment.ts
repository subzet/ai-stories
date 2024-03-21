export const environment = {
  firebase_json: import.meta.env.DEV
    ? import.meta.env.FIREBASE_JSON
    : process.env.FIREBASE_JSON
      ? process.env.FIREBASE_JSON
      : "",
  firebase_client_json: import.meta.env.DEV
    ? import.meta.env.FIREBASE_CLIENT_JSON
    : process.env.FIREBASE_CLIENT_JSON
      ? process.env.FIREBASE_CLIENT_JSON
      : "",
  open_ai_api_key: import.meta.env.DEV
    ? import.meta.env.OPEN_AI_API_KEY
    : process.env.OPEN_AI_API_KEY
      ? process.env.OPEN_AI_API_KEY
      : "",
  database_url: import.meta.env.DEV
    ? import.meta.env.DATABASE_URL
    : process.env.DATABASE_URL
      ? process.env.DATABASE_URL
      : "",
  database_api_key: import.meta.env.DEV
    ? import.meta.env.DATABASE_API_KEY
    : process.env.DATABASE_API_KEY
      ? process.env.DATABASE_API_KEY
      : "",
};
