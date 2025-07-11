import { type System } from '../types';

export function ScreenTransition(): System {
    return {
        update: (state) => {
            // Handle "in" phase
            if (state._screen.transitionState === 'in') {
                if (state._screen.transitionProgress >= 1) {
                    state._screen.transitionState = 'none';
                    state._screen.transitionProgress = 0;
                    // clean up the transitionInEntity

                    // Optionally initialize new screen entities here
                    // console.log(`Transition to ${state._screen.current} complete`);
                }

                // Increment the transitionInEntity progress (later)
                state._screen.transitionProgress! += 0.01;
            }

            // Handle "out" phase
            if (state._screen.transitionState === 'out') {
                if (state._screen.transitionProgress >= 1) {
                    // Update the current screen to the next one and clear the next
                    state._screen.current = state._screen.next!;
                    state._screen.next = undefined;
                    // clean up the transitionOutEntity

                    // Start in transition
                    state._screen.transitionState = 'in';
                    state._screen.transitionProgress = 0;
                    // start the transitionInEntity

                    // Optionally clean up old screen entities here
                    // console.log(`Switched to ${state._screen.current}, transitioning in`);
                }

                // Increment the transitionOutEntity progress (later)
                state._screen.transitionProgress! += 0.01; // Or use delta time
            }

            // Start a transition if requested
            if (state._screen.transitionState === 'none') {
                if(state._screen.next && state._screen.next !== state._screen.current) {
                    state._screen.transitionState = 'out';
                    state._screen.transitionProgress = 0;
                    // start the transitionOutEntity
                    
                    // console.log(`Transitioning out from ${state._screen.current}`);
                }
            }
        }
    }
}