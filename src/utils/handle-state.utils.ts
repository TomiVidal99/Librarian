import Store from "electron-store";
import { createFirstTimeState, setLanguage } from ".";
import { IGlobalState } from "../state";

const STATE_KEY = "state" as const;

let store: Store;

/**
 * Creates the store.
 */
export function initializeStore(): void {
  store = new Store();
}

/**
 * Save a given state in the store.
 * @param {IGlobalState} state
 */
export function saveState(state: IGlobalState): void {
  store.set(STATE_KEY, state);
}

/**
 * Deletes the current state in the store and creates a new one with the default values.
 * @returns {IGlobalState} state
 */
export function resetState(): IGlobalState {
  store.delete(STATE_KEY);
  return getState();
}

/**
 * Returns the current state saved in the store.
 * @returns {IGlobalState} state
 */
export function getState(): IGlobalState {
  let state = store.get(STATE_KEY);

  if (state === undefined) {
    // this is the first time that the app it's initialized
    // thus we should create the intial config and save it
    state = createFirstTimeState();
    saveState(state as IGlobalState);
  }

  return state as IGlobalState;
}
