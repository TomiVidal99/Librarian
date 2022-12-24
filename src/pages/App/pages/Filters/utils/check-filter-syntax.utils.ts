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
          filter.content === "text";
        const formatCondition =
          f.content === filter.content && filter.content === "format";
        if (nameCondition || formatCondition) {
          warningAlert({
            title: ITextData.title,
            body: ITextData.body,
            foldername: folder.name,
            folderpath: folder.path,
          });
          return true;
        }
      })
    )
  )
    return false;
  return true;
};
