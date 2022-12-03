export type IpcCallsType = "open-filters-window" | "close-filters-window" | "open-folders-dialog" | "pop-warning-message";

export interface IIpcCalls {
  [key: string]: IpcCallsType;
}

export const IPC_CALLS: IIpcCalls = {
  OPEN_FILTERS_WINDOW: "open-filters-window",
  CLOSE_FILTERS_WINDOW: "close-filters-window",
  OPEN_FOLDERS_DIALOG: "open-folders-dialog",
  POP_WARNING_MESSAGE: "pop-warning-message",
};
