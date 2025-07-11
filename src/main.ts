import { Game, GameTypes } from './core';;
import * as Systems from './systems';

function main() {
    const config = Game.createGameConfig();
    const state = Game.createInitialGameState(config, {});

    // Register systems
    const systems: Systems.System[] = [
        Systems.CoreGameStatsSystem()
    ]

    // Updater runs every frame (throttled to targetFrameRate)
    const updater: GameTypes.GameUpdateFn = (state) => {
        for (const system of systems) {
            system.update(state);
        }
    };

    let lastSecond = 0;
    // Renderer runs every time it can (based on requestAnimationFrame)
    const renderer: GameTypes.GameRenderFn = (state) => {
        const currentSecond = Math.floor(state._system.upTimeInMs / 1000);
        if (currentSecond !== lastSecond) {
            const date = new Date(state._system.wallTimeInMs);
            console.log(date.toLocaleString());
            console.log("FPS: ", state._system.fps);
            lastSecond = currentSecond;
        }
    };

    // Run game
    Game.run(config, state, updater, renderer)
}

main()