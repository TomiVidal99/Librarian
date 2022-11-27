import { createContext, useContext } from "react";
import {
  IDestinationFolder,
  IOriginFolder,
  IRecentlyMovedFolder,
} from "./../models";

export interface IGlobalState {
  canMoveFiles: boolean;
  autoLaunch: boolean;
  recentlyMovedFolders: IRecentlyMovedFolder[];
  originFolders: IOriginFolder[];
  destinationFolders: IDestinationFolder[];
  language: string; // TODO: Update this to a type
  generalNotifications: boolean;
  archivesNotifications: boolean;
}

export type IGlobalStateContext = {
  state: IGlobalState;
  setState: (c: IGlobalState) => void;
};

export const initialState: IGlobalState = {
  canMoveFiles: true,
  autoLaunch: true,
  recentlyMovedFolders: [],
  originFolders: [],
  destinationFolders: [],
  language: "en-US",
  generalNotifications: true,
  archivesNotifications: true,
};

// TODO: get the intial state from the JSON config file.
export const StateContext = createContext<IGlobalStateContext>({
  state: initialState, // set a default value
  setState: () => {
    return;
  },
});

export const useStateContext = () => useContext(StateContext);
