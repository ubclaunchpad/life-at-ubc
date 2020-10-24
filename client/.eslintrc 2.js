module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "tsconfigRootDir": __dirname,
        "project": "./tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    "overrides": [
        {
            "files": ["**/*.spec.ts"],
            "rules": {
                "max-lines": "off",
                "max-nested-callbacks": "off",
            }
        },
        {
            "files": ["src/Util.ts"],
            "rules": {
                "no-console": "off"
            }
        }
    ],
    "ignorePatterns": [
        ".eslintrc.js"
    ],
    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": ["error", {"default": "array-simple"}],
        "@typescript-eslint/ban-types": [
            "error",
            {
                "types": {
                    "Object": "Avoid using the `Object` type. Did you mean `object`?",
                    "Function": "Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
                    "Boolean": "Avoid using the `Boolean` type. Did you mean `boolean`?",
                    "Number": "Avoid using the `Number` type. Did you mean `number`?",
                    "String": "Avoid using the `String` type. Did you mean `string`?",
                    "Symbol": "Avoid using the `Symbol` type. Did you mean `symbol`?",
                }
            }
        ],
        "@typescript-eslint/explicit-member-accessibility": ["error", {"overrides": {"constructors": "off"}}],
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/no-use-before-declare": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "error",
        "arrow-parens": ["error", "always"],
        "brace-style": ["error", "1tbs"],
        "complexity": "off",
        "constructor-super": "error",
        "dot-notation": "off",
        "eol-last": "error",
        "guard-for-in": "off",
        "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
        "max-classes-per-file": "off",
        "max-statements-per-line": "error",
        "member-ordering": "off",
        "new-parens": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-empty": "error",
        "no-empty-function": "off",
        "no-eval": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-unsafe-finally": "error",
        "no-unused-labels": "error",
        "object-shorthand": "off",
        "one-var": "off",
        "prefer-const": "off",
        "quote-props": ["error", "consistent-as-needed"],
        "radix": "error",
        "space-before-function-paren": ["error", {"anonymous": "always", "named": "ignore", "asyncArrow": "always"}],
        "use-isnan": "error",
        "valid-typeof": "off",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                "rulesDirectory": [
                    "./node_modules/tslint-microsoft-contrib"
                ],
                "rules": {
                    "align": [
                        true,
                        "parameters",
                        "statements"
                    ],
                    "comment-format": [
                        true,
                        "check-space"
                    ],
                    "import-spacing": true,
                    "jsdoc-format": true,
                    "no-implicit-dependencies": [
                        true,
                        "dev"
                    ],
                    "no-reference-import": true,
                    "no-shadowed-variable": true,
                    "no-unused-expression": true,
                    "one-line": [
                        true,
                        "check-catch",
                        "check-else",
                        "check-finally",
                        "check-open-brace",
                        "check-whitespace"
                    ],
                    "quotemark": [
                        true,
                        "double",
                        "avoid-escape"
                    ],
                    "semicolon": [
                        true,
                        "always"
                    ],
                    "triple-equals": [
                        true,
                        "allow-null-check"
                    ],
                    "variable-name": [
                        true,
                        "ban-keywords",
                        "check-format",
                        "allow-pascal-case"
                    ],
                    "whitespace": [
                        true,
                        "check-branch",
                        "check-decl",
                        "check-operator",
                        "check-separator",
                        "check-type",
                        "check-typecast"
                    ],
                    "indent": [
                        true,
                        "spaces",
                        4
                    ]
                }
            }
        ]
    }
};