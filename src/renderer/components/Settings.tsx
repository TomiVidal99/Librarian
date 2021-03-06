/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement, useReducer, useEffect, useState } from 'react';
import { initialState, StateContext } from 'renderer/contexts/StateContext';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import Header from './Header';
import RecentlyMoved from './RecentlyMoved';
import WatchedFolders from './WatchedFolders';
import DestinationFolders from './DestinationFolders';
import GeneralSettings from './GeneralSettings';
import Footer from './Footer';
import ACTIONS from '../STATE_ACTIONS';
import AppInformation from './AppInformation';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
// sets the ipcRenderer methods to be available globally
declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRendererMethodsType;
    };
  }
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REDUCER ~~~~~ */

const reducer = (state: StateType, action: any) => {
  switch (action.type) {
    case ACTIONS.UPDATE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.ADD_WATCHING_FOLDER:
      return {
        ...state,
        watchedFolders: [...state.watchedFolders, action.payload],
      };
    case ACTIONS.REMOVE_WATCHING_FOLDERS:
      return {
        ...state,
        watchedFolders: action.payload,
      };
    case ACTIONS.ADD_DESTINATION_FOLDER:
      // console.log('adding new destination folder to the state: ', action);
      return {
        ...state,
        destinationFolders: [
          ...state.destinationFolders,
          {
            folder: action.payload.folderpath.folder,
            path: action.payload.folderpath.path,
            date: new Date(),
            filters: [
              ...action.payload.names,
              ...action.payload.formats,
              ...action.payload.regexs,
            ],
          },
        ],
      };
    case ACTIONS.REMOVE_DESTINATION_FOLDERS:
      return {
        ...state,
        destinationFolders: action.payload,
      };
    case ACTIONS.ADD_RECENTLY_MOVED:
      return {
        ...state,
        recentlyMoved: [...state.recentlyMoved, action.payload],
      };
    default:
      return state;
  }
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN ~~~~~ */
const Settings = (): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [shouldUploadNewState, setShouldUploadNewState] =
    useState<boolean>(true);

  // updates the state
  const handleStateUpdate = (
    newState: StateType,
    shouldUpdateBackend: boolean
  ) => {
    // only update backend when the intial state it's passed to it.
    console.log('Updating state: ', newState);
    setShouldUploadNewState(shouldUpdateBackend);
    dispatch({ type: ACTIONS.UPDATE_STATE, payload: newState });
  };

  const handleNewDestinationFolder = (folder: any) => {
    // console.log('Got destination folder: ', folder);
    dispatch({
      type: ACTIONS.ADD_DESTINATION_FOLDER,
      payload: folder,
    });
  };

  // when a new file has been moved should push a new recentlyMoved to the state.
  const handleNewRecentlyMoved = (data: RecentlyMovedType): void => {
    dispatch({
      type: ACTIONS.ADD_RECENTLY_MOVED,
      payload: data,
    });
  };

  // updates the state on app init
  useEffect(() => {
    // TODO: maybe think a better way to do this???
    setTimeout(() => {
      window.electron.ipcRenderer.getInitialState((newState: StateType) =>
        handleStateUpdate(newState, true)
      );
      window.electron.ipcRenderer.getNewUpdatedState((newState: StateType) =>
        handleStateUpdate(newState, false)
      );
    }, 500);
    setTimeout(() => {
      window.electron.ipcRenderer.onNewDestinationFolder(
        handleNewDestinationFolder
      );
      window.electron.ipcRenderer.onNewRecentlyMoved(handleNewRecentlyMoved);
    }, 800);
  }, []);

  // upload state on update
  useEffect(() => {
    if (shouldUploadNewState) {
      console.log('Uploading new state to backend');
      //if (shouldUploadNewState) console.log(shouldUploadNewState);
      window.electron.ipcRenderer.uploadState(state);
    } else {
      setShouldUploadNewState(true);
    }
  }, [state]);

  return (
    <div className="settings">
      <Header />
      <StateContext.Provider
        value={{
          state,
          setState: dispatch,
        }}
      >
        <main className="main_container">
          <AppInformation />
          <RecentlyMoved />
          <WatchedFolders />
          <DestinationFolders />
          <GeneralSettings />
          <Footer />
        </main>
      </StateContext.Provider>
    </div>
  );
};

export default Settings;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
