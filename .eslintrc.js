module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "ecmaFeatures": {
    "jsx": true
  },
  "rules": {
    "import/no-unresolved": 1,
    "global-require": 1
  },
  "plugins": [
    "react",
    "react-native"
  ]
};
