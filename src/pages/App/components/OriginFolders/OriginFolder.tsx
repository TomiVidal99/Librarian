import { IOriginFolder } from "../../../../models";

import "./OriginFolder.style.scss";

interface IProps {
  folder: IOriginFolder;
  selected: boolean;
  clickCallback: (arg0: string) => void;
}

export const OriginFolder = ({
  folder,
  selected,
  clickCallback,
}: IProps): JSX.Element => {
  return (
    <li aria-selected={selected} className="folder-container">
      <button
        onClick={() => {
          clickCallback(folder.id);
        }}
        className="folder"
      >
        <div className="folder__name">{folder.name}</div>
        <div className="folder__path">{folder.path}</div>
      </button>
    </li>
  );
};
