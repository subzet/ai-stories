/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly FIREBASE_JSON: string;
    readonly FIREBASE_CLIENT_JSON: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

interface Window {
    Alpine: import('alpinejs').Alpine;
  }