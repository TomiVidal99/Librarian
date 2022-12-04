import { IGlobalState } from "../state";
import Store from "electron-store";
import { createFirstTimeState, saveState } from ".";

export const getState = (
  store: Store<Record<string, unknown>>
): IGlobalState => {
  let state = store.get("state");

  if (state === undefined) {
    // this is the first time that the app it's initialized
    // thus we should create the intial config and save it
    state = createFirstTimeState();
    saveState(store, state as IGlobalState);
  }

  console.log("returning state")

  return state as IGlobalState
};
