import type { GameScreens, GameScreenTransitionDurations } from '../../core/types';
import { type System } from '../types';
import { inactive,transitionInDone } from './screen-utils';

export const loadingScreenTransitionDurations: GameScreenTransitionDurations['loading'] = {
    in: 1000,
    out: 1000
}

export function LoadingScreen(): System {
    const screenName: GameScreens = "loading";

    return {
        update: (state) => {
            if(inactive(state, screenName)) return;

            // console.log(state._screen.transitionProgress)

            if(transitionInDone(state, screenName)) {
                state._screen.next = "start";
            }
        }
    }
}