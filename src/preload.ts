// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { IpcCallsType } from "./models";

declare global {
  interface Window {
    api: {
      request: (arg0: IpcCallsType, arg1: any) => void;
    }
  }
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  request: (channel: IpcCallsType, data: any): Promise<any> => {
    // TODO: add payload argument to send
    ipcRenderer.send(channel);
  },
});
