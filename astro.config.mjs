// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import twAnimateCss from "tw-animate-css";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), twAnimateCss],
  },
});
