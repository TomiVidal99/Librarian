import { FSWatcher, watch } from "chokidar";
import { IOriginFolder } from "../models";

/**
 * Creates the watcher with it's intial configuration
 * @returns {FSWatcher}
 */
export const initalizeWatcher = (): FSWatcher => {
  const watcher = watch("file, dir, glob, or array", {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });
  return watcher;
};

/**
 * Listens to all origin folders for changes.
 */
export const updateOriginListeners = ({
  watcher,
  originFolders,
}: {
  originFolders: IOriginFolder[];
  watcher: FSWatcher;
}): void => {
  // const alreadyInWatch = Object.keys(watcher.getWatched());
  // const notWatched = originFolders
  //   .filter((folder) => !alreadyInWatch.includes(folder.path))
  //   .map(({ path }) => path);
  // watcher.add(notWatched);
  // console.log(watcher.getWatched());
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
