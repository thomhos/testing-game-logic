import type { GameScreens, GameScreenTransitionDurations } from '../../core/types';
import { createEntity, addComponent, createResponsivePositionComponent, createRenderableComponent, createOpacityComponent, destroyScreenEntities, getEntitiesWithComponent, getComponent, type RenderableComponent, type OpacityComponent } from '../../core';
import { type System } from '../types';
import { inactive, transitionOutDone } from './_utils';

export const loadingScreenTransitionDurations: GameScreenTransitionDurations['loading'] = {
    in: 1000,
    out: 1000
}

export function LoadingScreen(): System {
    const screenName: GameScreens = "loading";

    return {
        update: (state) => {
            if(inactive(state, screenName)) return;

            // Check if we need to create entities by looking for existing spinner entities on this screen
            const existingSpinners = getEntitiesWithComponent(state, 'renderable', screenName)
                .filter(entity => {
                    const renderable = getComponent<RenderableComponent>(state, entity.id, 'renderable');
                    return renderable?.graphics === 'spinner';
                });

            // Create spinning entity when screen becomes active and no spinners exist
            if (existingSpinners.length === 0) {
                console.log('once')
                const entity = createEntity(state, { screen: screenName });
                addComponent(state, entity.id, 'responsive-position', createResponsivePositionComponent({
                    xFloat: 'right',
                    yFloat: 'top',
                    xOffset: -20,
                    yOffset: 20
                }))
                addComponent(state, entity.id, 'opacity', createOpacityComponent({ opacity: 1 }))
                addComponent(state, entity.id, 'renderable', createRenderableComponent({ graphics: 'spinner', visible: true }))
            }

            // Update opacity based on transition state
            let opacity = 1;
            if (state._screen.transitionState === 'in') {
                opacity = state._screen.transitionProgress; // 0 to 1 when transitioning in
            } else if (state._screen.transitionState === 'out') {
                opacity = 1 - state._screen.transitionProgress; // 1 to 0 when transitioning out
            }

            // Apply opacity to all spinner entities
            existingSpinners.forEach(entity => {
                const opacityComponent = getComponent<OpacityComponent>(state, entity.id, 'opacity');
                if (opacityComponent) {
                    opacityComponent.opacity = opacity;
                }
            });

            // Handle Enter key to transition to start screen
            if (state._system.keyboard.pressedKeys.includes('Enter')) {
                state._screen.next = 'start';
            }

            // Clean up entities when transitioning out
            if (transitionOutDone(state, screenName)) {
                destroyScreenEntities(state, screenName);
            }
        }
    }
}