import { IDestinationFolder } from "../../../../../models";

export const isValidDestinationFolder = (folder: IDestinationFolder): boolean => {
  if (folder.name === "") return false;
  if (folder.path === "") return false;
  if (folder.filters.length === 0) return false;
  return true;
}
