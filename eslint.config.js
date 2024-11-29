"use strict";
const plugins = require("./index");

module.exports = [
  {
    plugins: { "enhancer": plugins },
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
    },
    rules: {
      "enhancer/enforce-one-class-per-file": "error",
      "enhancer/enforce-max-lines-per-class": ["error", { "max": 55 }],
      "enhancer/require-regexp-explanation": "warn",
    },
  },
];