import type { GameScreens } from '../../core/types';
import { type System } from '../types';
import { inactive } from './screen-utils';

export function GameScreen(): System {
    const screenName: GameScreens = "game";

    return {
        update: (state) => {
            if(inactive(state, screenName)) return;
        }
    }
}