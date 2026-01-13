import debounce from 'debounce';
import { proxy, subscribe } from 'valtio';

const STORAGE_KEY = 'grbl-surfacing';
const defaultState = {
  form: {
    width: 100,
    height: 100,
    units: 'mm',
    bit_diameter: 12.7,
    step_over: 0.5,
    feed_rate: 100,
    rpm: 5000,
  },
  gcode: '',
  previewPath: '',
};
export const state = proxy(getDefaultState());

// Subscribe to state changes to save the changes to local storage.
subscribe(state, debounce(syncStorage, 500));

function syncStorage() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getDefaultState() {
  const storeValue = window.localStorage.getItem(STORAGE_KEY);

  if (storeValue) {
    try {
      const json = JSON.parse(storeValue);

      // For any missing or invalid values, replace them with the default value.
      Object.entries(defaultState).forEach(([key, value]) => {
        if (json[key] === undefined || typeof json[key] !== typeof value) {
          json[key] = value;
        }
      });

      return json;
    } catch (error) {
      console.error('Could not parse saved config:', error);
    }
  }

  return defaultState;
}
