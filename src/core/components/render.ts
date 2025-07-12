import { type Component } from "../";

export interface RenderableComponentOptions {
    graphics: string;
    visible: boolean;
}

// Render component that holds PixiJS graphics
export interface RenderableComponent extends Component, RenderableComponentOptions {
    readonly type: 'renderable';
}

export function createRenderableComponent(options: RenderableComponentOptions): RenderableComponent {
    const { graphics, visible } = options;
    return { 
        type: 'renderable', 
        graphics, 
        visible
    };
}