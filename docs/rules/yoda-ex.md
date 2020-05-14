# Require or disallow Yoda Conditions (yoda-ex)

Yoda conditions are so named because the literal value of the condition comes first while the variable comes second. For example, the following is a Yoda condition:

```js
if ("red" === color) {
  // ...
}
```

This is called a Yoda condition because it reads as, "if red equals the color", similar to the way the Star Wars character Yoda speaks. Compare to the other way of arranging the operands:

```js
if (color === "red") {
  // ...
}
```

This typically reads, "if the color equals red", which is arguably a more natural way to describe the comparison.

Proponents of Yoda conditions highlight that it is impossible to mistakenly use `=` instead of `==` because you cannot assign to a literal value. Doing so will cause a syntax error and you will be informed of the mistake early on. This practice was therefore very common in early programming where tools were not yet available.

Opponents of Yoda conditions point out that tooling has made us better programmers because tools will catch the mistaken use of `=` instead of `==` (ESLint will catch this for you). Therefore, they argue, the utility of the pattern doesn't outweigh the readability hit the code takes while using Yoda conditions.

## Rule Details

This rule aims to enforce consistent style of conditions which compare a variable to a literal value.

## Options

This rule can take a string option:

 - If it is `"never"`, then comparisons must never be Yoda conditions.
 - If it is the default `"always"`, then the literal value must always come first.

And an object literal:

 - If the `"onlyIfs"` property is `true`, only comparisons in `if` statements and ternary expressions will be handled by the rule. Default to `false`.
 - If the `"equality"` property is `false`, `==` and `===` are not handled by the rule. Default to `true`.
 - If the `"inequality"` property is `false`, `!=` and `!==` are not handled by the rule. Default to `true`.
 - If the `"comparison"` property is `false`, `<`, `<=`. `>` and `>=` are not handled by the rule. Note that this affects only `"never"` and `"always"`, but not `"range"` and `"notInRange"`. Default to `true`.
 - If the `"range"` property, which affects range comparisons - is variable inside/outside a range (i.e. `v < 8 && v > 1`), accepts one of the following:
   - `"no-special"` - ranges are not treated specially but just like other comparisons.
   - `"ignore"` - leave ranges as-is if of the form `1 < a && a < 8`.
   - `"enforce"` (default) - enforce ranges to be of the form `1 < a && a < 8`.
 - If `"range"` is set to `"enforce"`, you can also set the property `"notInRange"`, which affects tests whether a value is outside a range:
   - `"ignore"` - leave them as either `!(1 <= a && a <= 8)` or `a < 1 || 8 < a`.
   - `"or"` (default) - enforce them to be of the form `a < 1 || 8 < a`.
   - `"negateAnd"` - enforce them to be of the form `!(1 <= a && a <= 8)`.
 - If the `"requireParenthesizedRange"` property is `true`, tests are considered to be ranges only if they're parenthesized. Defaults to false.

### never

Examples of **incorrect** code for the `"never"` option:

```js
/* eslint yoda-ex: ["error", "never"] */

if ("red" === color) {
  // ...
}

if (`red` === color) {
  // ...
}

// Note that unlike the core rule, the following will be valid:
//
// if (`red` === `${color}`) {
//   // ...
// }

if (true == flag) {
  // ...
}

if (5 > count) {
  // ...
}

if (-1 < str.indexOf(substr)) {
  // ...
}
```

Examples of **correct** code for the `"never"` option:

```js
/* eslint yoda-ex: ["error", "never"] */

if (5 & value) {
  // ...
}

if (value === "red") {
  // ...
}

if (value === `red`) {
  // ...
}

if (`${value}` === `red`) {

}

// Note that unlike the core rule, the following will be valid:
if (`red` === `${color}`) {
  // ...
}
```

### always

Examples of **incorrect** code for the `"always"` option:

```js
/* eslint yoda-ex: "error" */

if (color == "blue") {
  // ...
}

if (color == `blue`) {
  // ...
}
```

Examples of **correct** code for the `"always"` option:

```js
/* eslint yoda-ex: "error" */

if ("blue" == value) {
  // ...
}

if (`blue` == value) {
  // ...
}

if (`blue` == `${value}`) {
  // ...
}

if (-1 < str.indexOf(substr)) {
  // ...
}
```

### onlyIfs

Examples of **incorrect** code for the `{ "onlyIfs": false }` option:

```js
/* eslint yoda-ex: ["error", "never"] */

return "red" === color;

if (`red` === color) {
  // ...
}

var a = `red` === color;

var b = true === flag ? 1 : 2;

if (5 > count) {
  // ...
}

if (-1 < str.indexOf(substr)) {
  // ...
}
```

Examples of **correct** code for the `{ "onlyIfs": false }` option:

```js
/* eslint yoda-ex: ["error", "never"] */

if (5 & value) {
  // ...
}

if (value === "red") {
  // ...
}

return value === `red`;

var a = value === `red`;
```

Examples of **incorrect** code for the `{ "onlyIfs": true }` option:

