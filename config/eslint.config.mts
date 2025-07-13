import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginPrettier from "eslint-plugin-prettier";
import tseslintParser from "@typescript-eslint/parser";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";

import path from "path";
import { fileURLToPath } from "url";
import { Linter, ESLint } from "eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: {
    overrides: [],
  },
});

const config: Linter.Config[] = [
  {
    languageOptions: {
      parser: tseslintParser,
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
    plugins: {
      /**
       * @todo Remove casting once @typescript-eslint plugin object
       * is typed as `ESLint.Plugin`
       */
      "@typescript-eslint": typescriptEslintPlugin as unknown as ESLint.Plugin,
      import: importPlugin,
      prettier: eslintPluginPrettier,
    },
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
          ],
          "newlines-between": "never",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "prefer-const": "error",
      "prettier/prettier": "error",
    },
  },
];

export default config;
