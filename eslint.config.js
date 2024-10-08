module.exports = {
  extends: [
    'eslint:recommended'
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin'
  ],
  env: {
    es2024: true,
    browser: true
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: './',
        project: [
          './tsconfig.json',
        ],
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/array-type': [
          2,
          {
            default: 'generic',
            readonly: 'generic'
          }
        ],
        '@typescript-eslint/member-delimiter-style': [
          2,
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true
            },
            singleline: {
              delimiter: 'semi',
              requireLast: true
            }
          }
        ]
      }
    }
  ],
  rules: {
    'semi': [
      'error',
      'never'
    ],
    'max-len': 'off',
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    'jsx-quotes': [
      2,
      'prefer-double'
    ],
    'no-console': 'warn',
    'no-alert': 'error',
    'array-callback-return': 'error',
    'no-multi-spaces': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': 'warn',
    'no-useless-return': 'error',
    'radix': 'error',
    'no-shadow': 'off',
    'no-prototype-builtins': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false
      }
    ],
    'no-undef-init': 'error',
    'array-bracket-newline': [
      'warn',
      'consistent'
    ],
    'brace-style': 'off',
    'comma-dangle': [
      'error',
      'always-multiline'
    ],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'func-call-spacing': 'error',
    'function-call-argument-newline': [
      'warn',
      'consistent'
    ],
    'implicit-arrow-linebreak': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 3
      }
    ],
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'warn',
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'operator-assignment': 'error',
    'operator-linebreak': [
      'error',
      'before'
    ],
    'prefer-object-spread': 'error',
    'wrap-regex': 'error',
    'arrow-body-style': 'warn',
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'no-duplicate-imports': 'error',
    'no-useless-rename': 'error',
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: true
      }
    ],
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'global-require': 'error',
    'handle-callback-err': 'off',
    'no-mixed-requires': 'error',
    'no-new-require': 'error'
  }
}
