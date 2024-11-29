module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require an explanatory comment for regular expressions, whether defined as string literals in specific contexts or regex literals.",
    },
    schema: [],
    messages: {
      missingComment:
        "Regular expression {{type}} found without an explanatory comment: '{{pattern}}'",
    },
  },
  create(context) {
    const sourceCode = context.getSourceCode();

    /**
     * Helper function to determine if a string is a valid regular expression.
     * @param {string} str - The string to test.
     * @returns {boolean} - True if valid regex, false otherwise.
     */
    function isValidRegex(str) {
      try {
        new RegExp(str); // Attempt to create a RegExp object
        return true;
      } catch (e) {
        return false;
      }
    }

    /**
     * Helper function to check if the node or its parent has an explanatory comment above it.
     * @param {ASTNode} node - The AST node to check.
     * @returns {boolean} - True if an explanatory comment exists, false otherwise.
     */
    function hasExplanatoryComment(node) {
      // Check comments before the node itself
      const commentsBefore = sourceCode.getCommentsBefore(node);

      const hasCommentOnNode = commentsBefore.some((comment) => {
        const linesBetween = node.loc.start.line - comment.loc.end.line;
        const isAdjacent = linesBetween <= 1;

        return isAdjacent && comment.value.trim().length > 0;
      });

      if (hasCommentOnNode) {
        return true;
      }

      const parent = node.parent;
      if (parent) {
        const parentCommentsBefore = sourceCode.getCommentsBefore(parent);

        const hasCommentOnParent = parentCommentsBefore.some((comment) => {
          const linesBetween = parent.loc.start.line - comment.loc.end.line;
          const isAdjacent = linesBetween <= 1;

          return isAdjacent && comment.value.trim().length > 0;
        });

        if (hasCommentOnParent) {
          return true;
        }
      }

      return false;
    }

    /**
     * Helper function to determine if a variable name suggests it holds a regex.
     * @param {string} name - The variable name.
     * @returns {boolean} - True if name suggests a regex, false otherwise.
     */
    function isRegexVariable(name) {
      return /regex$/i.test(name) || /regexp$/i.test(name); // Variables ending with 'regex' or 'regexp' (case-insensitive)
    }

    return {
      // Handle regex literals (e.g., /pattern/)
      "Literal[regex]"(node) {
        if (node.regex && node.regex.pattern) {
          if (!hasExplanatoryComment(node)) {
            context.report({
              node,
              messageId: "missingComment",
              data: {
                type: "regex literal",
                pattern: node.regex.pattern,
              },
            });
          }
        }
      },

      // Handle string literals in specific contexts
      "Literal[string]"(node) {
        const parent = node.parent;
        if (
          parent &&
          (
            // Case 1: new RegExp("pattern")
            (parent.type === "NewExpression" &&
              parent.callee.type === "Identifier" &&
              parent.callee.name === "RegExp") ||

            // Case 2: RegExp("pattern")
            (parent.type === "CallExpression" &&
              parent.callee.type === "Identifier" &&
              parent.callee.name === "RegExp")
          )
        ) {
          const pattern = node.value;

          if (isValidRegex(pattern)) {
            if (!hasExplanatoryComment(node)) {
              context.report({
                node,
                messageId: "missingComment",
                data: {
                  type: "string literal",
                  pattern: pattern,
                },
              });
            }
          }
        }

        // Additional Case: Assignment to variables named *Regex or *RegExp
        // e.g., const emailRegex = "pattern"
        if (
          parent &&
          (parent.type === "VariableDeclarator" ||
            parent.type === "AssignmentExpression")
        ) {
          let variableName = null;

          if (parent.type === "VariableDeclarator" && parent.id.type === "Identifier") {
            variableName = parent.id.name;
          } else if (
            parent.type === "AssignmentExpression" &&
            parent.left.type === "Identifier"
          ) {
            variableName = parent.left.name;
          }

          if (variableName && isRegexVariable(variableName)) {
            const pattern = node.value;

            if (isValidRegex(pattern)) {
              if (!hasExplanatoryComment(node)) {
                context.report({
                  node,
                  messageId: "missingComment",
                  data: {
                    type: "string literal",
                    pattern: pattern,
                  },
                });
              }
            }
          }
        }

      },
      // cover edge cases for template literals
      "TemplateLiteral"(node) {
      },
    };
  },
};

