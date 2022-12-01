import uuid from "react-uuid";
import { IGlobalReducerAction, IGlobalReducerActionsType } from "../models";
import { IGlobalState } from "../state";

export const ACTIONS: IGlobalReducerActionsType = {
  UPDATE_STATE: 'update-state',
  ADD_DESTINATION_FOLDER: 'add-destination-folder',
  REMOVE_DESTINATION_FOLDERS: 'remove-destination-folders',
  ADD_WATCHING_FOLDER: 'add-watching-folder',
  REMOVE_WATCHING_FOLDERS: 'remove-watching-folders',
  ADD_RECENTLY_MOVED: 'get-recently-moved',
};

export const reducer = (state: IGlobalState, action: IGlobalReducerAction): IGlobalState => {
  switch (action.type) {
    case ACTIONS.UPDATE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.ADD_WATCHING_FOLDER:
      return {
        ...state,
        destinationFolders: [...state.originFolders, action.payload],
      };
    case ACTIONS.REMOVE_WATCHING_FOLDERS:
      return {
        ...state,
        destinationFolders: action.payload,
      };
    case ACTIONS.ADD_DESTINATION_FOLDER:
      // console.log('adding new destination folder to the state: ', action);
      return {
        ...state,
        destinationFolders: [
          ...state.destinationFolders,
          {
            id: uuid(),
            name: action.payload.folder,
            path: action.payload.path,
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
        recentlyMovedFolders: [...state.recentlyMovedFolders, action.payload],
      };
    default:
      return state;
  }
};
