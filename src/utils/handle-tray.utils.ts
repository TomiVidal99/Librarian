import { Menu, nativeImage, Tray } from "electron";
import path from "path";
import { getTranslated } from ".";
import { quitApp, toggleOpenMainWindow } from "../.";

const ANIMATION_TIME_INTERVAL = 500;

let TRAY_MENU: Menu;

export let tray: Tray;
export let trayAnimationInterval: NodeJS.Timer;

const enum TRAY_PATHS {
  "ICON" = "tray.png",
  "CLEANING-1" = "tray-cleaning-1.png",
  "CLEANING-2" = "tray-cleaning-2.png",
}

/**
 * Returns the full relative path to a tray icon.
 * @returns {string} path
 */
const getTrayPaths = (icon: TRAY_PATHS): string => {
  return process.env.NODE_ENV === "development"
    ? path.join("assets", "icons", icon)
    : path.join(__dirname, "..", "..", "..", "icons", icon);
};

/**
 * Creates the tray that 'holds' the app, when destroy the app it's closed.
 */
export const createTray = (): void => {
  const iconPath = getTrayPaths(TRAY_PATHS.ICON);
  const icon = nativeImage.createFromPath(iconPath);

  tray = new Tray(icon);

  TRAY_MENU = Menu.buildFromTemplate([
    {
      id: "traySettings",
      label: "",
      type: "normal",
      click: toggleOpenMainWindow,
    },
    { type: "separator" },
    {
      id: "trayQuit",
      label: "",
      type: "normal",
      click: quitApp,
    },
  ]);

  tray.setContextMenu(TRAY_MENU);

  updateTrayText();
};

/**
 * Updates the text of the tooltip and the menu accordingly to the language.
 * @returns {void} void
 */
export const updateTrayText = (): void => {
  TRAY_MENU.items.forEach((item) => {
    if (item.id) {
      item.label = getTranslated(item.id);
    }
  });
  const items = TRAY_MENU.items;
  console.log({items})
  tray.setContextMenu(TRAY_MENU);
  tray.setToolTip(getTranslated("trayToolTip"));
  tray.setTitle(getTranslated("trayTitle"));
};

/**
 * Destroy the tray icon
 */
export const destroyTray = (): void => {
  tray.destroy();
};

/**
 * Tray icon animation for when the app it's moving a file
 */
export const startMovingFileAnimation = (): void => {
  const pathDefault = getTrayPaths(TRAY_PATHS.ICON);
  const pathMoving1 = getTrayPaths(TRAY_PATHS["CLEANING-1"]);
  const pathMoving2 = getTrayPaths(TRAY_PATHS["CLEANING-2"]);
  const iconDefault = nativeImage.createFromPath(pathDefault);
  const iconsMoving = [
    nativeImage.createFromPath(pathMoving1),
    nativeImage.createFromPath(pathMoving2),
  ];

  tray.setToolTip(getTranslated("trayMovingFileToolTip"));

  let selectedImage = 0;
  let count = 0;
  trayAnimationInterval = setInterval(() => {
    if (count > 4) {
      tray.setImage(iconDefault);
      tray.setToolTip(getTranslated("trayToolTip"));
      clearInterval(trayAnimationInterval);
      return;
    }
    tray.setImage(iconsMoving[selectedImage]);
    selectedImage = count % 2;
    count++;
  }, ANIMATION_TIME_INTERVAL);
};

/**
 * Clears intervals and timeouts used in animations.
 */
export const cleanTrayAnimations = (): void => {
  if (trayAnimationInterval) {
    clearInterval(trayAnimationInterval);
  }
};
