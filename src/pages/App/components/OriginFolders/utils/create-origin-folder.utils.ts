import { IOriginFolder } from "@models";
import uuid from "react-uuid";
import { getFolderName } from ".";

export type RepeatedFolderDataType = [string, string];

/**
 * Returns an origin folder if it doesn't exist, else returns the name and the filepath to throw a message.
 * @returns {IOriginFolder | RepeatedFolderDataType} newFolder or tuple
 */
export function createOriginFolder(
  filepath: string,
  folders: IOriginFolder[]
): IOriginFolder | RepeatedFolderDataType {
  const name = getFolderName({ filepath });
  if (doesFolderAlreadyExist(name, filepath, folders)) return [name, filepath];
  const newFolder: IOriginFolder = {
    id: uuid(),
    name,
    path: filepath,
    date: new Date(),
  };
  return newFolder;
}

/**
 * Returns true if a folder with that name or path already exists.
 * @param {string} name
 * @param {string} path
 * @param {IOriginFolder[]} folders
 * @returns {boolean} foundFlag
 */
function doesFolderAlreadyExist(
  name: string,
  path: string,
  folders: IOriginFolder[]
): boolean {
  let foundFlag = false;

  folders.forEach((folder) => {
    if (name === folder.name || path === folder.path) foundFlag = true;
  });

  return foundFlag;
}
