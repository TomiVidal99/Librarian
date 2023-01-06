import path from "path"
import autoLauncher from "auto-launch"
import { getState, saveState } from "."

const autoLauncherOptions = {
  name: 'Librarian',
  path: path.join(__dirname, "..", "..", "..", "..", "..", "..", "bin", "librarian2"),
}
export const appAutoLauncher = new autoLauncher(autoLauncherOptions)

/**
 * Disables the auto launch of the app.
 */
export function disableAutoLaunch(): void {
  appAutoLauncher.isEnabled().then((isEnabled: boolean) => {
    if (!isEnabled)
      return
    appAutoLauncher.disable().then(() => {
      console.log("Auto lauch removed successfully!")
      const state = getState();
      saveState({...state, autoLaunch: false});
    }).catch((err) => {
      console.error(err)
    })
  })
}

/**
 * Enables the auto launch of the app.
 */
export function enableAutoLaunch(): void {
  if (process.env.NODE_ENV === "development")
    return
  appAutoLauncher.isEnabled().then((isEnabled: boolean) => {
    if (isEnabled)
      return
    appAutoLauncher.enable().then(() => {
      const state = getState();
      saveState({...state, autoLaunch: true});
      console.log("Auto lauch created successfully!")
    }).catch((err) => {
      console.error(err)
    })
  })
}

/**
 * Returns weather the auto launch it's active or not.
 * @returns {Promise<boolean>} autoLaunchEnabled
 */
export function isAutoLaunchEnabled(): Promise<boolean> {
  return appAutoLauncher.isEnabled();
}
