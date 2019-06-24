module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    'no-multi-spaces': 0,
    'no-console': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'indent': 0,
    'no-trailing-spaces': [2, { "skipBlankLines": true }],
  },
  'extends': [
    '@megalo/standard'
  ]
}
