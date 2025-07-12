import { Application } from 'pixi.js'
import type { GameState} from '../../core'
import { renderSpinner } from './spinning-loader';
export * from './dots-loader';

export type RenderableGraphic = (
    state: GameState,
    entityId: string,
    app: Application,
) => void

export interface RenderableMap {
    'spinner': RenderableGraphic
}

export const renderableMap: RenderableMap = {
    'spinner': renderSpinner
};