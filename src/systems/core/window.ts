import { type System } from '../types';

export function BrowserWindow(): System {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    window.addEventListener("resize", () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    })

    return {
        update: (state) => {
            if(state._system.window.width !== windowWidth || state._system.window.height !== windowHeight) {
                state._system.window.width = windowWidth;
                state._system.window.height = windowHeight;
            }
        }
    };
}