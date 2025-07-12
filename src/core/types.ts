export interface GameConfig {
    targetFps: number;
    logging: boolean;
}

export interface GameSystemState {
    wallTimeInMs: number;   // Wall clock time in milliseconds
    startTimeInMs: number;  // When the game started
    upTimeInMs: number;     // Time since the game started
    fps: number;            // Frames per second, updated during the game loop
    frameDeltaTime: number; // Time since last frame
    window: {
        width: number;
        height: number;
    }
    keyboard: {
        pressedKeys: string[]
    }
}

export interface GameOperationState {
    paused: boolean;
    timescale: number;      // Multiplier for the game time
}

export type GameScreens = 'loading' | 'start' | 'game' | 'pause' | 'end';
export type GameScreenState = {
    current: GameScreens | undefined;
    next: GameScreens | undefined;
    transitionState: 'none' | 'out' | 'in';
    transitionProgress: number; // 0 to 1, where 0 is start and 1 is finished
}

export type GameScreenTransitionDurations = {
  [key in GameScreens]: {
    in: number;
    out: number;
  };
};

// Base component interface - all components must extend this
export interface Component {
    readonly type: string; // Component type identifier
}

export interface EntityCreationOptions {
    screen?: GameScreens;
    name?: string;
}

export interface Entity {
    id: string;
    name?: string;
    screen?: GameScreens;
    components: Map<string, Component>;
}

export interface EntityMap {
    [entityId: string]: Entity;
}

export interface GameState {
    _initialConfig: GameConfig
    _system: GameSystemState;
    _screen: GameScreenState;
    game: GameOperationState;
    entities: EntityMap;
    time: number;
    resources: number;
}

export type GameUpdateFn = (state: GameState) => void;

export type GameRenderFn = (state: GameState) => void;