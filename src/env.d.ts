/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare interface User {
  id: string;
  email: string;
  externalId: string;
  name: string;
}

declare namespace App {
  interface Locals {
    user: User;
  }
}

interface ImportMetaEnv {
  readonly FIREBASE_JSON: string;
  readonly FIREBASE_CLIENT_JSON: string;
  readonly OPEN_AI_API_KEY: string;
  readonly ANTROPIC_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  Alpine: import("alpinejs").Alpine;
}
