import { type System } from '../types';
import { isEnding, isStarting, isUpdating, updateScreenState } from './screen-utils';

export function StartScreenSystem(): System {
    return {
        update: (state) => {
            if(isStarting(state, "start")) {
                updateScreenState(state, "start");
                // Initializing screen
                // Insert entitities for the start screen
                // Set up event handlers etc.
                console.log("Start screen initialized");
            }

            if(isUpdating(state, "start")) {
                // Updating screen
                console.log("Start screen updating");
            }

            if(isEnding(state, "start")) {
                // Cleaning up screen
                console.log("Start screen ending");
                // Remove start screen entities
                // Reset any event handlers or state specific to the start screen
            }
        }
    }
}