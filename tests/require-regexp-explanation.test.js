const { RuleTester } = require("eslint");
const rule = require("../src/enforce-one-class-per-file");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
});

ruleTester.run("enforce-one-class-per-file", rule, {
  valid: [
    {
      code: `
        class MyClass {
          constructor() {
            // code
          }
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        class ClassOne {}
        class ClassTwo {}
      `,
      errors: [{ message: "More than one class per file is not allowed." }],
    },
  ],
});

console.log("All tests for 'enforce-one-class-per-file' passed!");
