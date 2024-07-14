import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        prettier,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",
    },

    rules: {
        "no-throw-literal": "error",
        "no-unused-expressions": "error",
        "no-redeclare": "error",
        curly: ["error", "multi-line"],

        "@typescript-eslint/naming-convention": ["error", {
            selector: "class",
            format: ["PascalCase"],
        }],

        semi: ["error", "always"],

        quotes: ["error", "single", {
            avoidEscape: true,
        }],

        eqeqeq: "error",

        "prettier/prettier": ["error", {
            singleQuote: true,
        }],
    },
}];