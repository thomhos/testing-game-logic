import { type System } from '../types';

interface KeycodeMap {
    [key: string]: string
}
const keycodeMap: KeycodeMap = {
    "KeyW": "up",
    "ArrowUp": "up",
    "KeyS": "down",
    "ArrowDown": "down",
    "KeyA": "left",
    "ArrowLeft": "left",
    "KeyD": "right",
    "ArrowRight": "right",
}

export function Input(): System {
    let pressedKeys: string[] = [];

    window.addEventListener("keydown", ({ code }) => {
        const keyCode: string = keycodeMap[code] || code;
        const index = pressedKeys.indexOf(keyCode);

        if(index === -1) {
            pressedKeys.unshift(keyCode);
        }
    })

    window.addEventListener("keyup", ({ code }) => {
        const keyCode: string = keycodeMap[code] || code;
        const index = pressedKeys.indexOf(keyCode);

        if(index > -1) {
            pressedKeys.splice(index, 1);
        }
    })

    return {
        update: (state) => {
            if(state._system.keyboard.pressedKeys.length !== pressedKeys.length) {
                state._system.keyboard.pressedKeys = pressedKeys;
            }
        }
    };
}