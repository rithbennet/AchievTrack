import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "eslint:recommended",
      "prettier",
      "next/core-web-vitals",
      "next/typescript",
      "plugin:react-hooks/recommended",
      "plugin:@next/next/recommended",
    ],
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      semi: ["error"],
    },
  }),
];

export default eslintConfig;
