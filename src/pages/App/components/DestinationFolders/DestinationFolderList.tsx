import { useContext, useState } from "react";
import { LanguageContext } from "../../../../state";
import { Button } from "..";
import { IDestinationFolder } from "../../../../models";
import { DestinationFolder } from "./DestinationFolder";
import uuid from "react-uuid";

import "./DestinationFolderList.style.scss";

interface IProps {
  folders: IDestinationFolder[];
  removeFolders: (arg0: IDestinationFolder[]) => void;
  addFolders: (arg0: IDestinationFolder[]) => void;
}

export const DestinationFolderList = ({
  folders,
  removeFolders,
  addFolders,
}: IProps) => {
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
    // TODO
    console.warn("TODO");
  };
  const handleRemoveFolders = () => {
    removeFolders(folders.filter((f) => selectedFolders.includes(f.id)));
    setSelectedFolders([]);
  };
  return (
    <div className="destination-folders-container">
      <ul className="destination-folders__list">
        {folders.map((folder) => {
          return (
            <DestinationFolder
              key={uuid()}
              folder={folder}
              selected={selectedFolders.includes(folder.id)}
              clickCallback={handleFolderClicked}
            />
          );
        })}
      </ul>
      <div className="destination-folder__btns-container">
        <Button
          content={getTranslated("addFolderButton")}
          callback={handleAddFolder}
          type="add"
        />
        {selectedFolders.length > 0 && (
          <Button
            content={getTranslated("removeFoldersButton")}
            callback={handleRemoveFolders}
            type="delete"
          />
        )}
      </div>
    </div>
  );
};