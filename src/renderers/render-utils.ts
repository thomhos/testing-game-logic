import type { GameState } from "../core/types";

export function resizeCanvas(state: GameState, canvas: HTMLCanvasElement): void {
    canvas.width = state._system.window.width;
    canvas.height = state._system.window.height;
}

export function clearCanvas(state: GameState, ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, state._system.window.width, state._system.window.height); // Clear the canvas
}