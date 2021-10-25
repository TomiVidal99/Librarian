/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog,
  Notification,
  Menu,
  Tray,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
// import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

import {
  updateWatcher,
  // initializeWatcher,
  // unWatchAll,
  getWatched,
  shutdownWatcher,
  handleNewFileDetected,
  SortingReturnType,
  getFolderNameFromPath,
} from './handleSorting';

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GLOBAL DEFINITIONS ~~~~~ */
const Store = require('electron-store');

let appName: string = process.env.npm_package_productName
  ? process.env.npm_package_productName
  : 'Librarian';
let appVersion: string = process.env.npm_package_version
  ? process.env.npm_package_version
  : 'No version found';
if (app.isPackaged) {
  // TODO: think a better way to do this
  appName = 'Librarian';
  appVersion = '1.0.0';
}

app.setName(appName);

let isMainWindowShown = false;
let tray: Tray | null = null;
let state: StateType | null = null;
let mainWindow: BrowserWindow | null = null;

// define instance of the data storage
const store = new Store();

let destinationFolderWindow: BrowserWindow | null = null;

const INDEX_PAGE_PATH: string = resolveHtmlPath('index.html');
const FILTERS_PAGE_PATH = INDEX_PAGE_PATH.concat('#filters');

const IPC_CHANNELS = {
  NOTIFICATION: 'notification',
  SEND_INTIAL_STATE: 'get-initial-state',
  GET_UPDATED_STATE: 'upload-state',
  OPEN_DESTINATION_FOLDER_MENU: 'open-destination-folder-menu',
  OPEN_DIALOG_SELECT_FOLDERS: 'open-dialog-folders',
  RECIEVE_DESTINATION_FOLDER: 'renderer-to-main-destination-folder',
  SEND_NEW_DESTINATION_FOLDER: 'main-to-renderer-destination-folder',
  DISPLAY_WATCHED_FOLDERS: 'get-watched',
  REMOVE_WATCHED: 'remove-watched',
  PUSH_RECENTLY_MOVED: 'get-recently-moved',
  OPEN_FOLDER: 'open-folder',
  DELETE_STATE: 'delete-state',
};

// opens and closes the settings window panel.
const toggleSettingsWindow = (): void => {
  // console.log('Called toggle settings window');

  if (mainWindow === null) return;

  if (isMainWindowShown) {
    mainWindow.hide();
  } else {
    mainWindow.show();
    mainWindow.focus();
  }

  isMainWindowShown = !isMainWindowShown;
};

// adds a new recentlyMoved folder to the renderer.
const pushRecentlyMoved = (origin: string, destination: string, time: Date) => {
  console.log(
    `Adding new recentlyMoved, from: ${origin} to: ${destination}, on ${time}`
  );
  mainWindow?.webContents.send(IPC_CHANNELS.PUSH_RECENTLY_MOVED, {
    name: getFolderNameFromPath(origin),
    origin,
    destination,
    time,
  });
};

type HandleTrayClickType =
  | 'move archives'
  | 'auto launch'
  | 'notifications'
  | 'add filter notifications';
const handleTrayClick = (checkbox: HandleTrayClickType): void => {
  // TODO
  console.log('TODO handle clicked tray checkbox', checkbox);
};

const handleAppQuit = () => {
  mainWindow?.close();
  if (process.platform !== 'darwin') {
    app.quit();
  }
  app.exit(0);
};

const createTrayMenu = (language: string, version: string): Menu => {
  return Menu.buildFromTemplate([
    {
      type: 'normal',
      label: `${appName} Settings`,
      click: toggleSettingsWindow,
    },
    { type: 'separator' },
    {
      label: 'Move archives',
      type: 'checkbox',
      click: () => {
        handleTrayClick('move archives');
      },
    },
    {
      label: 'Auto launch',
      type: 'checkbox',
      click: () => {
        handleTrayClick('auto launch');
      },
    },
    {
      label: 'Notifications',
      type: 'checkbox',
      click: () => {
        handleTrayClick('notifications');
      },
    },
    {
      label: 'Add filter notifications',
      type: 'checkbox',
      click: () => {
        handleTrayClick('add filter notifications');
      },
    },
    { type: 'separator' },
    {
      type: 'normal',
      label: language,
    },
    {
      type: 'normal',
      label: version,
    },
    {
      type: 'normal',
      label: 'Quit App',
      click: handleAppQuit,
    },
  ]);
};

