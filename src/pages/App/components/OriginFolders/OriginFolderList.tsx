import { useContext, useState } from "react";
import uuid from "react-uuid";
import { Badge, Button } from "..";
import { IOriginFolder } from "../../../../models";
import { LanguageContext } from "../../../../state";
import { OriginFolder } from "./OriginFolder";

import "./OriginFolderList.style.scss";
import { createOriginFolder } from "./utils";

interface IProps {
  folders: IOriginFolder[];
  removeFolders: (arg0: IOriginFolder[]) => void;
  addFolders: (arg0: IOriginFolder[]) => void;
}

export const OriginFolderList = ({
  folders,
  addFolders,
  removeFolders,
}: IProps) => {
  const { getTranslated } = useContext(LanguageContext);
  const [selectedFolders, setSelectedFolders] = useState<string[]>(
    folders.length > 0 ? [folders[0].id] : []
  );
  const handleAddOriginFolder = async () => {
    // TODO: fix the warning message
    const foldersPaths = await window.api.pickAFolder(true);
    const originFolders: IOriginFolder[] = foldersPaths
      .map((folder) => createOriginFolder(folder, folders))
      .filter((folder) => {
        if (Array.isArray(folder)) {
          window.api.popWarning(
            "carpeta duplicada",
            "kalsdjakldjakldjaldksjldaskj"
          );
          return false;
        }
        return true;
      }) as IOriginFolder[];
    addFolders(originFolders);
  };
  const handleRemovedSelectedFolders = () => {
    removeFolders(folders.filter((f) => selectedFolders.includes(f.id)));
    setSelectedFolders([]);
  };
  const handleClickedFolder = (id: string) => {
    setSelectedFolders(
      selectedFolders.includes(id)
        ? selectedFolders.filter((_id) => _id !== id)
        : [...selectedFolders, id]
    );
  };
  return (
    <div className="origin-folders-container">
      <ul className="origin-folders__list">
        {folders.length > 0 ? (
          folders.map((folder) => {
            return (
              <OriginFolder
                key={uuid()}
                folder={folder}
                selected={selectedFolders.includes(folder.id)}
                clickCallback={handleClickedFolder}
              />
            );
          })
        ) : (
          <Badge
            type="warning"
            content={getTranslated("noOriginFoldersWarning")}
          />
        )}
      </ul>
      <div className="origin-folders__btns-container">
        <Button
          callback={handleAddOriginFolder}
          content={getTranslated("addFolderButton")}
          type="add"
        />
        {selectedFolders.length > 0 && (
          <Button
            callback={handleRemovedSelectedFolders}
            content={getTranslated("removeFoldersButton")}
            type="delete"
          />
        )}
      </div>
    </div>
  );
};
