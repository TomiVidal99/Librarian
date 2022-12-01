export type IpcCallsType = "open-filters-window" | "close-filters-window";

export interface IIpcCalls {
  [key: string]: IpcCallsType;
}

export const IPC_CALLS: IIpcCalls = {
  OPEN_FILTERS_WINDOW: "open-filters-window",
  CLOSE_FILTERS_WINDOW: "close-filters-window",
};
