module.exports = {
  env: {
    'jest/globals': true,
  },
  root: true,
  extends: ['@react-native-community'],
  plugins: ['jest'],
  rules: {
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'react/require-default-props': ['off'],
    'react/default-props-match-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
    'prettier/prettier': ['off'],
    'react-native/no-inline-styles': ['off'],
    'react-hooks/exhaustive-deps': ['off'],
    'eslint-comments/no-unused-disable': ['off'],
    'eslint-comments/no-unlimited-disable': ['off'],
    'no-bitwise': ['off'],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
}
