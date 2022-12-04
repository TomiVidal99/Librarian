import { IGlobalReducerAction, IGlobalReducerActionsType } from "../models";
import { IGlobalState } from "../state";

export const ACTIONS: IGlobalReducerActionsType = {
  UPDATE_STATE: "update-state",
  ADD_DESTINATION_FOLDER: "add-destination-folder",
  REMOVE_DESTINATION_FOLDERS: "remove-destination-folders",
  ADD_ORIGIN_FOLDER: "add-origin-folder",
  REMOVE_ORIGIN_FOLDERS: "remove-origin-folders",
  ADD_RECENTLY_MOVED: "get-recently-moved",
};

const updateState = (state: IGlobalState): IGlobalState => {
  window.api.setState(state);
  return state
}

export const reducer = (
  state: IGlobalState,
  action: IGlobalReducerAction
): IGlobalState => {
  switch (action.type) {
    case ACTIONS.UPDATE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.ADD_ORIGIN_FOLDER:
      // TODO: check if the payload it's an array or a single folder
      return updateState({
        ...state,
        originFolders: [...state.originFolders, ...action.payload],
      });
    case ACTIONS.REMOVE_ORIGIN_FOLDERS:
      return updateState({
        ...state,
        originFolders: action.payload,
      });
    case ACTIONS.ADD_DESTINATION_FOLDER:
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
      return {
        ...state,
        recentlyMovedFolders: [...state.recentlyMovedFolders, action.payload],
      };
    default:
      return state;
  }
};
