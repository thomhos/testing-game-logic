import { type System } from '../types';
import { screenRequested, otherScreenRequested, transitionInRunning, transitionOutRunning, regularUpdate, inactive } from './screen-utils';

export function GameScreen(): System {
    return {
        update: (state) => {
            if(inactive(state, "game")) {
                // Game screen is inactive, nothing to do
                return
            }

            if(screenRequested(state, "game")) {
                // Insert entitities for the start screen
                // Set up event handlers etc.
            }

            if(transitionInRunning(state, "game")) {
                // in-animation starting..
            }

            if(regularUpdate(state, "game")) {
                // Updating screen on normal state
            }

            if(otherScreenRequested(state, "game")) {
                // Cleaning up screen
                // Remove start screen entities
                // Reset any event handlers or state specific to the start screen
            }

            if(transitionOutRunning(state, "game")) {
                // out-animation starting..
            }   
        }
    }
}