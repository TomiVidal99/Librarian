import { IDestinationFolder } from "../../../../models";

import "./DestinationFolder.style.scss"

interface IProps {
  folder: IDestinationFolder;
  className?: string;
  selected: boolean;
  clickCallback: (arg0: string) => void;
}

export const DestinationFolder = ({
  folder,
  className,
  selected,
  clickCallback,
}: IProps): JSX.Element => {
  return (
    <li
      aria-selected={selected}
      className={`destination-folder-container ${className}`}
    >
      <button
        onClick={() => clickCallback(folder.id)}
        className="destination-folder"
      >
        <span className="destination-folder__name">{folder.name}</span>
        <span className="destination-folder__path">{folder.path}</span>
        <ul className="destination-folder__filters">
          {folder.filters.map( ({id, content, type}) => <li aria-label={type} key={id}>{content}</li>)}
        </ul>
      </button>
    </li>
  );
};
