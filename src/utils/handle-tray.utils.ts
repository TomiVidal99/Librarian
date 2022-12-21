import { Menu, nativeImage, Tray } from "electron";
import path from "path";
import { quitApp, toggleOpenMainWindow } from "../.";

const ANIMATION_TIME_INTERVAL = 500;

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
  const p = process.env.NODE_ENV === "development"
    ? icon
    : path.join(__dirname, "..", "..", "..", "icons", icon);
  return p
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
    { label: "Configuraciones", type: "normal", click: toggleOpenMainWindow },
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

/**
 * Tray icon animation for when the app it's moving a file
 */
export const startMovingFileAnimation = (): void => {
  const pathDefault = getTrayPaths(TRAY_PATHS.ICON);
  const pathMoving1 = getTrayPaths(TRAY_PATHS["CLEANING-1"]);
  const pathMoving2 = getTrayPaths(TRAY_PATHS["CLEANING-2"]);
  const iconDefault = nativeImage.createFromPath(pathDefault);
  const iconsMoving = [nativeImage.createFromPath(pathMoving1), nativeImage.createFromPath(pathMoving2)];

  // TODO: apply language
  tray.setToolTip("moving file...");

  let selectedImage = 0;
  let count = 0;
  trayAnimationInterval = setInterval(() => {
    if (count > 4) {
      tray.setImage(iconDefault);
      tray.setToolTip("Librarian"); // TODO
      clearInterval(trayAnimationInterval);
      return;
    }
    tray.setImage(iconsMoving[selectedImage]);
    selectedImage = count % 2;
    count++;
  }, ANIMATION_TIME_INTERVAL)

}

/**
 * Clears intervals and timeouts used in animations.
 */
export const cleanTrayAnimations = (): void => {
  if (trayAnimationInterval) {
    clearInterval(trayAnimationInterval);
  }
}
