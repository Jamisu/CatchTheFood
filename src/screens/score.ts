import { Sprite, Text } from 'pixi.js'

export default class Score extends Sprite {
    private score:number = 0;
    private scoreText: Text = new Text(0, {
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        fill: 0x000000
    });

    resetScore(): void {
        this.score = 0;
        this.addChild(this.scoreText);
        this.x = 10;
        this.scoreText.text = this.score;
    }

    setScore(score: number): void {
        this.score++;
        this.scoreText.text = this.score + "00";
    }

    getScore(): number {
        return this.score;
    }
}