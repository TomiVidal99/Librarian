// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { ISendRecentlyWatchedFolder } from ".";
import { IDestinationFolder, IPC_CALLS } from "./models";
import { IGlobalState } from "./state";

declare global {
  interface Window {
    api: {
      openFiltersWindow: (
      ) => void;
      popWarning: (arg0: string, arg1: string) => void;
      pickAFolder: (arg0: boolean) => Promise<string[] | undefined>;
      sendDestinationFolder: (arg0: IDestinationFolder) => void;
      recieveDestinationFolder: (
        arg0: (arg0: IDestinationFolder) => void
      ) => void;
      getState: (arg0: (arg0: IGlobalState) => void) => void;
      setState: (arg0: IGlobalState) => void;
      resetSettings: () => void;
      openRecentlyMoved: (arg0: string) => void;
      logOriginFolders: () => Promise<string[]>;
      removeOriginFolder: (arg0: string[]) => void;
      getRecentlyWatchedFolder: (
        arg0: (arg0: ISendRecentlyWatchedFolder) => void
      ) => void;
    };
  }
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  openFiltersWindow: (
  ): void => {
    ipcRenderer.send(IPC_CALLS.OPEN_FILTERS_WINDOW);
  },
  getRecentlyWatchedFolder: (
    callback: (arg0: ISendRecentlyWatchedFolder) => void
  ): void => {
    ipcRenderer.on(
      IPC_CALLS.SEND_RECENTLY_WATCHED,
      (event: IpcRendererEvent, data: ISendRecentlyWatchedFolder) => {
        callback(data);
      }
    );
  },
  removeOriginFolder: (folders: string[]): void => {
    ipcRenderer.send(IPC_CALLS.REMOVE_ORIGIN_FOLDER, folders);
  },
  logOriginFolders: async (): Promise<string[]> => {
    const folders = await ipcRenderer.invoke(IPC_CALLS.GET_ORIGIN_FOLDERS);
    return folders;
  },
  openRecentlyMoved: (folder: string): void => {
    ipcRenderer.send(IPC_CALLS.OPEN_RECENTLY_MOVED_FOLDER, folder);
  },
  resetSettings: (): void => {
    ipcRenderer.send(IPC_CALLS.RESET_SETTINGS);
  },
  /**
   * Returns the state when the main updates it.
   * @returns {IGlobalState} state Global State
   */
  setState: (state: IGlobalState): void => {
    ipcRenderer.send(IPC_CALLS.SEND_STATE_FROM_SETTINGS_TO_MAIN, state);
  },
  getState: (callback: (arg0: IGlobalState) => void): void => {
    ipcRenderer.on(
      IPC_CALLS.GET_STATE_FROM_MAIN,
      (event: IpcRendererEvent, state: IGlobalState) => {
        callback(state);
      }
    );
  },
  recieveDestinationFolder: (
    callback: (arg0: IDestinationFolder) => void
  ): void => {
    ipcRenderer.on(
      IPC_CALLS.RECIEVE_FOLDER_FROM_MAIN,
      (event: IpcRendererEvent, folder: IDestinationFolder) => {
        callback(folder);
      }
    );
  },
  sendDestinationFolder: (folder: IDestinationFolder): void => {
    ipcRenderer.send(IPC_CALLS.SEND_FOLDER_FROM_FILTERS_WINDOW, folder);
  },
  popWarning: (title: string, body: string): void => {
    ipcRenderer.send(IPC_CALLS.POP_WARNING_MESSAGE, { title, body });
  },
  pickAFolder: async (
    multiSelections: boolean
  ): Promise<string[] | undefined> => {
    const result = await ipcRenderer.invoke(
      IPC_CALLS.OPEN_FOLDERS_DIALOG,
      multiSelections
    );
    return result;
  },
});
