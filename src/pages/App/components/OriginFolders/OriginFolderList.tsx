import { useContext, useState } from "react";
import uuid from "react-uuid";
import { Badge, Button } from "..";
import { IOriginFolder } from "../../../../models";
import { LanguageContext } from "../../../../state";
import { OriginFolder } from "./OriginFolder";

import "./OriginFolderList.style.scss";

interface IProps {
  folders: IOriginFolder[];
  updateFolders: (arg0: IOriginFolder[]) => void;
}

export const OriginFolderList = ({ folders, updateFolders }: IProps) => {
  const { getTranslated } = useContext(LanguageContext);
  const [selectedFolders, setSelectedFolders] = useState<string[]>(
    folders.length > 0 ? [folders[0].id] : []
  );
  const handleAddOriginFolder = () => {
    console.log("TODO: make this function");
  };
  const handleRemovedSelectedFolders = () => {
    console.log("TODO: make this function");
    updateFolders([
      ...folders.filter((folder) => {
        return !selectedFolders.includes(folder.id);
      }),
    ]);
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
          className="origin-folders__add-btn"
          content={getTranslated("addFolderButton")}
        />
        {selectedFolders.length > 0 && (
          <Button
            className="origin-folders__remove-btn"
            callback={handleRemovedSelectedFolders}
            content={getTranslated("removeFoldersButton")}
          />
        )}
      </div>
    </div>
  );
};
