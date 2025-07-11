import { type GameUpdateFn } from '../core/types';

export interface System {
    update: GameUpdateFn;
}