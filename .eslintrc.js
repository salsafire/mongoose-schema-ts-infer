module.exports = {
  env: {
    browser: false,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.build.json'
  },
  rules: {}
}
