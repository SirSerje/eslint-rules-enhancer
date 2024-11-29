module.exports = {
  rules: {
    "enforce-one-class-per-file": require('./src/enforce-one-class-per-file'),
    "enforce-max-lines-per-class": require('./src/enforce-max-lines-per-class'),
    "require-regexp-explanation": require('./src/require-regexp-explanation'),
  },
};
