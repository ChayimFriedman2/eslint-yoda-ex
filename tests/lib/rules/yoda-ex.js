/**
 * @fileoverview Like ESLint core yoda rules but with more options
 * @author Chayim Refael Friedman
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../src/rules/yoda-ex'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('yoda-ex', rule, {
  valid: [
  ],

  invalid: [
  ]
});
