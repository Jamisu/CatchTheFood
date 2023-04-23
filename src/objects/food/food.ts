import { Sprite, Texture } from 'pixi.js'

export default class Food extends Sprite {
    private _id: number = 0;
    private _lastSecondsOfExistence: ReturnType<typeof setInterval> | undefined;
    private _timeToDie: number = 10;

    constructor(texture:Texture) {
        super(texture);
    }
    

    setId(id: number): void {
        this._id = id;
    }

    getId(): number {
        return this._id;
    }

    setAnimatedDeath(): void {
        
        this._lastSecondsOfExistence = setInterval(this.animatedDeath, 30, this);
    }

    animatedDeath(that:Food): void {
        console.log(that._timeToDie);
        if(that && that._timeToDie <= 0) {
            //  DIE!
            clearInterval(that._lastSecondsOfExistence);
            that.destroy();
            return;
        }
        that.alpha -= 0.1;
        that.y -= 5;
        that._timeToDie --;
    }
}