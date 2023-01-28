import { IRecentlyMovedFolder } from "../../../../../../models";
import "./RecentlyMovedItem.style.scss";

interface IProps {
  item: IRecentlyMovedFolder;
  translationData: [string, string];
  className?: string;
}

export const RecentlyMovedItem = ({
  item,
  translationData,
  className,
}: IProps): JSX.Element => {
  const handleOpenFolder = () => {
    window.api.openRecentlyMoved(item.destination);
  };
  const date = new Date(item.time);
  return (
    <li className={`recently-moved-container ${className}`}>
      <button onClick={handleOpenFolder} className="recently-moved-btn">
        <div className="recently-moved__header">
          <span>{item.name}</span>
          <span>{`${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`}</span>
        </div>
        <div className="recently-moved__paths">
          <span>{`${translationData[0].toUpperCase()}: ${item.origin}`}</span>
          <span>{`${translationData[1].toUpperCase()}: ${
            item.destination
          }`}</span>
        </div>
      </button>
    </li>
  );
};
