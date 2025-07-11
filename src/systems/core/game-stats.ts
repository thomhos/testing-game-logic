import { type System } from '../types';

export function CoreGameStats(): System {
    let frames: number[] = [];

    return {
        update: (state) => {
            state._system.wallTimeInMs = Date.now();
            state._system.upTimeInMs = state._system.wallTimeInMs - state._system.startTimeInMs;

            if (state._initialConfig.logging) {
                const now = performance.now();
                while (frames.length > 0 && frames[0] <= now - 1000) {
                    frames.shift();
                }
                frames.push(now);
                state._system.fps = frames.length;;
            }
        }
    };
}