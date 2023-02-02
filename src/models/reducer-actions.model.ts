export interface IGlobalReducerActionsType {
  UPDATE_LANGUAGE: "update-language";
  UPDATE_STATE: "update-state";
  UPDATE_DESTINATION_FOLDER: "update-destination-folder";
  ADD_DESTINATION_FOLDER: "add-destination-folder";
  REMOVE_DESTINATION_FOLDERS: "remove-destination-folders";
  ADD_ORIGIN_FOLDER: "add-origin-folder";
  REMOVE_ORIGIN_FOLDERS: "remove-origin-folders";
  ADD_RECENTLY_MOVED: "get-recently-moved";
  TOGGLE_AUTO_LAUNCH: "toggle-auto-launch";
}

export interface IGlobalReducerAction {
  readonly type: string; // TODO: change string to a type of the Reducer actions
  readonly payload?: any; // TODO
}
