import { IDestinationFolder } from ".";
import { IGlobalState } from "../state/global.state";

export interface IGlobalReducerActionsType {
  UPDATE_STATE: "update-state";
  ADD_DESTINATION_FOLDER: "add-destination-folder";
  REMOVE_DESTINATION_FOLDERS: "remove-destination-folders";
  ADD_WATCHING_FOLDER: "add-watching-folder";
  REMOVE_WATCHING_FOLDERS: "remove-watching-folders";
  ADD_RECENTLY_MOVED: "get-recently-moved";
}

export interface IGlobalReducerAction {
    readonly type: string; // TODO: change string to a type of the Reducer actions
    readonly payload?: any; // TODO
}
