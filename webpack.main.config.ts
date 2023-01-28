import type { Configuration } from "webpack";
import path from "path";

import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: [
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".css",
      ".json",
      ".scss",
      ".sass",
    ],
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@models": path.resolve(__dirname, "src/models"),
      "@state": path.resolve(__dirname, "src/state"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@services": path.resolve(__dirname, "src/services"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
};
