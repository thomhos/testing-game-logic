import type { GameScreens, GameState } from "../../core/types"

export function isStarting(state: GameState, screen: GameScreens): boolean {
    return state._screen.current === screen && state._screen.previous !== screen;
}

export function isUpdating(state: GameState, screen: GameScreens): boolean {
    return state._screen.previous === screen && state._screen.current === screen;
}

export function isEnding(state: GameState, screen: GameScreens): boolean {
    return state._screen.previous === screen && state._screen.current !== screen;
}

export function updateScreenState(state: GameState, screen: GameScreens): void {
    if (state._screen.previous !== screen) {
        state._screen.previous = state._screen.current;
    }
}