import fs from 'fs';
import path from 'path';
import { FSWatcher } from 'chokidar';
import * as chokidar from 'chokidar';

let watcher: FSWatcher;

const defaultOptions = {
  ignored: /(^|[/\\])\../, // ignore dots...
  persistent: true,

  ignoreInitial: true,
  followSymlinks: true,
  cwd: '/',
  disableGlobbing: false,

  usePolling: false,
  interval: 100,
  binaryInterval: 300,
  alwaysStat: false,
  depth: 0,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },

  ignorePermissionErrors: false,
  atomic: true, // or a custom 'atomicity delay', in milliseconds (default 100)
};

// move a file: returns true if moved successfully
export const moveToDestination = (
  origin: string,
  destination: string
): boolean => {
  // TODO: for the moment the copy will create a new copy with an index if the origin file already exists, think a better way to do this.
  // console.log(`Moving file: from ${origin}, to: ${destination}`);
  let destinationFileIndex = 1;
  let dest: string = origin;

  const addIndexPattern = (filepath: string, index: number): string => {
    return filepath.concat(` (${index})`);
  };

  // add index when the origin file already exists
  if (fs.existsSync(origin)) {
    while (fs.existsSync(addIndexPattern(destination, destinationFileIndex)))
      destinationFileIndex += 1;

    dest = addIndexPattern(destination, destinationFileIndex);
  }

  try {
    // moves the file
    fs.renameSync(origin, dest);
    console.log(`Moved from ${origin}, to: ${dest}`);
    return true;
  } catch {
    console.log(`Could not moved ${origin}`);
    return false;
  }
};

export const getFolderNameFromPath = (filepath: string) => {
  return filepath.split('/')[filepath.split('/').length - 1];
};

// when a new file has been added to a watched folder it should be sorted.
export type SortingReturnType = 'moved' | 'could not be moved' | 'not sorted';
type HandleSortFileReturnType = [SortingReturnType, string];
export const handleSortFile = (
  state: StateType,
  filepath: string
): HandleSortFileReturnType => {
  // TODO: priority the name sorting, think a better way to handle this.
  console.log(`Will sort: ${filepath}`);

  let returnValue: [SortingReturnType, string] = ['not sorted', ''];
  const folderName = getFolderNameFromPath(filepath);

  state.destinationFolders.forEach(
    (destinationFolder: DestinationFolderType) => {
      destinationFolder.filters.forEach(({ type, content }: FilterType) => {
        if (type === 'name' && folderName.split(content).length > 1) {
          // this will return true if the file was successfully moved, else the sorting was found but the file could be moved for some system reason.
          console.log('found name filter');
          const response = moveToDestination(
            filepath[0] === '/' ? filepath : '/'.concat(filepath),
            path.join(destinationFolder.path, folderName)
          );
          returnValue = [
            response ? 'moved' : 'could not be moved',
            path.join(destinationFolder.path, folderName),
          ];
        }
        if (
          type === 'format' &&
          path.extname(filepath).split(content).length > 1
        ) {
          // got match for the format
          console.log('found format filter');
          const response = moveToDestination(
            filepath[0] === '/' ? filepath : '/'.concat(filepath),
            path.join(destinationFolder.path, folderName)
          );
          returnValue = [
            response ? 'moved' : 'could not be moved',
            path.join(destinationFolder.path, folderName),
          ];
        }
      });
    }
  );
  return returnValue;
};

export const handleNewFileDetected = (
  state: StateType | null,
  type: string,
  filepath: string,
  handleFileNotifications: (
    arg0: SortingReturnType,
    arg1: string,
    arg2: string
  ) => void | null
): void => {
  if (state === null || handleFileNotifications === null) {
    console.error('State or callback was not defined when handling new file');
    return;
  }
  console.log(`File: ${type}, with path: ${filepath}`);
  if (type === 'add' && state.canMoveFiles === true) {
    const [hasItBeenSorted, destinationPath] = handleSortFile(state, filepath);
    handleFileNotifications(hasItBeenSorted, filepath, destinationPath);
  }
};

export const initializeWatcher = (
  folders: WatchedFolderType[] | null,
  callback: (arg0: string, arg1: string) => void
): void => {
  // console.log('intializing watcher...');
  // console.log('intializing watcher...', folders);
  if (folders === null) return;
  const foldersToBeWatched = folders.map((folder) => folder.path);
  watcher = chokidar.watch([], defaultOptions);
  watcher.add(foldersToBeWatched);

  watcher.on('all', (eventType: string, filepath: string) =>
    // handleNewFileDetected(eventType, filepath)
    callback(eventType, filepath)
  );
};

export const unWatchAll = (folders: string | string[]): void => {
  watcher.unwatch(folders);
};

export const getWatched = (): any => {
  return watcher.getWatched();
};

export const shutdownWatcher = (): Promise<any> => {
  return watcher?.close();
};

export const addWatching = (filepath: string | string[]): void => {
  console.log('adding new folders to be watched');
  watcher.add(filepath);
};

export const unwatch = (filepath: string): void => {
  watcher.unwatch(filepath);
};

// restart the watcher with the new folders
export const updateWatcher = (
  newState: StateType,
  callback: (arg0: string, arg1: string) => void
): void => {
  // console.log('restarting watcher...');
  shutdownWatcher();
  initializeWatcher(newState.watchedFolders, callback);
};

// module.exports = {
// initializeWatcher,
// addWatching,
// unWatchAll,
// unwatch,
// getWatched,
// shutdownWatcher,
// updateWatcher,
// handleNewFileDetected,
// getFolderNameFromPath,
// };
