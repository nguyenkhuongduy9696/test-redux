module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      globalReturn: false
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  ignorePatterns: [
    '/node_modules/**',
    '/build/**',
    '/src/setupTests.ts',
    '/public/**'
  ],
  rules: {
    'react/prop-types': 0,
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 'error',
    'react/jsx-curly-spacing': [
      2,
      {
        when: 'always',
        allowMultiline: false
      }
    ],
    quotes: [2, 'single'],
    indent: [2, 2, { SwitchCase: 1 }],
    semi: [2, 'always'],
    curly: [2, 'all'],
    camelcase: [0, { properties: 'always' }],
    eqeqeq: [2, 'smart'],
    'one-var-declaration-per-line': [2, 'always'],
    'new-cap': 2,
    'no-case-declarations': 0,
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'space-before-function-paren': 'error',
    'react/display-name': [0],
    'linebreak-style': [0, 'windows'],
    'react-hooks/exhaustive-deps': 'off',
    'no-use-before-define': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
};
