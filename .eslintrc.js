module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "mocha": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "eslint-plugin-react"
    ],
    "rules": {
        "indent": ["error", 4],
        "react/jsx-uses-vars": ["error"],
        "linebreak-style": [ "error", "unix" ],
        "quotes": [ "error", "single" ],
        "semi": [ "error", "always" ],
        "space-before-function-paren": [ "warn", "never" ],
        "no-trailing-spaces": [ "warn" ]
    }
};
