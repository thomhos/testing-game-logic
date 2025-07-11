import { type GameConfig, type GameRenderFn, type GameState, type GameUpdateFn } from './types';

export function createGameConfig(config?: Partial<GameConfig>): GameConfig {
    return {
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
            frameDeltaTime: 0,
            window: {
                width: state?._system?.window.width || window.innerWidth,
                height: state?._system?.window.height || window.innerHeight,
            },
            keyboard: {
                pressedKeys: [],
            }
        },
        _screen: {
            current: state?._screen?.current || 'loading',
            next: state?._screen?.next || undefined,
            transitionState: state?._screen?.transitionState || 'none',
            transitionProgress: state?._screen?.transitionProgress || 0,
        },
        game: {
            timescale: state?.game?.timescale || 1,
            paused: state?.game?.paused || false,
        },
        entities: state?.entities || {},
        time: state?.time || 0,
        resources: state?.resources || 0,
    };
}

export function run(config: GameConfig, state: GameState, updater: GameUpdateFn, renderer: GameRenderFn) {
    const maxFps = config.targetFps || 60;
    const frameInterval = 1000 / maxFps; // 16.67 ms for 60 FPS
    
    let lastTime = 0;

    function gameLoop(currentTime: number) {
        if (state.game.paused) {
            // If the game is paused, skip the update and render
            renderer(state);
            requestAnimationFrame(gameLoop);
            return;
        }

        const timeSinceLastFrame = currentTime - lastTime; // Calculate the time since the last frame

        if (timeSinceLastFrame >= frameInterval) {
            state._system.frameDeltaTime = timeSinceLastFrame;
            updater(state)
            lastTime = currentTime - (timeSinceLastFrame % frameInterval);
        }

        // Always call the renderer
        renderer(state);
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}
