import { Application } from 'pixi.js';

export async function setupRenderer() {
    const app = new Application();

    await app.init({
        background: '#1099bb',
        resizeTo: window,
        autoDensity: true,
    });

    document.body.appendChild(app.canvas)

    return app;
}
