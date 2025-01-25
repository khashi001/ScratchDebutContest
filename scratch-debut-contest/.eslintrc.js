module.exports = {
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};

