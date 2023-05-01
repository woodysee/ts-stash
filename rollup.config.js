import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: {
    "data-structures/graph/directed":
      "src/data-structures/graph/directed/index.ts",
    "data-structures/linked-list": "src/data-structures/linked-list/index.ts",
    "methods/array/intersection": "src/methods/array/intersection.ts",
    "methods/array/most-freq": "src/methods/array/most-freq.ts",
    "methods/binary-search": "src/methods/binary-search/index.ts",
    "methods/effects/fetch": "src/methods/effects/fetch.ts",
    "methods/string-interpolation": "src/methods/string-interpolation/index.ts",
    "methods/time/hour-range-diff": "src/methods/time/hour-range-diff.ts",
    "misc/coin-change/bottom-up": "src/misc/coin-change/bottom-up.ts",
    "misc/coin-change/top-down": "src/misc/coin-change/top-down.ts",
    "misc/cpf": "src/misc/cpf/index.ts",
    "validation/validate-email": "src/validation/validate-email.ts",
  },
  output: {
    dir: "dist",
    entryFileNames: "[name].js",
    format: "es",
    preserveModules: false, // Keep directory structure and files
    preserveModulesRoot: "src",
    sourcemap: false,
  },
  plugins: [resolve({ browser: false }), json(), typescript()],
};
