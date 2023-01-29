import { useContext, useState } from "react";
import { LanguageContext } from "../../../../state";
import { Badge, Button } from "..";
import { IDestinationFolder } from "../../../../models";
import { DestinationFolder } from "./DestinationFolder";

import "./DestinationFolderList.style.scss";

interface IProps {
  folders: IDestinationFolder[];
  removeFolders: (arg0: IDestinationFolder[]) => void;
}

export const DestinationFolderList = ({ folders, removeFolders }: IProps) => {
  const { getTranslated } = useContext(LanguageContext);
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const handleFolderClicked = (id: string): void => {
    setSelectedFolders(
      selectedFolders.includes(id)
        ? selectedFolders.filter((_id) => _id != id)
        : [...selectedFolders, id]
    );
  };
  const handleAddFolder = () => {
    window.api.openFiltersWindow();
  };
  const handleRemoveFolders = () => {
    removeFolders(folders.filter((f) => !selectedFolders.includes(f.id)));
    setSelectedFolders([]);
  };
  const handleEditFolder = () => {
    window.api.editDestinationFolder(selectedFolders[0]);
  };
  return (
    <div className="destination-folders-container">
      <ul className="destination-folders__list">
        {folders.length === 0 ? (
          <Badge
            type="warning"
            content={getTranslated("noDestinationFoldersWarning")}
          />
        ) : (
          folders.map((folder) => {
            return (
              <DestinationFolder
                key={folder.id}
                folder={folder}
                selected={selectedFolders.includes(folder.id)}
                clickCallback={handleFolderClicked}
              />
            );
          })
        )}
      </ul>
      <div className="destination-folder__btns-container">
        <Button
          content={getTranslated("addFolderButton")}
          callback={handleAddFolder}
          type="add"
          important={true}
        />
        {selectedFolders.length === 1 && (
          <Button
            content={getTranslated("editFoldersButton")}
            callback={handleEditFolder}
            type="edit"
            important={true}
          />
        )}
        {selectedFolders.length > 0 && (
          <Button
            content={getTranslated("removeFoldersButton")}
            callback={handleRemoveFolders}
            type="delete"
            important={true}
          />
        )}
      </div>
    </div>
  );
};
