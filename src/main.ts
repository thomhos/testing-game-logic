import * as Game from './core';
import * as Systems from './systems';
import * as Renderers from './renderers';

async function main() {
    const config = Game.createGameConfig({ logging: true });
    const state = Game.createInitialGameState(config);

    const app = await Renderers.setupRenderer();

    // Register systems
    const systems: Systems.System[] = [
        // Core systems
        Systems.CoreGameStats(),
        Systems.BrowserWindow(),
        Systems.Input(),

        // Screens
        Systems.ScreenTransition(),
        Systems.LoadingScreen(),
        Systems.StartScreen(),
        Systems.GameScreen(),
    ]

    // Updater runs every frame (throttled to targetFrameRate)
    const updater: Game.GameUpdateFn = (state) => {
        for (const system of systems) {
            system.update(state);
        }
    };

    const renderers: Renderers.Renderer[] = [
        Renderers.LoadingScreenRenderer(),
        Renderers.StartScreenRenderer(),
    ];

    // Renderer runs every time it can (based on requestAnimationFrame)
    const renderer: Game.GameRenderFn = (state) => {
        app.stage.removeChildren()
        for (const renderer of renderers) {
            renderer.render(state, app);
        }
    };

    Game.run(config, state, updater, renderer)
}

main()