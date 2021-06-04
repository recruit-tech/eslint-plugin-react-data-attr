import { TSESLint } from "@typescript-eslint/experimental-utils";
import { localize, testString } from "../utils";

// types
type Options = {
  excludeSourceFilePatterns: string[];
};
type UserOptions = Partial<Options>;
// settings
const defaultOptions: Options = {
  excludeSourceFilePatterns: [
    "\\.test\\.(jsx|tsx)$",
    "\\.stories\\.(jsx|tsx)$",
  ],
};

// utils
const invalidDataAttrPattern = new RegExp("^data-.*[A-Z]");
const isInvalidDataAttrName = (name: string): boolean =>
  invalidDataAttrPattern.test(name);

// rule
export const ruleName = "deny-upper-case";
export const denyUpperCase: TSESLint.RuleModule<typeof ruleName, []> = {
  meta: {
    type: "suggestion",
    docs: {
      category: "Best Practices",
      description: localize({
        en: "Uppercase letters cannot be used in the data attribute name in React's JSX.",
        ja: "ReactのJSXにおいてdata属性名に大文字は使えません。",
      }),

      recommended: "error",
      url: localize({
        en: "https://reactjs.org/docs/dom-elements.html",
        ja: "https://ja.reactjs.org/docs/dom-elements.html",
      }),
    },
    messages: {
      [ruleName]: "{{ message }}",
    },
    schema: [
      {
        type: "object",
        properties: {
          excludeSourceFilePatterns: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => {
    const userOptionsArray = context.options as [UserOptions?];
    const userOptions = userOptionsArray[0]
      ? userOptionsArray[0]
      : { includeSourceFilePatterns: {}, importPatterns: {} };
    const options: Options = {
      ...defaultOptions,
      ...userOptions,
    };

    const sourceFilePath = context.getFilename();
    const isExcludedFile = options.excludeSourceFilePatterns.some((pattern) =>
      testString(sourceFilePath, pattern)
    );

    return {
      JSXAttribute(node) {
        if (isExcludedFile) return;

        const attrName = node.name.name;
        if (typeof attrName !== "string") return;

        if (isInvalidDataAttrName(attrName)) {
          context.report({
            node,
            messageId: ruleName,
            data: {
              message: localize({
                en: "Uppercase letters cannot be used in the data attribute name in React's JSX.",
                ja: "ReactのJSXにおいてdata属性名に大文字は使えません。",
              }),
            },
          });
        }
      },
    };
  },
};
