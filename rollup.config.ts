import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import visualizer from "rollup-plugin-visualizer";

import packageJson from "./package.json";

const isProduction = process.env.NODE_ENV === "production";

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

export default [
  {
    input: "src/index.ts",
    external: Object.keys(globals),
    output: [
      // {
      //   file: `./dist/jt-ui-components${isProduction ? '.min' : ''}.js`,
      //   format: 'umd',
      //   globals,
      //   name: "jt-ui-components",
      // },
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "jt-ui-components",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        name: "jt-ui-components",
      },
    ],
    plugins: [
      external(),
      resolve({ extensions, }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
      }),
      postcss({ extract: false, modules: true, use: ["sass"] }),
      visualizer(),
      isProduction ? terser() : null,
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
