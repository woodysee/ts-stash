import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import type { Linter, ESLint } from "eslint";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginPrettier from "eslint-plugin-prettier";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: {
    overrides: [],
  },
});

/**
 * @see https://typescript-eslint.io/rules/consistent-type-imports/
 */
const defaultConfigRuleForConsistentTypeImportsOptions: {
  /** Whether to disallow type imports in type annotations (`import()`). */
  disallowTypeAnnotations?: boolean;
  /** The expected type modifier to be added when an import is detected as used only in the type position. */
  fixStyle?:
    | "inline-type-imports"
    /** The expected type modifier to be added when an import is detected as used only in the type position. */
    | "separate-type-imports";
  /** The expected import kind for type-only imports. */
  prefer?:
    | "no-type-imports"
    /** The expected import kind for type-only imports. */
    | "type-imports";
} = {
  disallowTypeAnnotations: true,
  fixStyle: "separate-type-imports",
  prefer: "type-imports",
};

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
      /**
       * `simple-import-sort` intentionally puts whitespaces
       * between import groupings without a setting to disable it
       */
      perfectionist,
      prettier: eslintPluginPrettier,
    },
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ),
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        defaultConfigRuleForConsistentTypeImportsOptions,
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          newlinesBetween: 0,
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          internalPattern: ["^@/", "^~/"],
        },
      ],
      // OAutosort objects (order may be import within objects)
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-jsx-props": "off",
      "perfectionist/sort-enums": "off",
      "prefer-const": "error",
      "prettier/prettier": "error",
    },
  },
];

export default config;
