import type { Renderer } from "./types";

export function StartScreenRenderer(): Renderer {
    return {
        render: (state, ctx) => {
            if(state._screen.current !== "start") {
                return;
            }

            ctx.font = "30px Arial"; // Set font style
            ctx.fillStyle = "purple";
            if(state._screen.transitionState === 'in') {
                ctx.fillText("loading...", 20*state._screen.transitionProgress, 25); // Filled text (text, x, y)
            } else {
                ctx.fillText(`${state._system.fps}`, 20, 25); // Filled text (text, x, y)
            }
        }
    }
}