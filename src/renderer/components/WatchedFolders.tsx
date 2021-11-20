/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement, useContext, useState } from 'react';
import { StateContext } from 'renderer/contexts/StateContext';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import { helperGetFolderFromPath } from 'renderer/utils/folderFromPaths';
import WatchedFolder from './WatchedFolder';
import NoItemsWarning from './NoItemsWarning';
import SelectFolders from './SelectFolders';
import Button from './Button';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
import ACTIONS from '../STATE_ACTIONS';
// interface WatchedFoldersProps {}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HELPER FUNCTIONS ~~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const WatchedFolders = (): ReactElement => {
  const { state, setState } = useContext(StateContext);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleDeleteFolders = () => {
    console.log('should delete folders');
    setState({
      type: ACTIONS.REMOVE_WATCHING_FOLDERS,
      payload: [
        ...state.watchedFolders.filter(
          ({ name }) => !selectedItems.includes(name)
        ),
      ],
    });
    setSelectedItems([]);
  };

  const addNewWatchingFolder = (folder: WatchedFolderType) => {
    setState({
      type: ACTIONS.ADD_WATCHING_FOLDER,
      payload: folder,
    });
  };

  const gotFolders = ({ canceled, filePaths }: SelectedFoldersType) => {
    if (canceled) return;
    // check if there's any folder that has been already selected
    if (state.watchedFolders.length === 0) {
      const watchedFolders: WatchedFolderType[] = [];
      filePaths.forEach((path) => {
        const folder = helperGetFolderFromPath(path);
        watchedFolders.push({
          name: folder,
          path,
          date: new Date(),
        });
      });
      setState({
        type: ACTIONS.UPDATE_STATE,
        payload: {
          watchedFolders,
        },
      });
    } else {
      filePaths.forEach((path) => {
        const hasBeenFoundFlag = false;
        state.watchedFolders.forEach((alreadyWatched) => {
          // console.log(`checking ${path} and ${alreadyWatched.path}`);
          if (path === alreadyWatched.path) {
            window.electron.ipcRenderer.notification(
              'Folder Already Being Observed',
              `The folder ${alreadyWatched.name}(${
                alreadyWatched.path
              }) it's already being watched, you've addded it ${alreadyWatched.date.toDateString()}. It won't be added to the list. 🙂`
            );
          }
        });
        // only pushes the new watching path if it hasnt been found in the current ones
        if (!hasBeenFoundFlag) {
          const folder = helperGetFolderFromPath(path);
          addNewWatchingFolder({
            name: folder,
            path,
            date: new Date(),
          });
        }
      });
    }
  };

  // when a folder has been clicked if the folder exists in the array should be removed, else should be added
  const handleItemHasBeenSelected = (
    willBeAdded: boolean,
    folderName: string
  ) => {
    // console.log(`will be added: ${willBeAdded} ${folderName}`);
    if (willBeAdded) {
      setSelectedItems([...selectedItems, folderName]);
    } else {
      setSelectedItems([
        ...selectedItems.filter((foldername) => foldername !== folderName),
      ]);
    }
  };

  return (
    <section className="watched_folders section">
      <h3 className="section__title">Origin Folders</h3>
      <ul className="list">
        {state.watchedFolders.length > 0 ? (
          state.watchedFolders.map((folder) => {
            return (
              <WatchedFolder
                key={folder.date.toString() + folder.name}
                folder={folder.name}
                path={folder.path}
                clickedCallback={handleItemHasBeenSelected}
              />
            );
          })
        ) : (
          <NoItemsWarning
            variant="watchedFolders"
            style={{ width: '80%', margin: 'auto' }}
          />
        )}
      </ul>
      {selectedItems.length > 0 ? (
        <Button
          content="Delete Selected Destination Paths"
          callback={handleDeleteFolders}
          type="delete"
        />
      ) : null}
      <SelectFolders
        buttonText="Add Folders"
        options={{
          title: 'Select Folders to be Observed',
          buttonLabel: 'Add Folders',
          properties: ['multiSelections', 'openDirectory'],
        }}
        parentWindow="Main"
        gotFoldersCallback={gotFolders}
      />
    </section>
  );
};

export default WatchedFolders;