```js
/* eslint yoda-ex: ["error", "never", { "onlyIfs": true }] */

if (`red` === color) {
  // ...
}

var b = true === flag ? 1 : 2;

if (5 > count) {
  // ...
}

if (-1 < str.indexOf(substr)) {
  // ...
}
```

Examples of **correct** code for the `{ "onlyIfs": true }` option:

```js
/* eslint yoda-ex: ["error", "never", { "onlyIfs": true }] */

if (5 & value) {
  // ...
}

if (value === "red") {
  // ...
}

return value === `red`;

return `red` === value;

var a = `red` === value;

var b = flag === true ? 1 : 2;
```

### range

Examples of **incorrect** code for the `["never", { "range": "no-special" }]` configuration:

```js
/* eslint yoda-ex: ["error", "never", { "range": "no-special" }] */

if (1 < a && a < 8) {
  // ...
}

if (a < 1 || 8 < a) {
  // ...
}
```

Examples of **correct** code for the `["never", { "range": "no-special" }]` configuration:

```js
/* eslint yoda-ex: ["error", "never", { "range": "no-special" }] */

if (a > 1 && a < 8) {
  // ...
}

if (a < 1 || a > 8) {
  // ...
}
```

Examples of **incorrect** code for the `["always", { "range": "no-special" }]` configuration:

```js
/* eslint yoda-ex: ["error", "always", { "range": "no-special" }] */

if (1 < a && a < 8) {
  // ...
}

if (a < 1 || 8 < a) {
  // ...
}
```

Examples of **correct** code for the `["always", { "range": "no-special" }]` configuration:

```js
/* eslint yoda-ex: ["error", "always", { "range": "no-special" }] */

if (1 < a && 8 > a) {
  // ...
}

if (1 > a || 8 < a) {
  // ...
}
```

Examples of **incorrect** code for the `{ "range": "ignore" }` configuration:

```js
/* eslint yoda-ex: ["error", "always", { "range": "ignore" }] */

// None!
```

Examples of **correct** code for the `{ "range": "ignore" }` configuration:

```js
/* eslint yoda-ex: ["error", "always", { "range": "ignore" }] */

if (1 < a && a < 8) {
  // ...
}

if (1 < a && 8 > a) {
  // ...
}

if (a < 1 || 8 < a) {
  // ...
}

if (1 > a || 8 < a) {
  // ...
}
```

Examples of **incorrect** code for the `{ "range": "enforce" }` configuration:

```js
/* eslint yoda-ex: ["error", "always"/"never", { "range": "enforce" }] */

if (1 < a && 8 > a) {
  // ...
}

if (1 > a || 8 < a) {
  // ...
}
```

Examples of **correct** code for the `{ "range": "enforce" }` configuration:

```js
/* eslint yoda-ex: ["error", "always", { "range": "enforce" }] */

if (1 < a && a < 8) {
  // ...
}

if (a < 1 || 8 < a) {
  // ...
}
```

### notInRange

Examples of **incorrect** code for the `{ "range": "enforce", "notInRange": "ignore" }` configuration:

```js
/* eslint yoda-ex: ["error", "always"/"never", { "range": "enforce", "notInRange": "ignore" }] */

if (1 > a || 8 < a) {
  // ...
}
```

Examples of **correct** code for the `{ "range": "enforce", "notInRange": "ignore" }` configuration:

```js
/* eslint yoda-ex: ["error", "always"/"never", { "range": "enforce", "notInRange": "ignore" }] */

if (a < 1 || 8 < a) {
  // ...
}

if (!(1 <= a && a <= 8)) {
  // ...
}
```

Examples of **incorrect** code for the `{ "range": "enforce", "notInRange": "or" }` configuration:

```js
/* eslint yoda-ex: ["error", "always"/"never", { "range": "enforce", "notInRange": "or" }] */

if (1 > a || 8 < a) {
  // ...
}

if (!(1 <= a && a <= 8)) {
  // ...
}
```

Examples of **correct** code for the `{ "range": "enforce", "notInRange": "or" }` configuration:

```js
/* eslint yoda-ex: ["error", "always"/"never", { "range": "enforce", "notInRange": "or" }] */

if (a < 1 || 8 < a) {
  // ...
}
```

Examples of **incorrect** code for the `{ "range": "enforce", "notInRange": "negateAnd" }` configuration:

```js
/* eslint yoda-ex: ["error", "always"/"never", { "range": "enforce", "notInRange": "negateAnd" }] */

if (1 > a || 8 < a) {
  // ...
}

if (a < 1 || 8 < a) {
  // ...
}
```

Examples of **correct** code for the `{ "range": "enforce", "notInRange": "negateAnd" }` configuration:

```js
/* eslint yoda-ex: ["error", "always"/"never", { "range": "enforce", "notInRange": "negateAnd" }] */

if (!(1 <= a && a <= 8)) {
  // ...
}
```

## Further Reading

 - [ESLint core yoda rule](https://eslint.org/docs/rules/yoda)
 - [Yoda Conditions](https://en.wikipedia.org/wiki/Yoda_conditions)
 - [Yoda Notation and Safe Switching](http://thomas.tuerke.net/on/design/?with=1249091668#msg1146181680)
