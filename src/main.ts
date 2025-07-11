import { Game, GameTypes } from './core';
import * as Systems from './systems';
import * as Renderers from './renderers';

function main() {
    const config = Game.createGameConfig({ logging: true });
    const state = Game.createInitialGameState(config);
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('Failed to get canvas context');
        return;
    }

    // Register systems
    const systems: Systems.System[] = [
        // Core systems
        Systems.CoreGameStats(),
        Systems.BrowserWindow(),
        Systems.Input(),

        // Screens
        Systems.ScreenTransition(),
        Systems.StartScreen(),
        Systems.GameScreen()
    ]

    // Updater runs every frame (throttled to targetFrameRate)
    const updater: GameTypes.GameUpdateFn = (state) => {
        for (const system of systems) {
            system.update(state);
        }
    };

    const renderers: Renderers.Renderer[] = [
        Renderers.StartScreenRenderer(),
    ];

    // Renderer runs every time it can (based on requestAnimationFrame)
    const renderer: GameTypes.GameRenderFn = (state) => {
        if(canvas.width !== state._system.window.width || canvas.height !== state._system.window.height) {
            Renderers.resizeCanvas(state, canvas);
        }

        Renderers.clearCanvas(state, ctx);
        for (const renderer of renderers) {
            renderer.render(state, ctx);
        }
    };

    Game.run(config, state, updater, renderer)
}

main()