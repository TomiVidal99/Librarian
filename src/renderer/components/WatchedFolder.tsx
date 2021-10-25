/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement, useRef } from 'react';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import '../styles/WatchedFolder.global.css';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
interface WatchedFolderProps {
  path: string;
  folder: string;
  clickedCallback: (arg0: boolean, arg1: string) => void;
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const itemSelectedClass = 'list_item_selected';
const WatchedFolder = ({
  path,
  folder,
  clickedCallback,
}: WatchedFolderProps): ReactElement => {
  const itemRef = useRef<HTMLLIElement | null>(null);
  const handleClicked = () => {
    if (itemRef === null) return;
    itemRef?.current?.classList.toggle(itemSelectedClass);
    clickedCallback(
      itemRef?.current?.classList?.contains(itemSelectedClass)
        ? itemRef.current.classList.contains(itemSelectedClass)
        : false,
      folder
    );
  };
  return (
    <li
      role="presentation"
      ref={itemRef}
      onClick={handleClicked}
      className="watched_folder list_item"
    >
      <div className="watched_folder__folder">
        {folder === '' ? path : folder}
      </div>
      <div className="watched_folder__path">{path}</div>
    </li>
  );
};

export default WatchedFolder;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
