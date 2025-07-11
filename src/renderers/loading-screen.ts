import { Graphics  } from "pixi.js";
import type { GameScreens } from "../core/types";
import type { Renderer } from "./types";

export function LoadingScreenRenderer(): Renderer {
    const screenName: GameScreens = "loading";
    
    return {
        render: (state, app) => {
            if(state._screen.current !== screenName) return;

            const graphics = new Graphics();

            // Animate position using sine/cosine for smooth floating
            const t = state._system.wallTimeInMs / 1000;
            // console.log(t)
            const baseX = 200;
            const baseY = 200;
            const phaseX = 5 //Math.random() * Math.PI * 2;
            const phaseY = 5 //Math.random() * Math.PI * 2;
            const floatX = Math.sin(t + phaseX) * 100; // 30px left/right
            const floatY = Math.cos(t * 0.7 + phaseY) * 100; // 20px up/down

            graphics.rect(baseX + floatX, baseY + floatY, 100, 100);

            if(state._screen.transitionState === 'out') {
                graphics.fill(`rgba(222,50,73,${1-state._screen.transitionProgress})`);
            } else {
                graphics.fill('rgba(222, 50, 73, 1)');
            }

            graphics.eventMode = 'static';
            graphics.on('pointerdown', () => {
                state._screen.next = 'start';
            })

            

            app.stage.addChild(graphics);



            // const graphics = new Graphics();

            // graphics.rect(50*state._screen.transitionProgress, 50, 100, 100);
            // graphics.fill(0xde3249);

            // app.stage.addChild(graphics);



            // ctx.font = "30px Arial";

            // if(state._screen.transitionState === 'in') {
            //     ctx.fillText("loading...", state._screen.transitionProgress * 20, 25);
            //     ctx.fillStyle = `rgba(0,0,0,${state._screen.transitionProgress})`;
            // } if(state._screen.transitionState === 'out') {
            //     ctx.fillText("loading...", 20* (1-state._screen.transitionProgress), 25);
            //     ctx.fillStyle = `rgba(0,0,0,${1-state._screen.transitionProgress})`;
            // } else {
            //     ctx.fillStyle = "rgba(0,0,0,1)"
            // }
        }
    }
}