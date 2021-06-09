import { TSESLint } from '@typescript-eslint/experimental-utils';
import { denyUpperCase, ruleName } from './denyUpperCase';

const tester = new TSESLint.RuleTester({
  parser: require.resolve('espree'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

describe('test', () => {
  tester.run(ruleName, denyUpperCase, {
    valid: [
      {
        code: `<Foo bar="123" />`,
      },
      {
        code: `<Foo bar="123"></Foo>`,
      },
      {
        code: `<Foo data-bar="123"></Foo>`,
      },
      {
        code: `<Foo data-bar="123"></Foo>`,
      },
      {
        code: `<Foo data-bar_baz="123"></Foo>`,
      },
      {
        filename:
          '/Uses/home/testuser/project/src/components/atoms/Foo.test.tsx',
        code: `<Foo data-Baz="123" />`,
      },
      {
        filename:
          'C:\\Uses\\home\\testuser\\project\\src\\components\\atoms\\Foo.test.tsx',
        code: `<Foo data-Baz="123" />`,
      },
    ],
    invalid: [
      {
        code: `<Foo data-Baz="123" />`,
        errors: [{ messageId: ruleName }],
      },
      {
        code: `<Foo data-barBaz="123"></Foo>`,
        errors: [{ messageId: ruleName }],
      },
      {
        code: `<Test><Foo data-barBaz="123"></Foo></Test>`,
        errors: [{ messageId: ruleName }],
      },
    ],
  });
});
