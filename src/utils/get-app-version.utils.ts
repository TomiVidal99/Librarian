import { app } from "electron";
import { getTranslated } from ".";

/**
 * Returns the formatted app version
 *
 * @returns {string} [app version]
 */
export function getFormattedTrayTitle(): string {
  const appName = getTranslated("trayTitle");
  const versionNumber = app.getVersion();
  return `${appName} (v${versionNumber})`;
}
