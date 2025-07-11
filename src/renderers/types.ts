import type { Application } from 'pixi.js';
import { type GameState } from '../core/types';

export interface Renderer {
    render: (state: GameState, app: Application) => void;
}