import { Menu, nativeImage, Tray } from "electron";
import path from "path";
import { useLanguage } from "../hooks";
import { LanguageContext } from "../state";
import { quitApp, toggleOpenMainWindow } from "../.";

export let tray: Tray;

const enum TRAY_PATHS {
  "ICON" = "assets/icons/tray.png",
  "CLEANING-1" = "assets/icons/tray-cleaning-1.png",
  "CLEANING-2" = "assets/icons/tray-cleaning-2.png",
}

/**
 * Returns the full relative path to a tray icon.
 * @returns {string} path
 */
const getTrayPaths = (icon: TRAY_PATHS): string => {
  return process.env.NODE_ENV === "development"
    ? icon
    : path.join(__dirname, icon);
};

/**
 * Creates the tray that 'holds' the app, when destroy the app it's closed.
 * TODO: get dynamic language
 */
export const createTray = (): void => {
  const iconPath = getTrayPaths(TRAY_PATHS.ICON);
  const icon = nativeImage.createFromPath(iconPath);

  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: "Configuraciones", type: "normal", click: toggleOpenMainWindow},
    { type: "separator" },
    { label: "Salir", type: "normal", click: quitApp },
  ]);

  tray.setContextMenu(contextMenu);

  tray.setToolTip("Librarian");
  tray.setTitle("Librarian");
};

/**
 * Destroy the tray icon
 */
export const destroyTray = (): void => {
  tray.destroy();
}
