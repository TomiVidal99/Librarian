import fs from "fs"

/**
 * Returns weather the file given still exists or not.
 *
 * @param {string} file - [filepath]
 * @returns {Promise<boolean>} [weather the file does or not exist]
 */
export function fileExits(file: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    })
  })
}
