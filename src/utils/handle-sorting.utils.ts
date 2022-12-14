import { FSWatcher, watch } from "chokidar";
import { getFolderName } from "../pages/App/components/OriginFolders/utils";
import { getState } from ".";
import { store } from "../";
import { FilterType } from "../models";

const WATCH_OPTIONS = {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  depth: 0,
}

/**
 * Creates the watcher with it's intial configuration
 * @returns {FSWatcher}
 */
export const initalizeWatcher = (): FSWatcher => {
  const originFoldersPaths = getState(store).originFolders.map(f => f.path);
  const watcher = watch(originFoldersPaths, WATCH_OPTIONS);
  return watcher;
};

/**
 * Listens to all origin folders for changes.
 */
export const updateOriginListeners = ({
  watcher,
}: {
  watcher: FSWatcher;
}): void => {
  console.log('updating origin listeners');
  const alreadyInWatch = Object.keys(watcher.getWatched());
  const notWatched = getState(store).originFolders
    .filter((folder) => !alreadyInWatch.includes(folder.path))
    .map(({ path }) => path);
  watcher.add(notWatched);
  watcher.on('add', (file) => { handleNewFile(file) });
};

/**
 * Removes listeners from folders
 */
export const removeAllListeners = ({
  watcher,
}: {
  watcher: FSWatcher;
}): void => {
  watcher.close().then(() => {
    console.log("Watcher instance closed");
  });
};

interface ISortArgs {
  file: string;
  filter: string;
}
/**
 * Called back when a file has been added insisde some origin folder
 */
const handleNewFile = (filepath: string): void => {
  console.log(`new file ${filepath}`);
  const filename = getFolderName(filepath);
  const state = getState(store)

  const actions = {
    "name": sortByName,
    "format": sortByFormat,
    "regex": sortByRegex,
  }

  // TODO: check how i would sort by priority
  state.destinationFolders.forEach((folder) => {
    folder.filters.forEach((filter) => {
      const args: ISortArgs = {
        file: filepath,
        filter: filter.content,
      }
      const shouldMove = actions[filter.type](args);
      if (!shouldMove) return;
      console.log(`should move ${filename} to ${filepath}`);
    })
  })

}

/**
 * Sorts a file by name
 */
const sortByName = ({ file, filter }: ISortArgs): boolean => {
  return file.includes(filter)
}

/**
 * Sorts a file by format
 */
const sortByFormat = ({ file, filter }: ISortArgs): boolean => {
  throw "Not implemented yet."
}

/**
 * Sorts a file by regular expression
 */
const sortByRegex = ({ file, filter }: ISortArgs): boolean => {
  throw "Not implemented yet."
}
