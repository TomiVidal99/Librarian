/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement, useRef } from 'react';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import '../styles/DestinationFolder.global.css';
import FilterItem, { Filter } from './FilterItem';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
interface DestinationFolderProps {
  folder: string;
  path: string;
  filters: Filter[];
  clickedCallback: (arg0: boolean, arg1: string) => void;
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const itemSelectedClassName = 'list_item_selected' as const;
const DestinationFolder = ({
  folder,
  path,
  filters,
  clickedCallback,
}: DestinationFolderProps): ReactElement => {
  const itemRef = useRef<HTMLLIElement | null>(null);
  // toggle the class of selected and updates the state of all currently selected
  const handleClicked = () => {
    if (itemRef === null) return;
    itemRef?.current?.classList.toggle(itemSelectedClassName);
    clickedCallback(
      itemRef?.current?.classList.contains(itemSelectedClassName)
        ? itemRef.current.classList.contains(itemSelectedClassName)
        : false,
      folder
    );
    console.log('itemRef.current: ', itemRef?.current?.classList);
  };
  return (
    <li
      role="presentation"
      onClick={handleClicked}
      ref={itemRef}
      className="list_item destination_folder"
    >
      <div className="destination_folder__folder">
        {folder === '' ? path : folder}
      </div>
      <div className="destination_folder__path">{path}</div>
      <ul className="destination_folder__filters">
        {filters.map((filter: Filter) => {
          return (
            <FilterItem
              key={filter.id}
              id={filter.id}
              type={filter.type}
              content={filter.content}
            />
          );
        })}
      </ul>
    </li>
  );
};

export default DestinationFolder;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
