module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce classes to be less than a specified number of lines.",
    },
    schema: [
      {
        type: "object",
        properties: {
          max: {
            type: "integer",
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options = context.options[0] || {};
    const maxLines = options.max || 15;

    return {
      ClassDeclaration(node) {
        const classBody = node.body;
        const startLine = classBody.loc.start.line;
        const endLine = classBody.loc.end.line;
        const linesOfCode = endLine - startLine + 1;

        if (linesOfCode > maxLines) {
          context.report({
            node,
            message: `Class exceeds maximum allowed lines of code (${maxLines} lines).`,
          });
        }
      },
    };
  },
};
