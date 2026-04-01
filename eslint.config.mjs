import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [
      "dist/**",
      ".next/**",
      "coverage/**",
      "node_modules/**",
      "site/.next/**",
    ],
  },
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default config;
