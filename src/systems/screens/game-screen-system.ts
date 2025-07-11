import { type System } from '../types';
import { isEnding, isStarting, isUpdating, updateScreenState } from './screen-utils';

export function GameScreenSystem(): System {
    return {
        update: (state) => {
            if(isStarting(state, "game")) {
                updateScreenState(state, "game");
                // Initializing screen
                // Insert entitities for the start screen
                // Set up event handlers etc.
            }

            if(isUpdating(state, "game")) {
                // Updating screen
            }

            if(isEnding(state, "game")) {
                // Cleaning up screen
                // Remove start screen entities
                // Reset any event handlers or state specific to the start screen
            }
        }
    }
}