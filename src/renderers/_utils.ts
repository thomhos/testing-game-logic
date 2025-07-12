import { Application } from 'pixi.js';

export async function setupRenderer() {
    const app = new Application();

    await app.init({
        background: '#1099bb',
        resizeTo: window,
        autoDensity: true,
        // Anti-aliasing for smoother edges
        antialias: true,
        // High resolution for crisp rendering on high-DPI displays
        resolution: window.devicePixelRatio || 1,
        // Prefer WebGL for better performance and quality
        preference: 'webgl',
        // Enable power preference for better performance on some devices
        powerPreference: 'high-performance'
    });

    // Ensure canvas is crisp on high-DPI displays
    if (app.canvas) {
        app.canvas.style.imageRendering = 'auto';
        app.canvas.style.imageRendering = 'crisp-edges';
        app.canvas.style.imageRendering = '-webkit-optimize-contrast';
    }

    document.body.appendChild(app.canvas)

    return app;
}
