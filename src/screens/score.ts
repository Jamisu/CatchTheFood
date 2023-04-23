import { Sprite } from 'pixi.js'

export default class Score extends Sprite {
    private Score:number = 0;

    setScore(id: number): void {
        this.Score = id;
    }

    getScore(): number {
        return this.Score;
    }
}