import { Application, Graphics } from "pixi.js";
import type { GameState } from "../../core";

export function renderDotsLoader(state: GameState, app: Application) {
    const stageCenterX = state._system.window.width/2;
    const stageCenterY = state._system.window.height/2 + 50;
    
    const currentTime = state._system.wallTimeInMs / 1000;

    const loadingDotsNum = 3;
    const loadingDotsSpacing = 10;
    const loadingDotsAnimSpeed = 0.5;

    // Loading dots
    for(let i = 0; i < loadingDotsNum; i++) {
        const dot = new Graphics();
        dot.x = stageCenterX;
        dot.y = stageCenterY + 0;
        const dotX = -12 + (i * loadingDotsSpacing);
        const phase = (-currentTime * loadingDotsAnimSpeed + i * 0.3) % 2;
        const dotOpacity = Math.max(0.3, Math.sin(phase * Math.PI));
        
        dot.circle(dotX, 0, 3);
        dot.fill({ color: 0xffffff, alpha: dotOpacity });
        app.stage.addChild(dot);
    }

    return
}
