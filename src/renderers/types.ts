import type { Application } from 'pixi.js';
import type { GameState } from '../core';

export interface Renderer {
    render: (state: GameState, app: Application) => void;
}