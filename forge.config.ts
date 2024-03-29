import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
// import { MakerDeb } from "@electron-forge/maker-deb";
//import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

import path from "path";
const iconsPath = path.join(__dirname, "assets", "icons");
const languagesPath = path.join(__dirname, "assets", "languages");

const config: ForgeConfig = {
  packagerConfig: {
    icon: path.join(iconsPath, "256x256"),
    extraResource: [iconsPath, languagesPath],
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    //new MakerZIP({}, ["darwin"]),
    new MakerZIP({}, ["win32", "linux"]),
    //new MakerRpm({}),
    // new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "filters_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
  ],
};

export default config;
