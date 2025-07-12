import type { GameScreens } from "../../core";
import type { Renderer } from "../types";

export function StartScreenRenderer(): Renderer {
    const screenName: GameScreens = "start";

    return {
        render: (state, _app) => {
            if(state._screen.current !== screenName) return;
        }
    }
}