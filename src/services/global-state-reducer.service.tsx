import uuid from "react-uuid";
import { ISendRecentlyWatchedFolder } from "..";
import {
  IGlobalReducerAction,
  IGlobalReducerActionsType,
  IOriginFolder,
} from "../models";
import { IGlobalState } from "../state";

const MAX_RECENTLY_WATCHED_FOLDERS = 5;

export const ACTIONS: IGlobalReducerActionsType = {
  UPDATE_STATE: "update-state",
  ADD_DESTINATION_FOLDER: "add-destination-folder",
  REMOVE_DESTINATION_FOLDERS: "remove-destination-folders",
  ADD_ORIGIN_FOLDER: "add-origin-folder",
  REMOVE_ORIGIN_FOLDERS: "remove-origin-folders",
  ADD_RECENTLY_MOVED: "get-recently-moved",
  TOGGLE_AUTO_LAUNCH: "toggle-auto-launch",
};

let firstTimeInit = false;
const updateState = (state: IGlobalState): IGlobalState => {
  if (!firstTimeInit) {
    // check if it's the first time that has init and do not update the first state
    // TODO: check how to make this sync better
    firstTimeInit = true;
    return state;
  }
  console.log("sending state to main", state);
  window.api.setState(state);
  return state;
};

export const reducer = (
  state: IGlobalState,
  action: IGlobalReducerAction
): IGlobalState => {
  switch (action.type) {
    case ACTIONS.TOGGLE_AUTO_LAUNCH:
      window.api.toggleAutoLaunch();
      return updateState({
        ...state,
        autoLaunch: action.payload
      });
    case ACTIONS.UPDATE_STATE:
      return updateState({
        ...state,
        ...action.payload,
      });
    case ACTIONS.ADD_ORIGIN_FOLDER:
      return updateState({
        ...state,
        originFolders: [...state.originFolders, ...action.payload],
      });
    case ACTIONS.REMOVE_ORIGIN_FOLDERS:
      return (() => {
        window.api.removeOriginFolder(
          action.payload.toRemove.map((f: IOriginFolder) => f.path)
        );
        return updateState({
          ...state,
          originFolders: action.payload.toKeep,
        });
      })();
    case ACTIONS.ADD_DESTINATION_FOLDER:
      if (action.payload.name === "" || action.payload.path === "")
        return state;
      return updateState({
        ...state,
        destinationFolders: [...state.destinationFolders, action.payload],
      });
    case ACTIONS.REMOVE_DESTINATION_FOLDERS:
      return updateState({
        ...state,
        destinationFolders: action.payload,
      });
    case ACTIONS.ADD_RECENTLY_MOVED:
      const { name, origin, destination, filter } =
        action.payload as ISendRecentlyWatchedFolder;
      return updateState({
        ...state,
        // this logic caps the log of the folders to MAX_RECENTLY_WATCHED_FOLDERS
        recentlyMovedFolders: [
          ...(state.recentlyMovedFolders.length >= MAX_RECENTLY_WATCHED_FOLDERS
            ? state.recentlyMovedFolders.splice(
              0,
              state.recentlyMovedFolders.length - 1
            )
            : state.recentlyMovedFolders),
          {
            name,
            origin,
            destination,
            time: new Date(),
            id: uuid(),
            filter,
          },
        ],
      });
    default:
      return state;
  }
};
