export interface GameConfig {
    targetFps: number;
    logging: boolean;
}

export interface GameSystemState {
    wallTimeInMs: number;   // Wall clock time in milliseconds
    startTimeInMs: number;  // When the game started
    upTimeInMs: number;     // Time since the game started
    fps: number;            // Frames per second, updated during the game loop
    timescale: number;      // Multiplier for the game time
    window: {
        width: number;
        height: number;
    }
}

export interface GameOperationState {
    paused: boolean;
}

export type GameScreens = 'initialising' | 'loading' | 'start' | 'game' | 'pause' | 'end';
export type GameScreenState = {
    current: GameScreens;
    next: GameScreens | undefined;
    transitionState: 'none' | 'out' | 'in';
    transitionProgress: number; // 0 to 1, where 0 is start and 1 is finished
}

export interface GameState {
    _initialConfig: GameConfig
    _system: GameSystemState;
    _screen: GameScreenState;
    _entities: number[]
    game: GameOperationState;
    time: number;
    resources: number;
}

export type GameUpdateFn = (state: GameState) => void;

export type GameRenderFn = (state: GameState) => void;