// TODO: fix this, update only if the state changes
// const shouldUpdateTrayMenu = (newState: StateType) => {
const shouldUpdateTrayMenu = () => {
  if (tray === null || state === null) return;

  // check if should update the menu
  // TODO: make this only update when the language or the appVersion has changed.
  // if (
  // state.language === newState.language &&
  // state.appVersion === newState.appVersion
  // )
  // return;

  // console.log('updating tray menu');

  const contextMenu = createTrayMenu(
    // 'Language: '.concat(state.language),
    // TODO: update this when adding language support
    'Language: '.concat('en-US'),
    'Version: '.concat(state.appVersion)
  );
  tray.setContextMenu(contextMenu);
};

// handles the animation when a file is moving, switches the icon between: tray-cleaning-1.png and tray-cleaning-2.png
const handleMovingFileAnimatons = (): void => {
  // TODO: refactor this helper
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  if (tray === null) return;
  let counter = 0;

  const trayCleaningIconPath1 = path.join(
    getAssetPath('icons/tray-cleaning-1.png')
  );
  const trayCleaningIconPath2 = path.join(
    getAssetPath('icons/tray-cleaning-2.png')
  );
  // const trayCleaningIconPath1 = path.join(
  // __dirname,
  // '../../assets/icons/tray-cleaning-1.png'
  // );
  // const trayCleaningIconPath2 = path.join(
  // __dirname,
  // '../../assets/icons/tray-cleaning-2.png'
  // );

  tray.setTitle(`cleaning... | ${appName}`);

  let trayAnimation1IsActive = false;
  const trayCleaningAnimation: NodeJS.Timer = setInterval(() => {
    if (counter === 6) {
      clearInterval(trayCleaningAnimation);
      tray?.setImage(getAssetPath('icons/tray.png'));
      tray?.setTitle(`${appName}`);
      counter = 0;
    } else {
      if (trayAnimation1IsActive) {
        tray?.setImage(trayCleaningIconPath1);
      } else {
        tray?.setImage(trayCleaningIconPath2);
      }
      trayAnimation1IsActive = !trayAnimation1IsActive;
      counter += 1;
    }
  }, 800);
};

const createTray = (): void => {
  // TODO: refactor this helper
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  // const trayIconPath = path.join(__dirname, '../../assets/icons/tray.png');
  tray = new Tray(getAssetPath('icons/tray.png'));

  tray.setTitle(appName);
  tray.setToolTip(appName);

  // Make a change to the context menu
  // contextMenu.items[1].checked = false;

  const contextMenu = createTrayMenu(
    'Language: '.concat(state?.language ? state.language : ''),
    'Version: '.concat(state?.appVersion ? state.appVersion : '')
  );

  // Call this again for Linux because we modified the context menu
  tray.setContextMenu(contextMenu);

  // only works on windows
  tray.on('click', toggleSettingsWindow);
  tray.on('double-click', toggleSettingsWindow);
};

// notifies the user what happened with the new file.
const fileMovedNotifications = (
  message: SortingReturnType,
  origin: string,
  destination: string
) => {
  const title = 'New File Found';
  let body = '';
  switch (message) {
    case 'moved':
      body = 'File organized successfully';
      handleMovingFileAnimatons();
      break;
    case 'not sorted':
      body =
        'There was no filter for the new file, we recommend you to add more filters!';
      break;
    case 'could not be moved':
      body =
        'There was a problem when trying to move the file, check on file permissions and / or disk space!;';
      break;
    default:
      console.error(
        'Notification defaulted to error, check why there was a error on message. Expected <HandleSortFileReturnType> and got: ',
        message
      );
  }
  new Notification({ title, body }).show();
  pushRecentlyMoved(origin, destination, new Date());
};

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// sets the data of the hole app on init with the default configuration if the user hasnt set any.
const handleGetLocalData = async () => {
  // console.log('updating local state with initial configuration...');
  const storedData = store.get('state');
  if (storedData === undefined) {
    // set the default configuration.
    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');
    const defaultConfiguration = require(path.join(
      RESOURCES_PATH,
      'configuration/default.json'
    ));
    state = await JSON.parse(defaultConfiguration);
    // console.log('didnt have stored data: ', state);
  } else {
    // updates the configuration with the stored one.
    state = await JSON.parse(storedData);
    // console.log('got stored data: ', state);
  }
};

