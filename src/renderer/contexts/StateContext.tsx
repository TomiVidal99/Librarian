import { createContext, useContext } from 'react';

export type StateContent = {
  state: StateType;
  setState: (c: any) => void;
};

const initialState: StateType = {
  canMoveFiles: true,
  autoLaunch: true,
  appVersion: 'no version',
  recentlyMoved: [],
  watchedFolders: [],
  destinationFolders: [],
  language: 'en-US',
  generalNotifications: true,
  archivesNotifications: true,
};

export const StateContext = createContext<StateContent>({
  state: initialState, // set a default value
  setState: () => {},
});
export const useStateContext = () => useContext(StateContext);
