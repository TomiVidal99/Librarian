import { warningAlert } from "../../../../../utils/handle-alerts.utils";
import { IDestinationFolder } from "../../../../../models";

const MAX_FILTERS_WARNING = 5;

interface ITextData {
  title: string;
  body: string;
}

export const isValidDestinationFolder = ({
  folder,
  noFolderText,
  noFiltersText,
  maxFiltersText,
}: {
  folder: IDestinationFolder;
  noFolderText: ITextData;
  noFiltersText: ITextData;
  maxFiltersText: ITextData;
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
  if (folder.filters.length > MAX_FILTERS_WARNING) {
    warningAlert({
      ...maxFiltersText,
      foldername: folder.name,
      folderpath: folder.path,
    });
    return true;
  }
  return true;
};
