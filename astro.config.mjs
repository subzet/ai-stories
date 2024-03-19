import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import node from "@astrojs/node";
import htmx from "astro-htmx";
import icon from "astro-icon";

export default defineConfig({
  integrations: [tailwind(), alpinejs(), htmx(), icon()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
