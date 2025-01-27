module.exports = {
  env: {
    browser: true, // Enable browser globals like window, document
    es2021: true, // Use the latest ECMAScript features
    node: true, // Enable Node.js globals
  },
  extends: 'eslint:recommended', // Use the recommended ESLint rules
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript version
    sourceType: 'module', // Allows for importing modules
  },
  rules: {
    // Add any custom rules here
    'no-console': 'warn', // Warn about console.log usage
    'semi': ['error', 'always'], // Enforce semicolons
  },
};