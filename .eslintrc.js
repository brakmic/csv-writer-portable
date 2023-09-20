module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-throw-literal': 'error',
    'no-unused-expressions': 'error',
    'no-redeclare': 'error',
    'curly': ['error', 'multi-line'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        "selector": "class",
        "format": ["PascalCase"]
      }
    ],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'eqeqeq': 'error'
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  }
};
