/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement, useContext, useState } from 'react';
import { StateContext } from 'renderer/contexts/StateContext';
import ACTIONS from 'renderer/STATE_ACTIONS';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import DestinationFolder from './DestinationFolder';
import Button from './Button';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
// import {Filter} from 'FilterItem';
// interface DestinationFoldersProps {}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HELPER FUNCTIONS ~~~~~ */
import NoItemsWarning from './NoItemsWarning';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const DestinationFolders = (): ReactElement => {
  const { state, setState } = useContext(StateContext);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // opens a new window with the menu for adding a new destination folder
  const handleOpenDestinationFolderMenu = () => {
    // console.log('Should send message to ipcRenderer');
    window.electron.ipcRenderer.openDestinationFolderMenu();
  };

  const handleItemSelected = (isSelected: boolean, path: string) => {
    console.log('Item has been selected: ', isSelected, ' ', path);
    if (isSelected) {
      setSelectedItems([...selectedItems, path]);
    } else {
      setSelectedItems([
        ...selectedItems.filter((selectedPath) => selectedPath !== path),
      ]);
    }
  };

  // updates the state removing the selected destination folders
  const handleRemoveSelectedItems = () => {
    setState({
      type: ACTIONS.REMOVE_DESTINATION_FOLDERS,
      payload: [
        ...state.destinationFolders.filter(
          ({ folder }) => !selectedItems.includes(folder)
        ),
      ],
    });
    // clean the removing list
    setSelectedItems([]);
  };

  return (
    <section className="destination_folders section">
      <h3 className="section__title">Destination Folders</h3>
      <ul className="list">
        {state.destinationFolders.length > 0 ? (
          state.destinationFolders.map(({ folder, path, filters }) => {
            return (
              <DestinationFolder
                key={path}
                path={path}
                folder={folder}
                filters={filters}
                clickedCallback={handleItemSelected}
              />
            );
          })
        ) : (
          <NoItemsWarning
            variant="destinationFolders"
            style={{ width: '80%', margin: 'auto' }}
          />
        )}
      </ul>
      {selectedItems.length > 0 ? (
        <Button
          callback={handleRemoveSelectedItems}
          content="Remove Selected Folders"
          type="delete"
        />
      ) : null}
      <Button
        content="Add a Folder"
        callback={handleOpenDestinationFolderMenu}
      />
    </section>
  );
};

export default DestinationFolders;
