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
  | "open-recently-moved-folder";

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
};
