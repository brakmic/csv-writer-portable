module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
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
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'eqeqeq': 'error',
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  }
};
