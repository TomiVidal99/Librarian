// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { IpcCallsType, IPC_CALLS } from "./models";

declare global {
  interface Window {
    api: {
      popWarning: (arg0: string, arg1: string) => void;
      pickAFolder: (arg0: boolean) => Promise<string[]>;
      request: (arg0: IpcCallsType, arg1?: any[]) => void;
    };
  }
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
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
