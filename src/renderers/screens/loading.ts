import type { GameScreens, RenderableComponent } from "../../core";
import { getEntitiesWithComponent, getComponent } from "../../core";
import type { Renderer } from "../types";
import { renderableMap, type RenderableMap } from "../renderables";

export function LoadingScreenRenderer(): Renderer {
    const screenName: GameScreens = "loading";
    
    return {
        render: (state, app) => {
            if(state._screen.current !== screenName) return;

            // Find all entities with spinner components on this screen
            const renderableEntities = getEntitiesWithComponent(state, 'renderable', screenName)

            // Render each spinner entity
            renderableEntities.forEach(entity => {
                const renderable = getComponent<RenderableComponent>(state, entity.id, 'renderable');
                if(renderable) {
                    const graphic = renderableMap[renderable.graphics as keyof RenderableMap]
                    if(graphic) {
                        graphic(state, entity.id, app)
                    }
                }
            });
        }
    }
}