import { Sprite, Text, Graphics } from "pixi.js";
import Config from "../config/config";

export default class Button extends Sprite {
    
    private buttonText: Text = new Text(0, {
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        fill: 0x000000,
        align: "center"
    });

    private background: Graphics = new Graphics();

    constructor() {
        super();
        this.anchor.set(0.5, 0.5);
        this.x = Config.gameWidth / 2;
        this.y = Config.gameHeight / 2;
        this.buttonText.text = "PLAY";
        this.buttonText.anchor.set(0.5, 0.5);
        this.background.beginFill(0xFFFFFF); // Color it black
        this.background.drawRoundedRect(
            (-this.buttonText.width / 2) -5,
            (-this.buttonText.height / 2) - 5,
            this.buttonText.width + 10,
            50,
            10
        );
        this.background.endFill();
        this.addChild(this.background);
        this.addChild(this.buttonText);
    }

    replayText(): void {
        this.buttonText.text = "PLAY AGAIN";
    }

    delayedInit() {
        this.buttonText.x = this.width / 2 - this.buttonText.width / 2;
        this.y = Config.gameHeight / 2 - this.height / 2;
        this.x = Config.gameWidth / 2 - this.width / 2;
    }
}