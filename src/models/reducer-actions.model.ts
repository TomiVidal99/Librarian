export interface IGlobalReducerActionsType {
  UPDATE_STATE: "update-state";
  ADD_DESTINATION_FOLDER: "add-destination-folder";
  REMOVE_DESTINATION_FOLDERS: "remove-destination-folders";
  ADD_ORIGIN_FOLDER: "add-origin-folder";
  REMOVE_ORIGIN_FOLDERS: "remove-origin-folders";
  ADD_RECENTLY_MOVED: "get-recently-moved";
}

export interface IGlobalReducerAction {
    readonly type: string; // TODO: change string to a type of the Reducer actions
    readonly payload?: any; // TODO
}
