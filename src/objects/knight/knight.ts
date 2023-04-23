import { AnimatedSprite, Texture, FrameObject, Resource } from 'pixi.js'

export default class Knight extends AnimatedSprite {
    constructor () {
        super([
            Texture.from("knight_standing"), // 0
    
            Texture.from("knight_left_walk_1"), // 1
            Texture.from("knight_left_walk_2"), // 2
    
            Texture.from("knight_right_walk_1"), // 3
            Texture.from("knight_right_walk_2"), // 4
        ]);
        this.y = 520;
        this.gotoAndStop(0);
    }
}
