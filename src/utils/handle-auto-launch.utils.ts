import path from "path"
import autoLauncher from "auto-launch"

const autoLauncherOptions = {
  name: 'Librarian',
  path: path.join(__dirname, "..", "..", "..", "..", "..", "..", "bin", "librarian2"),
}

console.log(__dirname)

export const appAutoLauncher = new autoLauncher(autoLauncherOptions)

/**
 * Disables the auto launch of the app.
 */
export const disableAutoLaunch = (): void => {
  appAutoLauncher.disable().then(() => {
    console.log("Auto lauch removed successfully!")
  }).catch((err) => {
    console.error(err)
  })
}

/**
 * Enables the auto launch of the app.
 */
export const enableAutoLaunch = (): void => {
  if (process.env.NODE_ENV === "development") return;
  appAutoLauncher.enable().then(() => {
    console.log("Auto lauch created successfully!")
  }).catch((err) => {
    console.error(err)
  })
}

/**
 * Toggles enabled/disabled the auto launch of the app.
 */
export const toggleAutoLaunch = (): void => {
  appAutoLauncher.isEnabled().then((isEnabled: boolean) => {
    console.log(`auto launch it's ${isEnabled}`)
    if (!isEnabled) {
      enableAutoLaunch();
    } else {
      disableAutoLaunch();
    }
  })
}
