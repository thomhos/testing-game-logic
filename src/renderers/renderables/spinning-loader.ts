import { Graphics } from "pixi.js";
import { getComponent, type OpacityComponent, type ResponsivePositionComponent} from '../../core';
import type { RenderableGraphic } from ".";

export const renderSpinner: RenderableGraphic = (state, entityId, app) => {
    const windowWidth = state._system.window.width;
    const windowHeight = state._system.window.height;

    const positionComp = getComponent<ResponsivePositionComponent>(state, entityId, 'responsive-position');

    const xBase = positionComp?.xFloat === 'left' ? 0
                : positionComp?.xFloat === 'center' ? windowWidth/2
                    : positionComp?.xFloat === 'right' ? windowWidth : 0;
    const yBase = positionComp?.yFloat === 'top' ? 0
                : positionComp?.yFloat === 'center' ? windowHeight/2
                    : positionComp?.yFloat === 'bottom' ? windowHeight : 0;
    const x = xBase + (positionComp?.xOffset || 0);
    const y = yBase + (positionComp?.yOffset || 0);

    const opacityComp = getComponent<OpacityComponent>(state, entityId, 'opacity');
    const opacity = opacityComp?.opacity || 1;

    const radius = 10;
    const thickness = 3;
    const speed = 10;
    const arcLength = Math.PI * 1.5;
    
    // Calculate angle from time (stateless)
    const currentTime = state._system.wallTimeInMs / 1000;
    const startAngle = currentTime * speed;
    
    // Render background circle
    const background = new Graphics();
    background.x = x;
    background.y = y;
    background.circle(0, 0, radius);
    background.stroke({ 
        width: thickness, 
        color: 0x333333, 
        alpha: 0.3 * opacity, // Apply transition opacity
        // Smooth line caps and joins for better appearance
        cap: 'round',
        join: 'round'
    });
    app.stage.addChild(background);
    
    // Render spinning arc
    const arc = new Graphics();
    const endAngle = startAngle + arcLength;
    arc.x = x;
    arc.y = y;
    arc.arc(0, 0, radius, startAngle, endAngle);
    arc.stroke({ 
        width: thickness, 
        color: 0xffffff,
        alpha: opacity, // Apply transition opacity
        // Smooth line caps for better appearance
        cap: 'round',
        join: 'round'
    });
    app.stage.addChild(arc);
}
