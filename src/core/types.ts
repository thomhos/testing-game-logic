export interface GameConfig {
    width: number;
    height: number;
    targetFps: number;
    logging: boolean;
}

export interface GameSystemState {
    wallTimeInMs: number;   // Wall clock time in milliseconds
    startTimeInMs: number;  // When the game started
    upTimeInMs: number;     // Time since the game started
    fps: number;            // Frames per second, updated during the game loop
    timescale: number;      // Multiplier for the game time
    paused: boolean;        // Whether the game is paused
}

export interface GameState {
    _initialConfig: GameConfig
    _system: GameSystemState;
    time: number;
    resources: number;
}

export type GameUpdateFn = (state: GameState) => void;

export type GameRenderFn = (state: GameState) => void;