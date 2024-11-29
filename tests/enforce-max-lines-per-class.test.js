const { RuleTester } = require("eslint");
const rule = require("../src/enforce-max-lines-per-class");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
});

ruleTester.run("enforce-max-lines-per-class", rule, {
  valid: [
    {
      code: `
        class MyClass {
          constructor() {
            // code
          }
        }
      `,
      options: [{ max: 15 }],
    },
  ],
  invalid: [
    {
      code: `
        class MyClass {
          method1() {}
          method2() {}
          method3() {}
          method4() {}
          method5() {}
          method6() {}
          method7() {}
          method8() {}
          method9() {}
          method10() {}
          method11() {}
          method12() {}
          method13() {}
          method14() {}
          method15() {}
          method16() {}
        }
      `,
      options: [{ max: 15 }],
      errors: [{ message: "Class exceeds maximum allowed lines of code (15 lines)." }],
    },
  ],
});

console.log("All tests for 'enforce-max-lines-per-class' passed!");
