import { AnimatedSprite, Texture, FrameObject, Resource } from 'pixi.js'
import Config from '../../config/config';

export default class Knight extends AnimatedSprite {
    private static knightInstance: Knight | undefined;

    constructor () {
        super(Config.knightFrames.map(a => Texture.from(a)));
        this.y = 520;
        this.gotoAndStop(0);
    }

    knightStand(): void {
        this.gotoAndStop(0);
    };

    knightStepLeft(): void {
        if(this.currentFrame <= 1) {
            this.gotoAndStop(2);
        } else {
            this.gotoAndStop(1);
        }
    };

    knightStepRight(): void {
        if(this.currentFrame <= 3) {
            this.gotoAndStop(4);
        } else {
            this.gotoAndStop(3);
        }
    }

    knightCenter(): void {
        this.x = Config.gameWidth / 2 - this.width / 2;
    }


    updateKnight(pressedKey: String): void {
        if (pressedKey === "ArrowLeft") {
            this.knightStepLeft();
            this.x -= Config.gridSize * 2;
            if(this.x <= 0) {
                this.x = 0;
            }
            return;
        } else if(pressedKey === "ArrowRight") {
            this.knightStepRight();
            this.x += Config.gridSize * 2;
            if(this.x >= Config.gameWidth - this.width) {
                this.x = Config.gameWidth - this.width;
            }
            return;
        } else {
            this.knightStand();
        }
    }
}
