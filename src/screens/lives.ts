import { Sprite } from 'pixi.js'

export default class Lives extends Sprite {
    private lives:number = 10;

    setLives(id: number): void {
        this.lives = id;
    }

    getLives(): number {
        return this.lives;
    }
}