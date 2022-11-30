import { useContext } from "react";
import uuid from "react-uuid";
import { IOriginFolder } from "../../../../models";
import { LanguageContext } from "../../../../state";
import { OriginFolder } from "./OriginFolder";

import "./OriginFolders.style.scss";

interface IProps {
  folders: IOriginFolder[];
}

export const OriginFolders = ({ folders }: IProps) => {
  const { getTranslated } = useContext(LanguageContext);
  const handleAddOriginFolder = () => {
    console.log("TODO: make this function");
  };
  return (
    <div className="origin-folders-container">
      <div className="origin-folders__list-container">
        <p className="origin-folders__list-description capitalize">
          {getTranslated("originFoldersDescription")}
        </p>
        <ul className="origin-folders__list">
          {folders.length > 0 && folders.map((folder) => {
            return <OriginFolder key={uuid()} folder={folder} />;
          })}
        </ul>
      </div>
      <button
        onClick={handleAddOriginFolder}
        className="origin-folders__add-btn"
      >
        {getTranslated("addFolderButton")}
      </button>
    </div>
  );
};
