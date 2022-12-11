import { IRecentlyMovedFolder } from "../../../../../../models";
import "./RecentlyMovedItem.style.scss";

interface IProps {
  item: IRecentlyMovedFolder;
  className?: string;
}

export const RecentlyMovedItem = ({ item, className }: IProps): JSX.Element => {
  const handleOpenFolder = () => {
    window.api.openRecentlyMoved(item.destination);
  };
  return (
    <li className={`recently-moved-container ${className}`}>
      <button onClick={handleOpenFolder} className="recently-moved-btn">
        <div className="recently-moved__header">
          <span>{item.name}</span>
          <span>{`${item.time.toLocaleTimeString()} - ${item.time.toLocaleDateString()}`}</span>
        </div>
        <div className="recently-moved__paths">
          <span>{item.origin}</span>
          <span>{item.destination}</span>
        </div>
      </button>
    </li>
  );
};
