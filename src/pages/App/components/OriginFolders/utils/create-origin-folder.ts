import uuid from "react-uuid";
import { getFolderName } from ".";
import { IOriginFolder } from "../../../../../models";

export type RepeatedFolderDataType = [string, string];

export const createOriginFolder = (
  path: string,
  folders: IOriginFolder[]
): IOriginFolder | RepeatedFolderDataType => {
  const name = getFolderName(path);
  if (doesFolderAlreadyExist(name, path, folders)) return [name, path];
  const newFolder: IOriginFolder = {
    id: uuid(),
    name,
    path,
    date: new Date(),
  };
  return newFolder;
};

const doesFolderAlreadyExist = (
  name: string,
  path: string,
  folders: IOriginFolder[]
): boolean => {
  let foundFlag = false;

  folders.forEach((folder) => {
    console.log(folder);
    if (name === folder.name || path === folder.path) foundFlag = true;
    console.log(foundFlag);
  });

  return foundFlag;
};
