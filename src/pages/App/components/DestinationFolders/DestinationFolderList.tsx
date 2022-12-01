import { useContext, useState } from "react";
import { LanguageContext } from "../../../../state";
import { Button } from "..";
import { IDestinationFolder } from "../../../../models";
import { DestinationFolder } from "./DestinationFolder";
import uuid from "react-uuid";

import "./DestinationFolderList.style.scss";

interface IProps {
  folders: IDestinationFolder[];
  updateFolders: (arg0: IDestinationFolder[]) => void;
}

export const DestinationFolderList = ({ folders, updateFolders }: IProps) => {
  const { getTranslated } = useContext(LanguageContext);
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const handleFolderClicked = (id: string): void => {
    console.log(`folder clicked ${id}`);
    setSelectedFolders(
      selectedFolders.includes(id)
        ? selectedFolders.filter((_id) => _id != id)
        : [...selectedFolders, id]
    );
  };
  const handleAddFolder = (): void => {
    console.warn("TODO: make this function");
  };
  const removeFolders = (): void => {
    setSelectedFolders([]);
    updateFolders([
      ...folders.filter((folder) => {
        !selectedFolders.includes(folder.id);
      }),
    ]);
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
            callback={removeFolders}
            type="delete"
          />
        )}
      </div>
    </div>
  );
};
