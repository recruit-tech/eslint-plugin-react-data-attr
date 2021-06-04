# eslint-plugin-react-data-attr

ESLint rules for data attribute of React's JSX.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-data-attr`:

```
$ npm install eslint-plugin-react-data-attr --save-dev
```

## Usage

Add `react-data-attr` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["react-data-attr"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "react-data-attr/deny-upper-case": 2
  }
}
```

## Supported Rules

This plugin currently supports 1 rule.

### Rule: deny-upper-case

Detects that uppercase letters are used in the data attribute name.

Examples of **incorrect** code for this rule:

```jsx
const Foo = () => {
  return <div data-attrName="value">bar</div>;
};
```

Examples of **correct** code for this rule:

```jsx
const Foo = () => {
  return <div data-attr-name="value">bar</div>;
};
```

#### Options

Example:

```json
{
  "rules": {
    "react-data-attr/deny-upper-case": [
      2,
      {
        "excludeSourceFilePatterns": [
          "\\.test\\.(jsx|tsx)$", // Ignore filenames ending in `.test.jsx` or `.test.tsx`
          "\\.stories\\.(jsx|tsx)$",
          "\\.foo" // Ignore filenames containing `.foo`
        ]
      }
    ]
  }
}
```

| Property Name             | Description                                                                                 | Default Value |
| :------------------------ | :------------------------------------------------------------------------------------------ | :------------ |
| excludeSourceFilePatterns | An array of RegExp patterns. File paths that match any pattern are excluded from the check. | [here]()      |

### Licence

MIT
