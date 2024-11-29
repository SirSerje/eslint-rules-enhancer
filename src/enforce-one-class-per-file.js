
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow more than one class per file.",
    },
    schema: [],
  },
  create(context) {
    let classCount = 0;

    return {
      Program() {
        classCount = 0;
      },
      ClassDeclaration(node) {
        classCount++;

        if (classCount > 1) {
          context.report({
            node,
            message: "More than one class per file is not allowed.",
          });
        }
      },
    };
  },
};
