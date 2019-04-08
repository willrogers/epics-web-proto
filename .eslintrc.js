module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "mocha": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        /* Avoid complaints about unused React import. */
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": true,
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
        "space-before-blocks": [ "warn", "always" ],
        "no-trailing-spaces": [ "warn" ],
        "no-var": ["warn"],
        "no-unused-vars": [1, {"args": "all", "argsIgnorePattern": "^_"}]
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};
