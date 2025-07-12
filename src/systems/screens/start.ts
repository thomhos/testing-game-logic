import type { GameScreens, GameScreenTransitionDurations } from '../../core';
import { type System } from '../types';
import { inactive } from './_utils';

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