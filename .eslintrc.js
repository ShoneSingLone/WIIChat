module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    globals: {
        "requirejs": true,
        "define": true
    },
    extends: [
        "eslint:recommended",
    ],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
    }
};