// updates the local state with the new one from the settings panel.
const updateLocalData = (newState: StateType) => {
  // console.log('updating local data with new state...');
  shouldUpdateTrayMenu();
  state = newState;
  store.set('state', JSON.stringify(newState));
};

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createMainWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    // show: true,
    show: false,
    width: 1024,
    height: 728,
    minWidth: 600,
    minHeight: 600,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      // devTools: true,
      devTools: false,
      nativeWindowOpen: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL(INDEX_PAGE_PATH);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/main/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    // if (!mainWindow) {
    // throw new Error('"mainWindow" is not defined');
    // }
    // if (process.env.START_MINIMIZED) {
    // mainWindow.minimize();
    // } else {
    // mainWindow.show();
    // mainWindow.focus();
    // }

    handleGetLocalData();
  });

  mainWindow.on('close', (e) => {
    e.preventDefault();
    toggleSettingsWindow();
  });

  mainWindow.on('closed', () => {
    destinationFolderWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Open urls in the user's browser
  // mainWindow.webContents.on('new-window', (event, url) => {
  // event.preventDefault();
  // shell.openExternal(url);
  // });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line

  // TODO: should make an auto updater
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

// dont close the app on all windows closed
app.on('window-all-closed', (event: any) => {
  event.preventDefault();
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  // if (process.platform !== 'darwin') {
  // app.quit();
  // }
});

app.on('before-quit', () => {
  // should remove all watchers
  shutdownWatcher()
    .then(() => {
      console.log('Watcher removed successfully');
      return true;
    })
    .catch((err: any) => {
      throw err;
    });
});

app
  .whenReady()
  .then(() => {
    createMainWindow();
    createTray();
    return true;
  })
  .catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createMainWindow();
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ IPC MAIN ~~~~~ */

// load the initial state when the app is ready
ipcMain.handle(IPC_CHANNELS.SEND_INTIAL_STATE, () => {
  // console.log('the state sent was: ', { ...state, appVersion });
  return {
    ...state,
    appVersion,
  };
});

// open dialog to select folders
ipcMain.handle(
  IPC_CHANNELS.OPEN_DIALOG_SELECT_FOLDERS,
  async (event: any, options: any) => {
    console.log('event: ', event);
    const folders = await dialog.showOpenDialog(options);
    // console.log('sending folders: ', folders);
    return folders;
  }
);

// opens a new window to add a new destiantion folder
ipcMain.on(IPC_CHANNELS.OPEN_DESTINATION_FOLDER_MENU, () => {
  // console.log('SHOULD OPEN NEW WINDOW');
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  destinationFolderWindow = new BrowserWindow({
    parent: mainWindow || undefined,
    center: true,
    modal: true,
    closable: true,
    show: false,
    alwaysOnTop: true,
    resizable: false,
    width: 1024,
    height: 728,
    minWidth: 320,
    minHeight: 480,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      devTools: false,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  destinationFolderWindow.setMenu(null);
  destinationFolderWindow.loadURL(FILTERS_PAGE_PATH);
  destinationFolderWindow.on('ready-to-show', () => {
    if (destinationFolderWindow !== null) destinationFolderWindow.show();
  });
  destinationFolderWindow.on('closed', () => {
    destinationFolderWindow = null;
  });
});

// when a new destination folder it's sent by the renderer this catches the call and responds with a message and the folder information to the Settings window.
ipcMain.on(
  IPC_CHANNELS.RECIEVE_DESTINATION_FOLDER,
  (event: any, folder: StateType): void => {
    // console.log('got folder on main, sending to settings window: ', folder);
    if (mainWindow !== null) {
      mainWindow.webContents.send(
        IPC_CHANNELS.SEND_NEW_DESTINATION_FOLDER,
        folder
      );
    } else {
      console.error("mainWindow it's null", event);
    }
  }
);

// creates a notification that pops up
ipcMain.on(
  IPC_CHANNELS.NOTIFICATION,
  (event: any, title: string, body: string): void => {
    console.log('event: ', event);
    new Notification({ title, body }).show();
  }
);

// gets the updated state once the user has changed it
ipcMain.on(
  IPC_CHANNELS.GET_UPDATED_STATE,
  (event: any, newState: StateType) => {
    console.log('Got new updated state: ');
    // console.log('Got new updated state: ', newState);
    updateWatcher(newState, (type: string, filepath: string) => {
      handleNewFileDetected(state, type, filepath, fileMovedNotifications);
    });
    updateLocalData(newState);
    return event;
  }
);

// returns the watched folders to the renderer so they can be showed
ipcMain.handle(IPC_CHANNELS.DISPLAY_WATCHED_FOLDERS, () => {
  return getWatched();
});

ipcMain.on(IPC_CHANNELS.REMOVE_WATCHED, () => {
  shutdownWatcher();
});

ipcMain.on(IPC_CHANNELS.OPEN_FOLDER, (event: any, filepath: string) => {
  // console.log('should reveal folder in file manager: ', folder);
  console.log('event: ', event);
  shell.showItemInFolder(filepath);
});

ipcMain.on(IPC_CHANNELS.DELETE_STATE, (event: any) => {
  console.log('state deleted', event);
  store.delete('state');
});
