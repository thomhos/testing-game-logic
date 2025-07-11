import type { GameScreens } from "../core/types";
import type { Renderer } from "./types";

export function StartScreenRenderer(): Renderer {
    const screenName: GameScreens = "start";

    return {
        render: (state, app) => {
            if(state._screen.current !== screenName) return;

            // app.fillText(`${state._system.fps}`, 20, 25); // Filled text (text, x, y)
            // app.font = "30px Arial"; // Set font style
        
            // if(state._screen.transitionState === 'in') {
            //     ctx.fillStyle = `rgba(0,0,0,${state._screen.transitionProgress})`;
            // } else {
            //     ctx.fillStyle = `rgba(0,0,0,1)`;
            // }
        }
    }
}