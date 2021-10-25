// TODO: fix this it should have dynamic types
type ActionsType = {
  UPDATE_STATE: string;
  ADD_DESTINATION_FOLDER: string;
  REMOVE_DESTINATION_FOLDERS: string;
  ADD_WATCHING_FOLDER: string;
  REMOVE_WATCHING_FOLDERS: string;
  ADD_RECENTLY_MOVED: string;
};
const ACTIONS: ActionsType = {
  UPDATE_STATE: 'update-state',
  ADD_DESTINATION_FOLDER: 'add-destination-folder',
  REMOVE_DESTINATION_FOLDERS: 'remove-destination-folders',
  ADD_WATCHING_FOLDER: 'add-watching-folder',
  REMOVE_WATCHING_FOLDERS: 'remove-watching-folders',
  ADD_RECENTLY_MOVED: 'get-recently-moved',
};

export default ACTIONS;
