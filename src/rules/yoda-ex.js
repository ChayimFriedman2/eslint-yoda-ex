/**
 * @fileoverview Like ESLint core yoda rules but with more options
 * @author Chayim Refael Friedman
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = /** @type {import('eslint').Rule.RuleModule} */ ({
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require or disallow Yoda Conditions',
      category: 'Best Practices',
      recommended: false,
      url: 'https://github.com/ChayimFriedman2/eslint-yoda-ex/blob/master/docs/rules/yoda-ex.md'
    },
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'never'],
      },
      {
        type: 'object',
        properties: {
          onlyIfs: {
            type: 'boolean',
            default: false,
          },

          equality: {
            type: 'boolean',
            default: true,
          },
          inequality: {
            type: 'boolean',
            default: true,
          },
          comparison: {
            type: 'boolean',
            default: true,
          },

          range: {
            enum: ['no-special', 'ignore', 'enforce'],
            default: 'enforce',
          },
          requireParenthesizedRange: {
            type: 'boolean',
            default: false,
          },
          notInRange: {
            enum: ['ignore', 'or', 'negateAnd'],
            default: 'or',
          },
        },
        additionalProperties: false,
      }
    ],
  },

  create(context) {
  },
});
