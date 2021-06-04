import { denyUpperCase } from "./rules/denyUpperCase";

export = {
  rules: {
    "deny-upper-case": denyUpperCase,
  },
  configs: {
    all: {
      plugins: ["eslint-plugin-react-data-attr"],
      rules: {
        "deny-upper-case": "error",
      },
    },
  },
};
