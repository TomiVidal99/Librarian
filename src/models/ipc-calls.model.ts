export type IpcCallsType =
  | "open-filters-window"
  | "close-filters-window"
  | "open-folders-dialog"
  | "pop-warning-message"
  | "send-folder-from-filters-window"
  | "recieve-folder-from-main"
  | "get-state-from-main"
  | "reset-settings"
  | "send-state-from-settings-to-main"
  | "open-recently-moved-folder"
  | "get-origin-folders"
  | "remove-origin-folder"
  | "add-origin-folder"
  | "send-notification"
  | "send-main-to-settings-recently-watched-folder"
  | "get-destination-folders-from-main-sync"
  | "get-state-from-settings-window"
  | "toggle-auto-launch"
  | "change-language";

export interface IIpcCalls {
  [key: string]: IpcCallsType;
}

export const IPC_CALLS: IIpcCalls = {
  OPEN_FILTERS_WINDOW: "open-filters-window",
  CLOSE_FILTERS_WINDOW: "close-filters-window",
  OPEN_FOLDERS_DIALOG: "open-folders-dialog",
  POP_WARNING_MESSAGE: "pop-warning-message",
  SEND_FOLDER_FROM_FILTERS_WINDOW: "send-folder-from-filters-window",
  RECIEVE_FOLDER_FROM_MAIN: "recieve-folder-from-main",
  GET_STATE_FROM_MAIN: "get-state-from-main",
  SEND_STATE_FROM_SETTINGS_TO_MAIN: "send-state-from-settings-to-main",
  RESET_SETTINGS: "reset-settings",
  OPEN_RECENTLY_MOVED_FOLDER: "open-recently-moved-folder",
  GET_ORIGIN_FOLDERS: "get-origin-folders",
  REMOVE_ORIGIN_FOLDER: "remove-origin-folder",
  ADD_ORIGIN_FOLDER: "add-origin-folder",
  SEND_NOTIFICATION: "send-notification",
  SEND_RECENTLY_WATCHED: "send-main-to-settings-recently-watched-folder",
  GET_DESTINATION_FOLDERS: "get-destination-folders-from-main-sync",
  GET_STATE_FROM_SETTINGS_WINDOW: "get-state-from-settings-window",
  TOGGLE_AUTO_LAUNCH: "toggle-auto-launch",
  CHANGE_LANGUAGE: "change-language",
};
