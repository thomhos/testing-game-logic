import { type System } from '../types';
import { inactive, screenRequested, transitionInRunning,transitionInDone, regularUpdate, otherScreenRequested, transitionOutRunning } from './screen-utils';

export function StartScreen(): System {
    return {
        update: (state) => {
            if(inactive(state, "start")) {
                // Game screen is inactive, nothing to do
                return
            }

            // runs when the screen is requested but the out animation of the previous screen is not finished yet
            if(screenRequested(state, "start")) {
                // create transitionInAnimationEntity with a Duration of 300ms if not already done
                // state._entities.push(
                    // createEntity("startScreenAnimation", [
                    //     createComponent("screenAnimation", {
                    //         screen: "start",
                    //         type: "in",
                    //         duration: 300
                    //     }),
                    //     createComponent("renderMe")
                    // ])
                // );
                // console.log("Start screen requested");
            }

            if(transitionInRunning(state, "start")) {
                // in-animation starting..
                // console.log("Start screen animating in");
            }

            if(transitionInDone(state, "start")) {
                // console.log("Start screen animating done");
            }

            if(regularUpdate(state, "start")) {
                // Updating screen on normal state
                // console.log("start idling");
            }

            if(otherScreenRequested(state, "start")) {
                // Cleaning up screen
                // create transitionOutAnimationEntity with a Duration of 300ms
                // Remove start screen entities
                // Reset any event handlers or state specific to the start screen
            }

            if(transitionOutRunning(state, "start")) {
                // out-animation starting..
            }
        }
    }
}