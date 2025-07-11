import { type GameState } from '../core/types';

export interface Renderer {
    render: (state: GameState, ctx: CanvasRenderingContext2D) => void;
}