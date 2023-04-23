import { Sprite } from 'pixi.js'

export default class Food extends Sprite {
    private id:number = 0;

    setId(id: number): void {
        this.id = id;
    }

    getId(): number {
        return this.id;
    }
}