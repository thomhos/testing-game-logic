import type { GameScreens, GameState } from "../../core"

export function inactive(state: GameState, screen: GameScreens): boolean {
    return state._screen.current !== screen && !state._screen.next;
}

export function screenRequested(state: GameState, screen: GameScreens): boolean {
    return state._screen.current !== screen 
        && state._screen.next === screen;
}

export function transitionInRunning(state: GameState, screen: GameScreens): boolean {
    return state._screen.current === screen 
        && state._screen.transitionState === 'in'
        && state._screen.transitionProgress < 1;
}

export function transitionInDone(state: GameState, screen: GameScreens): boolean {
    return state._screen.current === screen 
        && state._screen.transitionState === 'in'
        && state._screen.transitionProgress >= 1;
}

export function regularUpdate(state: GameState, screen: GameScreens): boolean {
    return state._screen.current === screen && state._screen.transitionState === 'none';
}

export function transitionOutRunning(state: GameState, screen: GameScreens): boolean {
    return state._screen.current === screen 
        && state._screen.transitionState === 'out'
        && state._screen.transitionProgress < 1;
}

export function transitionOutDone(state: GameState, screen: GameScreens): boolean {
    return state._screen.current === screen 
        && state._screen.transitionState === 'out'
        && state._screen.transitionProgress >= 1;
}

export function otherScreenRequested(state: GameState, screen: GameScreens): boolean {
    return state._screen.current === screen 
        && state._screen.next !== screen;
}

