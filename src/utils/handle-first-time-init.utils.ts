import { app } from "electron";
import { IGlobalState } from "../state";

// TODO: make the initial origin folders as documents and such
export const createFirstTimeState = (): IGlobalState => {
  const state: IGlobalState = {
    archivesNotifications: true,
    generalNotifications: true,
    language: "en-US",
    canMoveFiles: true,
    autoLaunch: false,
    appVersion: app.getVersion(),
    recentlyMovedFolders: [],
    destinationFolders: [],
    originFolders: [],
  };

  return state;
};
