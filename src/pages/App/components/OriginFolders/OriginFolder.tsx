import { IOriginFolder } from "../../../../models";

import "./OriginFolder.style.scss"

interface IProps {
  folder: IOriginFolder;
}

export const OriginFolder = ({ folder }: IProps): JSX.Element => {
  return (
    <li className="folder-container">
      <div className="folder__name">{folder.name}</div>
      <div className="folder__path">{folder.path}</div>
    </li>
  );
};
