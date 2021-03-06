module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/essential',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    curly: [ 'error', 'multi-line' ],
    'vue/no-v-html': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-cond-assign': 'off',
    'max-len': 'off',
    'nonblock-statement-body-position': [ 'error', 'below' ],
    'object-shorthand': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'array-bracket-spacing': [ 'error', 'always', { singleValue: false } ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'no-param-reassign': [ 'error', { props: false } ],
    'func-names': 'off',
    'prefer-regex-literals': 'off',
    'no-underscore-dangle': 'off',
    'vue/no-deprecated-dollar-listeners-api': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/max-len': [ 'error', {
      code: 100,
      template: 100,
      tabWidth: 2,
      comments: 100,
      ignorePattern: '',
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreHTMLAttributeValues: true,
      ignoreHTMLTextContents: true,
    } ],
    'vue/order-in-components': [ 'error', {
      order: [
        'el',
        'name',
        'key',
        'parent',
        'functional',
        [ 'delimiters', 'comments' ],
        [ 'components', 'directives', 'filters' ],
        'extends',
        'mixins',
        [ 'provide', 'inject' ],
        'ROUTER_GUARDS',
        'layout',
        'middleware',
        'validate',
        'scrollToTop',
        'transition',
        'loading',
        'inheritAttrs',
        'model',
        [ 'props', 'propsData' ],
        'emits',
        'setup',
        'asyncData',
        'fetch',
        'data',
        'computed',
        'watch',
        'watchQuery',
        'LIFECYCLE_HOOKS',
        'methods',
        'head',
        [ 'template', 'render' ],
        'renderError',
      ],
    } ],
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: [ '.js', '.vue' ],
      },
    },
  },
  overrides: [
    {
      files: ['store/*.js'],
      rules: {
        'no-shadow': 'off',
      },
    },
  ],
}
