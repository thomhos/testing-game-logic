import type { Entity, EntityCreationOptions, Component, GameScreens, GameState } from '../types';

let entityIdCounter = 0;

export function createEntity(state: GameState, { name, screen }: EntityCreationOptions): Entity {
    const id = `entity_${++entityIdCounter}`;
    const entity: Entity = {
        id,
        name,
        screen,
        components: new Map<string, Component>()
    };
    
    state.entities[id] = entity;
    return entity;
}

export function destroy(state: GameState, entityId: string): void {
    delete state.entities[entityId];
}

export function addComponent<T extends Component>(state: GameState, entityId: string, componentType: string, component: T): void {
    const entity = state.entities[entityId];
    if (entity) {
        entity.components.set(componentType, component);
    }
}

export function removeComponent(state: GameState, entityId: string, componentType: string): void {
    const entity = state.entities[entityId];
    if (entity) {
        entity.components.delete(componentType);
    }
}

export function getComponent<T extends Component>(state: GameState, entityId: string, componentType: string): T | undefined {
    const entity = state.entities[entityId];
    return entity?.components.get(componentType) as T | undefined;
}

export function getEntitiesWithComponent(state: GameState, componentType: string, screen?: GameScreens): Entity[] {
    const entities = Object.values(state.entities).filter(entity => 
        entity.components.has(componentType)
    );
    
    if(screen) {
        return entities.filter(e => e.screen && e.screen === screen);
    }

    return entities;
}


export function destroyScreenEntities(state: GameState, screen: GameScreens): void {
    Object.keys(state.entities).forEach(entityId => {
        if (state.entities[entityId].screen === screen) {
            delete state.entities[entityId];
        }
    });
}