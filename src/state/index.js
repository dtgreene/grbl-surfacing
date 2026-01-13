import debounce from 'debounce';
import { proxy, subscribe } from 'valtio';
import { createGCode, createPreviewPath } from '../utils';

const STORAGE_KEY = 'grbl-surfacing';
const defaultState = {
  form: {
    width: 100,
    height: 100,
    bit_diameter: 12.7,
    step_over: 0.5,
    feed_rate: 100,
    start_gcode:
      'G90 ; absolute positioning\nG21 ; set units mm\nG94 ; use units per minute\nG17 ; use xy plane\nG54 ; use 1st work offset\nM3 S5000 ; start spindle at 5000 rpm',
    end_gcode: 'M9 ; stop spindle\nM2 ; program end',
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

export function deleteStorageData() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function updateData(data) {
  state.form = data;

  try {
    state.gcode = createGCode();
    state.previewData = createPreviewPath();
  } catch (error) {
    state.gcode = '';
    state.previewData = '';
    console.error(`Failed to create GCode: ${error}`);
  }
}
