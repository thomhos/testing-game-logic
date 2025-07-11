import { type GameConfig, type GameRenderFn, type GameState, type GameUpdateFn } from './types';

export function createGameConfig(config?: Partial<GameConfig>): GameConfig {
    return {
        width: config?.width || 800,
        height: config?.height  || 600,
        targetFps: config?.targetFps || 60,
        logging: config?.logging || false,
    }
}

export function createInitialGameState(config: GameConfig, state?: Partial<GameState>): GameState {
    return {
        _initialConfig: config,
        _system: {
            startTimeInMs: state?._system?.startTimeInMs || Date.now(),
            wallTimeInMs: state?._system?.wallTimeInMs || Date.now(),
            upTimeInMs: state?._system?.upTimeInMs || 0,
            fps: 0, // This will be updated during the game loop
            timescale: state?._system?.timescale || 1,
            paused: state?._system?.paused || false
        },
        _screen: {
            current: state?._screen?.current || 'start',
            previous: state?._screen?.previous || undefined,
        },
        _entities: state?._entities || [],
        time: state?.time || 0,
        resources: state?.resources || 0,
    };
}

export function run(config: GameConfig, state: GameState, updater: GameUpdateFn, renderer: GameRenderFn) {
    const maxFps = config.targetFps || 60;
    const frameInterval = 1000 / maxFps; // 16.67 ms for 60 FPS
    
    let lastTime = 0;

    function gameLoop(currentTime: number) {

        if (state._system.paused) {
            // If the game is paused, skip the update and render
            requestAnimationFrame(gameLoop);
            return;
        }

        const timeSinceLastFrame = currentTime - lastTime; // Calculate the time since the last frame

        if (timeSinceLastFrame >= frameInterval) {
            updater(state)
            lastTime = currentTime - (timeSinceLastFrame % frameInterval);
        }

        // Always call the renderer
        renderer(state);
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}
