// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { ISendRecentlyWatchedFolder } from ".";
import { LanguageType, ILanguage } from "./utils";
import { IDestinationFolder, IPC_CALLS } from "./models";
import { IGlobalState } from "./state";

declare global {
  interface Window {
    api: {
      getDestinationFolderToEdit: (
        arg0: (arg0: IDestinationFolder) => void
      ) => void;
      editDestinationFolder: (arg0: string) => void;
      sendLanguageToRenderer: () => void;
      getLanguage: (
        arg0: (arg0: LanguageType, arg1: ILanguage) => void
      ) => void;
      changeLanguage: (arg0: LanguageType) => void;
      toggleAutoLaunch: (arg0: boolean) => void;
      getStateFromSettings: (arg0: (arg0: IGlobalState) => void) => void;
      openFiltersWindow: () => void;
      popWarning: (arg0: string, arg1: string) => void;
      pickAFolder: (arg0: {
        multiSelection?: boolean;
        defaultPath?: string;
      }) => Promise<string[] | undefined>;
      getUpdatedDestinationFolder: (
        arg0: (arg0: IDestinationFolder) => void
      ) => void;
      sendUpdatedDestinationFolder: (arg0: IDestinationFolder) => void;
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
  getDestinationFolderToEdit: (
    callback: (arg0: IDestinationFolder) => void
  ): void => {
    ipcRenderer.on(
      IPC_CALLS.GET_DESTINATION_FOLDER_TO_EDIT,
      (_: IpcRendererEvent, folderToEdit) => {
        callback(folderToEdit);
      }
    );
  },
  editDestinationFolder: (folderId: string): void => {
    ipcRenderer.send(IPC_CALLS.SEND_DESTINATION_FOLDER_TO_EDIT, folderId);
  },
  sendLanguageToRenderer: (): void => {
    ipcRenderer.send(IPC_CALLS.SEND_LANGUAGE_TO_RENDERER);
  },
  getLanguage: (
    callback: (arg0: LanguageType, arg1: ILanguage) => void
  ): void => {
    ipcRenderer.on(
      IPC_CALLS.GET_LANGUAGE,
      (_: IpcRendererEvent, [language, translation]) => {
        callback(language, translation);
      }
    );
  },
  changeLanguage: (lang: LanguageType): void => {
    ipcRenderer.send(IPC_CALLS.CHANGE_LANGUAGE, lang);
  },
  toggleAutoLaunch: (isEnabled: boolean): void => {
    ipcRenderer.send(IPC_CALLS.TOGGLE_AUTO_LAUNCH, isEnabled);
  },
  getStateFromSettings: (callback: (arg0: IGlobalState) => void): void => {
    ipcRenderer.on(
      IPC_CALLS.GET_STATE_FROM_SETTINGS_WINDOW,
      (_: IpcRendererEvent, state: IGlobalState) => {
        callback(state);
      }
    );
  },
  openFiltersWindow: (): void => {
    ipcRenderer.send(IPC_CALLS.OPEN_FILTERS_WINDOW);
  },
  getRecentlyWatchedFolder: (
    callback: (arg0: ISendRecentlyWatchedFolder) => void
  ): void => {
    ipcRenderer.on(
      IPC_CALLS.SEND_RECENTLY_WATCHED,
      (_: IpcRendererEvent, data: ISendRecentlyWatchedFolder) => {
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
      (_: IpcRendererEvent, state: IGlobalState) => {
        callback(state);
      }
    );
  },
  recieveDestinationFolder: (
    callback: (arg0: IDestinationFolder) => void
  ): void => {
    ipcRenderer.on(
      IPC_CALLS.RECIEVE_FOLDER_FROM_MAIN,
      (_: IpcRendererEvent, folder: IDestinationFolder) => {
        callback(folder);
      }
    );
  },
  getUpdatedDestinationFolder: (
    callback: (arg0: IDestinationFolder) => void
  ): void => {
    ipcRenderer.on(
      IPC_CALLS.GET_UPDATED_DESTINATION_FOLDER,
      (_: IpcRendererEvent, updatedFolder) => {
        callback(updatedFolder);
      }
    );
  },
  sendUpdatedDestinationFolder: (folder: IDestinationFolder): void => {
    ipcRenderer.send(IPC_CALLS.SEND_UPDATED_DESTINATION_FOLDER, folder);
  },
  sendDestinationFolder: (folder: IDestinationFolder): void => {
    ipcRenderer.send(IPC_CALLS.SEND_FOLDER_FROM_FILTERS_WINDOW, folder);
  },
  popWarning: (title: string, body: string): void => {
    ipcRenderer.send(IPC_CALLS.POP_WARNING_MESSAGE, { title, body });
  },
  pickAFolder: async ({
    multiSelection = false,
    defaultPath = "",
  }: {
    multiSelection?: boolean;
    defaultPath?: string;
  }): Promise<string[] | undefined> => {
    const result = await ipcRenderer.invoke(IPC_CALLS.OPEN_FOLDERS_DIALOG, {
      multiSelection,
      defaultPath: defaultPath,
    });
    return result;
  },
});
