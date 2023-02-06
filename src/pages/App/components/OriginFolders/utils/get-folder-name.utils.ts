type OS_NAME = "Mac OS" | "iOS" | "Windows" | "Android" | "Linux";

/**
 * Returns the current OS with the browser resources.
 * @returns {OS_NAME} OS
 */
function getOS(): OS_NAME {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os: OS_NAME;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

/**
 * Returns weather the current OS it's windows or not.
 * @returns {boolean} isWindows
 */
function isWindowsOS(): boolean {
  if (getOS() === "Windows") {
    return true;
  } else {
    return false;
  }
}

/**
 * Returns the folder name of a given file path.
 * @returns string
 */
export function getFolderName({ filepath }: { filepath: string }): string {
  let separator = "/";

  if (isWindowsOS()) {
    separator = "\\";
  }

  const filename = filepath.split(separator).pop();

  console.log({ filepath, filename });

  return filename;

  // let filename: string;
  // window.api.getBasename(filepath).then((_name) => {
  //   filepath = _name;
  // }).catch((err) => {
  //   if (err) throw err;
  // });
  //
  // console.log({ filepath, filename });
  // return filename;
}
