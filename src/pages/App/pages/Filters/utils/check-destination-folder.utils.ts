import { warningAlert } from "../../../../../utils/handle-alerts.utils";
import { IDestinationFolder } from "../../../../../models";

interface ITextData {
  title: string;
  body: string;
}

export const isValidDestinationFolder = ({
  folder,
  noFolderText,
  noFiltersText,
}: {
  folder: IDestinationFolder;
  noFolderText: ITextData;
  noFiltersText: ITextData;
}): boolean => {
  if (folder.name === "" || folder.path === "") {
    warningAlert({
      ...noFolderText,
      foldername: folder.name,
      folderpath: folder.path,
    });
    return false;
  }
  if (folder.filters.length === 0) {
    warningAlert({
      ...noFiltersText,
      foldername: folder.name,
      folderpath: folder.path,
    });
    return false;
  }
  return true;
};
