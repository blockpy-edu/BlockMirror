import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  { files: ["src/**/*.js"] },
  {
    ignores: [
      "webpack.config*",
      "dist/**/*.js",
      "lib/**/*.js",
      "src/skulpt/*.js",
    ],
  },
  {
    rules: {
      "no-undef": "off", // Currently not yet possible
      "no-unused-vars": "off", // TODO enable in the future
      "no-cond-assign": "off", // TODO should be enabled, few instances remaining
    },
  },
]);
