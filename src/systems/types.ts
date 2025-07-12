import type { GameUpdateFn } from '../core';

export interface System {
    update: GameUpdateFn;
}