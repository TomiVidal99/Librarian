// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { IDestinationFolder, IpcCallsType, IPC_CALLS } from "./models";
import { IGlobalState } from "./state";

declare global {
  interface Window {
    api: {
      popWarning: (arg0: string, arg1: string) => void;
      pickAFolder: (arg0: boolean) => Promise<string[]>;
      request: (arg0: IpcCallsType, arg1?: any[]) => void;
      sendDestinationFolder: (arg0: IDestinationFolder) => void;
      recieveDestinationFolder: (
        arg0: (arg0: IDestinationFolder) => void
      ) => void;
      getState: (arg0: (arg0: IGlobalState) => void) => void;
      setState: (arg0: IGlobalState) => void;
    };
  }
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  setState: (state: IGlobalState): void => {
    ipcRenderer.send(IPC_CALLS.SEND_STATE_FROM_SETTINGS_TO_MAIN, state);
  },
  getState: (callback: (arg0: IGlobalState) => void): void => {
    ipcRenderer.on(
      IPC_CALLS.GET_STATE_FROM_MAIN,
      (event: IpcRendererEvent, state: IGlobalState) => {
        console.log("from preload:", state);
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
  pickAFolder: async (multiSelections: boolean): Promise<string[]> => {
    const result = await ipcRenderer.invoke(
      IPC_CALLS.OPEN_FOLDERS_DIALOG,
      multiSelections
    );
    return result;
  },
  request: (channel: IpcCallsType, args?: any[]): void => {
    // TODO: add payload argument to send
    ipcRenderer.send(channel, args ? args : []);
  },
});
