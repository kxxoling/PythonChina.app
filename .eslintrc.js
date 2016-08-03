module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "ecmaFeatures": {
    "jsx": true
  },
  "env": {
      "browser": true,
      "node": true
  },
  "rules": {
    "import/no-unresolved": 1,
     "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "global-require": 1
  },
  "plugins": [
    "react",
    "react-native"
  ]
};
