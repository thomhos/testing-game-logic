import type { GameScreens, GameScreenTransitionDurations } from '../../core/types';
import { type System } from '../types';
import { inactive } from './screen-utils';

export const startScreenTransitionDurations: GameScreenTransitionDurations['start'] = {
    in: 500,
    out: 500
}

export function StartScreen(): System {
    const screenName: GameScreens = "start";

    return {
        update: (state) => {
            if(inactive(state, screenName)) return;
        }
    }
}