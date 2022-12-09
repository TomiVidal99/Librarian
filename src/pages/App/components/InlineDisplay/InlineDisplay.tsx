import { useEffect, useState } from "react";
import { getFolderName } from "../OriginFolders/utils";
import "./InlineDisplay.style.scss";

interface IProps {
  placeholder: string;
  className?: string;
  clickCallback?: (arg0: {name: string; path: string}) => void;
}

export const InlineDisplay = ({
  className = "",
  placeholder,
  clickCallback,
}: IProps): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const handleClick = async (): Promise<void> => {
    const foldersPaths = await window.api.pickAFolder(false);
    if (foldersPaths === undefined || foldersPaths.length === 0) return;
    const path = foldersPaths[0];
    const name = getFolderName(path);
    setValue(path);
    clickCallback({name, path});
  }
  return (
    <input
      className={`inline-display ${className}`}
      placeholder={placeholder + "..."}
      value={value}
      onClick={handleClick}
      type="button"
    />
  );
};
