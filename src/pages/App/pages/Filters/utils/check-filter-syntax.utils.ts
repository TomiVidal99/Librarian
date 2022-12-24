import { warningAlert } from "../../../../../utils/handle-alerts.utils";
import { IDestinationFolder, IFilter } from "../../../../../models";

interface ITextData {
  title: string;
  body: string;
}

export const isFilterCorrect = (
  filter: IFilter,
  destinationFolders: IDestinationFolder[],
  ITextData: ITextData
): boolean => {
  // TODO: make a more robust checking
  if (filter.content === "") return false;
  // check if some filter has been repeted
  if (
    filter.type !== "regex" &&
    destinationFolders.some((folder) =>
      folder.filters.some((f) => {
        const nameCondition =
          (f.content.includes(filter.content) ||
            filter.content.includes(f.content)) &&
          filter.type === "name" && f.type === "name";
        const formatCondition =
          filter.content === f.content && filter.type === "format" && f.type === "format";
        if (nameCondition || formatCondition) {
          warningAlert({
            title: ITextData.title,
            body: ITextData.body,
            foldername: folder.name,
            folderpath: folder.path,
          });
          return true;
        }
        return false;
      })
    )
  )
    return false;
  return true;
};
