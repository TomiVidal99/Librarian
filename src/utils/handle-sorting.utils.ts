import { FSWatcher, watch } from "chokidar";
import { getState, startMovingFileAnimation } from ".";
import { sendRecentlyWatchedFolder } from "../";
import path from "path";
import fs from "fs";
import { sendNotification } from "./handle-notifications.utils";

export type ValidDestinationType = "duplicated" | "error" | undefined;

const WATCH_OPTIONS = {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  ignoreInitial: true, // TODO: make this an option in the frontend
  persistent: true,
  depth: 0,
};

/**
 * Creates the watcher with it's intial configuration
 * @returns {FSWatcher}
 */
export const initalizeWatcher = (): FSWatcher => {
  const originFoldersPaths = getState().originFolders.map((f) => f.path);
  const watcher = watch(originFoldersPaths, WATCH_OPTIONS);
  watcher.on("add", (file) => {
    handleNewFile(file);
  });
  return watcher;
};

/**
 * Removes the listener from the folders
 */
export const removeFoldersListeners = ({
  folders,
  watcher,
}: {
  folders: string[];
  watcher: FSWatcher;
}): void => {
  console.log("Removing: ", folders);
  watcher.unwatch(folders);
};

/**
 * Listens to all origin folders for changes.
 */
export const updateOriginListeners = ({
  watcher,
}: {
  watcher: FSWatcher;
}): void => {
  console.log("updating origin listeners");
  const alreadyInWatch = Object.keys(watcher.getWatched());
  const notWatched = getState()
    .originFolders.filter((folder) => !alreadyInWatch.includes(folder.path))
    .map(({ path }) => path);
  watcher.add(notWatched);
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

/**
 * Looks for duplicated files on the destination.
 * @returns {ValidDestinationType}
 */
async function checkValidDestination({
  destinationPath,
}: {
  destinationPath: string;
}): Promise<ValidDestinationType> {
  return new Promise((resolve) => {
    fs.open(destinationPath, "r", (err) => {
      if (err) {
        resolve("duplicated");
      }
      resolve(undefined);
    });
  });
}

/**
 * Parses a given path to an indexed copy of it.
 * @param {string} path
 * @param {string} description
 * @param {number} index
 * @returns {string} parsedPath
 */
function helperParseIndexDuplicated({
  path,
  index,
  description,
}: {
  path: string;
  index: number;
  description: string;
}): string {
  return `${path} - ${description}(${index.toString()})`;
}

type DestinationAndIndexType = [string, number];
/**
 * Returns the destination filepath with an index corresponding to the amount of repeated files in the same directory.
 * @param {destinationPath} string - destination path.
 * @param {copyDescription} string - description before the index, i.e: 'copy (1)', 'copy' it's the description.
 * @param {currentIndex} number - the amount of times that the file it's repeated.
 * @return {DestinationAndIndexType} Promise<[newDestinationPath, index]>
 */
async function getDestinationFilepathWithIndex({
  destinationPath,
  copyDescription,
  currentIndex,
}: {
  destinationPath: string;
  copyDescription: string;
  currentIndex: number;
}): Promise<DestinationAndIndexType> {
  // TODO: refactor this to make it async
  const maxDuplicatedNumber = 100;
  return new Promise((resolve) => {
    const data: DestinationAndIndexType = [
      helperParseIndexDuplicated({
        path: destinationPath,
        description: copyDescription,
        index: 0,
      }),
      0,
    ];
    // while (data[0] === "" && data[1] < maxDuplicatedNumber) {
    const result = fs.openSync(destinationPath, "r");
    console.log({ result });
    // if () {
    //   getDestinationFilepathWithIndex({
    //     destinationPath,
    //     copyDescription,
    //     currentIndex: currentIndex++,
    //   }).then((args) => {
    //     data = args;
    //   });
    // }
    // const newDestinationPath = `${destinationPath} - ${copyDescription}(${currentIndex})`;
    // resolve([newDestinationPath, data[1]]);
    // }
  });
}

interface ISortArgs {
  filename: string;
  filter: string;
}
/**
 * Called back when a file has been added insisde some origin folder
 */
const handleNewFile = (filepath: string): void => {
  const state = getState();
  const filename = path.basename(filepath);

  // if the user disables the files movement, don't move them
  if (!state.canMoveFiles) return;

  const actions = {
    name: sortByName,
    format: sortByFormat,
    regex: sortByRegex,
  };

  // TODO: check how i would sort by priority
  state.destinationFolders.forEach((folder) => {
    folder.filters.forEach((filter) => {
      const args: ISortArgs = {
        filename: filename,
        filter: filter.content,
      };
      const shouldMove = actions[filter.type](args);
      if (!shouldMove) return;
      const destinationPath = `${folder.path}/${filename}`;
      // TODO: check if there's any existing file in the destination location
      // checkValidDestination({ destinationPath }).then(
      //   (isValid: ValidDestinationType) => {
      //     if (isValid === "error") {
      //       throw isValid;
      //     } else if (isValid === "duplicated") {
      //       // handle duplicated file case.
      //       // check how to handle this on settings.
      //       console.error("TODO: this is not implemented yet");
      //       getDestinationFilepathWithIndex({destinationPath, copyDescription: "copy", currentIndex: 0}).then(([newDestinationPath]) => {
      //         destinationPath = newDestinationPath;
      //       })
      //     }
      //   }
      // );
      fs.rename(filepath, destinationPath, (err) => {
        if (err) {
          console.error(err);
          sendNotification({
            title: "Ocurrió un error",
            body: `Ocurrió un error cuando se intentaba copiar ${filepath} a ${destinationPath}. Se aplicó el filtro '${filter.content} (${filter.type})'`,
            type: "error",
          });
        } else {
          // console.log("moved sucessfully");
          startMovingFileAnimation();
          sendNotification({
            title: "Se movió un archivo",
            body: `El archivo ${filepath} se movió a ${destinationPath}`,
            type: "move-file",
          });
          sendRecentlyWatchedFolder({
            name: folder.name,
            origin: filepath,
            destination: destinationPath,
            filter,
          });
        }
      });
    });
  });
};

/**
 * Sorts a file by name
 */
const sortByName = ({ filename, filter }: ISortArgs): boolean => {
  return filename.includes(filter);
};

/**
 * Sorts a file by format
 */
const sortByFormat = ({ filename, filter }: ISortArgs): boolean => {
  return path.extname(filename) === filter;
};

/**
 * Sorts a file by regular expression
 */
const sortByRegex = ({ filename, filter }: ISortArgs): boolean => {
  const regex = RegExp(filter);
  return filename.match(regex) === null ? false : true;
};
