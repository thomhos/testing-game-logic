import type { GameScreens } from '../../core';
import { type System } from '../types';
import { inactive } from './_utils';

export function GameScreen(): System {
    const screenName: GameScreens = "game";

    return {
        update: (state) => {
            if(inactive(state, screenName)) return;
        }
    }
}