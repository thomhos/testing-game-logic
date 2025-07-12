import type { GameScreenTransitionDurations } from '../../core';
import type { System } from '../types';
import { loadingScreenTransitionDurations, startScreenTransitionDurations } from "../screens/index";

export const defaultDurations = {
    in: 500,
    out: 500,
};
export const screenTransitionDurations: GameScreenTransitionDurations = {
    loading: loadingScreenTransitionDurations,
    start: startScreenTransitionDurations,
    game: defaultDurations,
    pause: defaultDurations,
    end: defaultDurations,
};

export function ScreenTransition(): System {
    return {
        update: (state) => {
            const { frameDeltaTime } = state._system;
            const { current, next, transitionState, transitionProgress } = state._screen;
            const durations = current ? screenTransitionDurations[current] : defaultDurations;
            const nextDurations = next ? screenTransitionDurations[next] : defaultDurations;

            // Handle "in" phase
            if (transitionState === 'in') {
                state._screen.transitionProgress += frameDeltaTime / nextDurations.in
                if (transitionProgress >= 1) {
                    state._screen.transitionState = 'none';
                    state._screen.transitionProgress = 0;
                    // clean up the transitionInEntity

                    // Optionally initialize new screen entities here
                    console.log(`Transition to ${current} complete`);
                }

                // Increment the transitionInEntity progress (later)
                // state._screen.transitionProgress! = Math.min(transitionProgress + 0.01, 1);
            }

            // Handle "out" phase
            if (transitionState === 'out') {
                state._screen.transitionProgress += frameDeltaTime / durations.out
                if (transitionProgress >= 1) {
                    // Update the current screen to the next one and clear the next
                    state._screen.current = next!;
                    state._screen.next = undefined;
                    // clean up the transitionOutEntity

                    // Start in transition
                    state._screen.transitionState = 'in';
                    state._screen.transitionProgress = 0;
                    // start the transitionInEntity

                    // Optionally clean up old screen entities here
                    console.log(`Switched to ${current}, transitioning in`);
                }

                // Increment the transitionOutEntity progress (later)
                // state._screen.transitionProgress! = Math.min(transitionProgress + 0.01, 1);
            }

            // Start a transition if requested
            if (transitionState === 'none') {
                if(next && next !== current) {
                    state._screen.transitionState = 'out';
                    state._screen.transitionProgress = 0;
                    // start the transitionOutEntity
                    
                    console.log(`Transitioning out from ${current}`);
                }
            }
        }
    }
}