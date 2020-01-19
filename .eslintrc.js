module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'rules': {
    "indent": [2, 4],
    "linebreak-style": [2, "unix"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "require-jsdoc": [1, {
        "require": {
            "FunctionDeclaration": false,
            "FunctionExpression": false,
            "ArrowFunctionExpression": false,
            "MethodDefinition": false,
            "ClassDeclaration": false
        }
    }],
    "valid-jsdoc": [1, {
        "requireParamDescription": false,
        "requireParamType": true,
        "requireReturnType": true,
        "requireReturnDescription": true

    }],
    "comma-dangle": [2, "never"],
    "max-len": [1, {
        "code": 100,
        "ignoreComments": true

    }],
    "no-undef": 2
  }
};
