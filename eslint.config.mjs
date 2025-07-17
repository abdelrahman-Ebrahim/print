import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow explicit 'any' but warn about it (you can change to "off" to completely disable)
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Disable the unescaped entities rule (or use "warn" instead of "error")
      "react/no-unescaped-entities": "off",
      
      // You might want to add this to handle JSX content in text
      "react/no-unescaped-entities": ["error", {
        "forbid": [">", "}", "\""] // Only forbid these characters without escaping
      }]
    }
  }
];

export default eslintConfig;