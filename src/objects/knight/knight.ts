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
}
